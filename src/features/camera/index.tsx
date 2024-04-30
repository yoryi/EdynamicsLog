import {useState, useCallback, useRef, useMemo} from 'react';
import type {PhotoFile, VideoFile} from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
  useMicrophonePermission,
} from 'react-native-vision-camera';
import styles from '../camera/styles';
import {Colors} from '../../constants';
import navigateRef from '../../navigateRef';
import useCameraPermission from '../../hooks/useCameraPermission';
import {
  ButtonOptions,
  ButtonMain,
  CircularImage,
  StatusBar,
} from '../../components';

export default function App() {
  const camera = useRef<Camera>(null);
  const microphone = useMicrophonePermission();
  const [cameraPermission] = useCameraPermission();
  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>(
    'back',
  );
  const [fps, setFps] = useState(30);
  const [HDR, setHDR] = useState(false);
  const [sound, setSound] = useState(false);
  const [flash, setFlash] = useState<'on' | 'off'>('off');
  const [typeMedia, setTypeMedia] = useState<'photo' | 'video'>('photo');
  const [capturedMedia, setCapturedMedia] = useState<
    PhotoFile | VideoFile | null
  >(null);

  const device = useCameraDevice(cameraPosition);
  const supportsFlash = device?.hasFlash ?? false;
  const configCamera = useCameraFormat(device, [{photoHdr: HDR, fps}]);
  const source = useMemo(
    () => ({uri: `file://${capturedMedia?.path}`}),
    [capturedMedia],
  );

  const mediaCapturedFlag = useCallback(
    async (media: PhotoFile | VideoFile, type: 'photo' | 'video') => {
      if (type === 'photo' || (type === 'video' && typeof media !== 'string')) {
        setCapturedMedia(media);
        setTypeMedia(type);
      } else {
        console.error('Media type is video or image');
      }
    },
    [],
  );

  const startRecording = useCallback(async () => {
    try {
      if (!camera.current) {
        throw new Error('Camera is not available!');
      }
      camera.current.startRecording({
        flash: flash,
        onRecordingError: error => {
          console.error('Recording failed!', error);
        },
        onRecordingFinished: video => {
          mediaCapturedFlag(video, 'video');
          console.log(`Recording successfully finished!`);
        },
      });
    } catch (e) {
      console.error('stop recording!');
    }
  }, [camera, flash, sound, supportsFlash]);

  const stopRecording = useCallback(async () => {
    try {
      if (!camera.current) {
        throw new Error('Camera is not available!');
      }
      await camera.current.stopRecording();
    } catch (e) {
      console.error('stop recording!', e);
    }
  }, [camera, flash, sound, supportsFlash]);

  const onTakePhoto = useCallback(async () => {
    try {
      if (!camera.current || typeof camera.current.takePhoto !== 'function') {
        throw new Error('Camera is not available!');
      }
      const flashMode = supportsFlash ? flash : 'off';
      const photo = await camera.current.takePhoto({
        flash: flashMode,
        enableShutterSound: sound,
      });
      mediaCapturedFlag(photo, 'photo');
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  }, [camera, flash, sound, supportsFlash]);

  const navigateToPreviewPhoto = () => {
    let Details = {source, typeMedia};
    return navigateRef.navigate('PreviewPhoto', Details);
  };

  //OnEvents Camera
  const onChangeCamera = () =>
    setCameraPosition(cameraPosition === 'front' ? 'back' : 'front');
  const onSound = () => setSound(!sound);
  const onChangeFlash = () => setFlash(flash === 'off' ? 'on' : 'off');
  const onChangeHDR = () => setHDR(!HDR);
  const onChangeFPS = () => setFps(fps === 60 ? 30 : 60);

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
        <View style={{flexDirection: 'row'}}>
          <ButtonOptions iconName={'volume-up'} onEvent={onSound} />
          <ButtonOptions iconName={'60fps-select'} onEvent={onChangeFPS} />
        </View>
        <View style={{flexDirection: 'row'}}>
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
    const embled =
      capturedMedia !== null && typeof capturedMedia !== 'undefined';
    return (
      <View style={styles.containerBarCamera}>
        <CircularImage
          embled={embled}
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
      <View style={styles.wrapper}>
        <StatusBar />
        {renderHeader()}
        {renderCameraApp()}
        {renderBarCamera()}
      </View>
    );
  };
  return renderUI();
}
