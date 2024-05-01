import {useState, useCallback, useRef, useMemo, SetStateAction} from 'react';
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
  CounterRecording,
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
  const [Counter, setCounter] = useState(false);
  const [flash, setFlash] = useState<'on' | 'off'>('off');
  const [typeMedia, setTypeMedia] = useState<'photo' | 'video'>('photo');
  const [capturedMedia, setCapturedMedia] = useState<
    PhotoFile | VideoFile | null
  >(null);

  const device = useCameraDevice(cameraPosition);
  const supportsFlash = device?.hasFlash ?? false;
  const configCamera = useCameraFormat(device, [{photoHdr: HDR, fps}]);
  const mediaSource = useMemo(() => {
    const mediaPath = capturedMedia?.path;
    return {uri: mediaPath ? `file://${mediaPath}` : null};
  }, [capturedMedia]);

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
          setCapturedMedia(media);
          setTypeMedia(type);
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
      camera.current.startRecording({
        flash,
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
      if (!camera.current || typeof camera.current.takePhoto !== 'function') throw new Error('Camera is not available!');
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
    let Details = {source: mediaSource, typeMedia};
    return navigateRef.navigate('PreviewPhoto', Details);
  };

  //OnEvents
  const toggleState = (
    currentState: any,
    alternateValue: string | boolean | number,
    setState: any,
  ) => {
    setState(
      currentState === alternateValue ? !alternateValue : alternateValue,
    );
  };

  const onChangeCamera = () =>
    toggleState(cameraPosition, 'front', setCameraPosition);
  const onSound = () => toggleState(sound, false, setSound);
  const onChangeFlash = () => toggleState(flash, 'off', setFlash);
  const onChangeHDR = () => toggleState(HDR, false, setHDR);
  const onChangeFPS = () => toggleState(fps, 30, setFps);

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
    const embled =
      capturedMedia !== null && typeof capturedMedia !== 'undefined';
    return (
      <View style={styles.containerBarCamera}>
        <CircularImage
          embled={embled}
          source={mediaSource}
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
