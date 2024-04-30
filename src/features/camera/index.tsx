import {useState, useCallback, useRef, useMemo} from 'react';
import type {PhotoFile} from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import styles from '../camera/styles';
import {Colors} from '../../constants';
import navigateRef from '../../navigateRef';
import useCameraPermission from '../../hooks/useCameraPermission';
import {ButtonOptions, ButtonMain, CircularImage, StatusBar} from '../../components';

export default function App() {
  const camera = useRef<Camera>(null);
  const [cameraPermission] = useCameraPermission();
  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>(
    'back',
  );
  const [flash, setFlash] = useState<'on' | 'off'>('off');
  const [fps, setFps] = useState(30);
  const [sound, setSound] = useState(false);
  const [HDR, setHDR] = useState(false);
  const [capturedMedia, setCapturedMedia] = useState<PhotoFile | null>(null);
  const [typeMedia, setTypeMedia] = useState<'photo' | 'video'>('photo');

  const device = useCameraDevice(cameraPosition);
  const supportsFlash = device?.hasFlash ?? false;
  const configCamera = useCameraFormat(device, [{photoHdr: HDR, fps}]);
  const source = useMemo(
    () => ({uri: `file://${capturedMedia?.path}`}),
    [capturedMedia],
  );

  const _onMediaCaptured = useCallback(
    async (media: PhotoFile, type: 'photo') => {
      if (type === 'photo' && typeof media !== 'string') {
        setCapturedMedia(media);
      } else {
        console.error('Error: Media type is not PhotoFile');
      }
    },
    [],
  );

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
      _onMediaCaptured(photo, 'photo');
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  }, [camera, flash, sound, supportsFlash]);


  const navigateToPreviewPhoto = () => {
    let Details = {source, typeMedia: 'media'};
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
            isActive={true}
            device={device}
            style={styles.Camera}
            format={configCamera}
            orientation={'portrait'}
            photoHdr={configCamera?.supportsPhotoHdr}
          />
        )}
      </View>
    );
  };

  const renderBarCamera = () => {
    const embled = capturedMedia !== null && typeof capturedMedia !== 'undefined';
    return (
      <View style={styles.containerBarCamera}>
        <CircularImage embled={embled} source={source} onEvent={navigateToPreviewPhoto} />
        <ButtonMain onEvent={onTakePhoto} />
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