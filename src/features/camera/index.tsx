import Icon from 'react-native-vector-icons/MaterialIcons';
import {useState, useCallback, useRef, SetStateAction} from 'react';
import type {PhotoFile, VideoFile} from 'react-native-vision-camera';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
  useMicrophonePermission,
} from 'react-native-vision-camera';
import styles from '../camera/styles';
import {Colors} from '../../constants';
import navigateRef from '../../navigateRef';
import {useSelector, useDispatch} from 'react-redux';
import {uploadImage} from '../../redux/feature/photoQ';
import useCameraPermission from '../../hooks/useCameraPermission';
import {
  ButtonOptions,
  ButtonMain,
  CircularImage,
  StatusBar,
  CounterRecording,
} from '../../components';
import {MediaCamera} from '../../types';

const CameraScreen = () => {
  const dispatch = useDispatch();
  const camera = useRef<Camera>(null);
  const microphone = useMicrophonePermission();
  const [cameraPermission] = useCameraPermission();
  const state = useSelector(state => state?.photoQ)?.listImage;
  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>(
    'back',
  );
  const [fps, setFps] = useState(30);
  const [HDR, setHDR] = useState(false);
  const [sound, setSound] = useState(false);
  const [Counter, setCounter] = useState(false);
  const [flash, setFlash] = useState<'on' | 'off'>('off');
  const device = useCameraDevice(cameraPosition);
  const supportsFlash = device?.hasFlash ?? false;
  const configCamera = useCameraFormat(device, [{photoHdr: HDR, fps}]);

  const captureMedia = useCallback(
    async (
      media: SetStateAction<PhotoFile | VideoFile | null>,
      type: string | ((prevState: 'photo' | 'video') => 'photo' | 'video'),
    ) => {
      try {
        if (
          type === 'photo' ||
          (type === 'video' && typeof media !== 'string')
        ) {
          const {path}: PhotoFile | VideoFile | any = media;
          const upload: MediaCamera = {
            typeMedia: type,
            state: 'pendiente',
            pathMedia: `file://${path}`,
            nameMedia: 'SE' + Math.random().toString().slice(2, 8),
          };
          dispatch(uploadImage(upload));
        } else {
          console.error('Invalid media type');
        }
      } catch (error) {
        console.error('Error capturing media:', error);
      }
    },
    [],
  );

  const startRecording = useCallback(async () => {
    try {
      if (!camera.current) throw new Error('Camera is not available!');
      setCounter(true);
      const flashMode = supportsFlash ? flash : 'off';
      camera.current.startRecording({
        flash: flashMode,
        onRecordingError: error => console.error('Recording failed!', error),
        onRecordingFinished: video => captureMedia(video, 'video'),
      });
    } catch (error) {
      console.error('stop recording!');
    }
  }, [camera, flash, sound, supportsFlash]);

  const stopRecording = useCallback(async () => {
    try {
      if (!camera.current) throw new Error('Camera is not available!');
      setCounter(false);
      await camera.current.stopRecording();
    } catch (error) {
      console.error('Error while stopping recording:', error);
    }
  }, [camera]);

  const onTakePhoto = useCallback(async () => {
    try {
      if (!camera.current || typeof camera.current.takePhoto !== 'function')
        throw new Error('Camera is not available!');
      const flashMode = supportsFlash ? flash : 'off';
      const photo = await camera.current.takePhoto({
        flash: flashMode,
        enableShutterSound: sound,
      });
      captureMedia(photo, 'photo');
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  }, [camera, flash, sound, supportsFlash]);

  const navigateToPreviewPhoto = () => {
    return navigateRef.navigate('PhotoQ');
  };

  const onSound = () => setSound(!sound);
  const onChangeHDR = () => setHDR(!HDR);
  const onChangeFPS = () => setFps(fps == 30 ? 60 : 30);
  const onChangeFlash = () => setFlash(flash == 'off' ? 'on' : 'off');
  const onChangeCamera = () =>
    setCameraPosition(cameraPosition == 'back' ? 'front' : 'back');

  const NoCameraErrorView = () => {
    return (
      <View style={styles.wrapper}>
        <Text>Dispositivo no tiene camara</Text>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.containerOptions}>
        <View style={styles.containerCounter}>
          {Counter && <CounterRecording counter={Counter} />}
        </View>
        <View style={{flexDirection: 'row', paddingLeft: 15}}>
          <ButtonOptions iconName={'volume-up'} onEvent={onSound} />
          <ButtonOptions iconName={'60fps-select'} onEvent={onChangeFPS} />
        </View>
        <View style={{flexDirection: 'row', paddingRight: 15}}>
          <ButtonOptions iconName={'hdr-on'} onEvent={onChangeHDR} />
          <ButtonOptions iconName={'bolt'} onEvent={onChangeFlash} />
        </View>
      </View>
    );
  };

  const renderCameraApp = () => {
    if (device == null) return <NoCameraErrorView />;
    return (
      <View style={styles.containerCamera}>
        {!cameraPermission ? (
          <ActivityIndicator size="large" color={Colors.GREEN_APP} />
        ) : (
          <Camera
            ref={camera}
            photo={true}
            video={true}
            isActive={true}
            device={device}
            style={styles.Camera}
            format={configCamera}
            orientation={'portrait'}
            audio={microphone.hasPermission}
            photoHdr={configCamera?.supportsPhotoHdr}
          />
        )}
      </View>
    );
  };

  const renderBarCamera = () => {
    const index = state.length;
    const source = state[index - 1]?.pathMedia;
    return (
      <View style={styles.containerBarCamera}>
        <CircularImage
          embled={index}
          source={source}
          onEvent={navigateToPreviewPhoto}
        />
        <ButtonMain
          onEvent={onTakePhoto}
          onRecording={startRecording}
          onEndRecording={stopRecording}
        />
        <TouchableOpacity style={styles.buttonCamera} onPress={onChangeCamera}>
          <Icon name={'sync'} size={25} color={Colors.WHITE} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderUI = () => {
    return (
      <SafeAreaView style={styles.wrapper}>
        <StatusBar />
        {renderHeader()}
        {renderCameraApp()}
        {renderBarCamera()}
      </SafeAreaView>
    );
  };
  return renderUI();
};
export default CameraScreen;
