import {useState, useCallback, useRef, useMemo} from 'react';
import type {PhotoFile} from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import useCameraPermission from '../../hooks/useCameraPermission';
import navigateRef from '../../navigateRef';
import {ButtonOptions, ButtonMain} from '../../components';
import {Colors} from '../../constants';
import {StatusBar} from '../../components';

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

  const source = useMemo(
    () => ({uri: `file://${capturedMedia?.path}`}),
    [capturedMedia],
  );
  const device = useCameraDevice(cameraPosition);
  const supportsFlash = device?.hasFlash ?? false;
  const configCamera = useCameraFormat(device, [{photoHdr: HDR, fps}]);

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
      if (camera.current == null) throw new Error('Camera ref is null!');
      const photo = await camera.current.takePhoto({
        flash: supportsFlash ? flash : 'off',
        enableShutterSound: sound,
      });
      _onMediaCaptured(photo, 'photo');
    } catch (e) {
      console.error('Error: No Working!', e);
    }
  }, [camera, flash, sound, HDR]);

  const NoCameraErrorView = () => {
    return (
      <View style={styles.wrapper}>
        <Text>Dispositivo no tiene camara</Text>
      </View>
    );
  };

  const handlePreviewPhoto = () => {
    let Details = {source, typeMedia: 'media'};
    navigateRef.navigate('PreviewPhoto', Details);
  };

  //OnEvents Camera
  const onChangeCamera = () =>
    setCameraPosition(cameraPosition === 'front' ? 'back' : 'front');
  const onSound = () => setSound(!sound);
  const onChangeFlash = () => setFlash(flash === 'off' ? 'on' : 'off');
  const onChangeHDR = () => setHDR(!HDR);
  const onChangeFPS = () => setFps(fps === 60 ? 30 : 60);

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
    return (
      <View style={styles.containerBarCamera}>
        {capturedMedia ? (
          <TouchableOpacity onPress={handlePreviewPhoto}>
            <Image source={source} style={styles.captureImage} />
          </TouchableOpacity>
        ) : (
          <View style={styles.captureImage} />
        )}
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

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
  },
  captureImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    resizeMode: 'stretch',
  },
  containerCamera: {
    flex: 1,
    backgroundColor: 'black',
  },
  Camera: {
    height: '100%',
  },
  containerBarCamera: {
    height: 100,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 25,
    paddingRight: 25,
  },
  containerOptions: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingLeft: 20,
  },
  buttonCamera: {
    width: 50,
    height: 50,
    padding: 10,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.BLACK_50,
  },
});
