import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Colors} from '../../constants';
import navigateRef from '../../navigateRef';
import styles from './styles';
import {RouteProp} from '@react-navigation/native';
import type {PhotoFile, VideoFile} from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';
type Params = {
  Details: {source: PhotoFile | VideoFile | any; typeMedia: string};
};

const PreviewScreen: React.FC<{route: RouteProp<Params, 'Details'>}> = ({
  route,
}) => {
  const {source, typeMedia} = route.params;
  const onBackNavegations = () => navigateRef.goBack();
  const renderHeader = () => {
    return (
      <View style={styles.containerHeader}>
        <TouchableOpacity style={styles.buttonBack} onPress={onBackNavegations}>
          <Icon name={'navigate-before'} size={30} color={Colors.WHITE} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderVideo = () => {
    return (
      <Video
        source={source}
        repeat={false}
        controls={true}
        disableFocus={false}
        resizeMode={"cover"}
        useTextureView={false}
        playWhenInactive={true}
        posterResizeMode={"cover"}
        ignoreSilentSwitch="ignore"
        style={StyleSheet.absoluteFill}
        allowsExternalPlayback={false}
        automaticallyWaitsToMinimizeStalling={false}
      />
    );
  };

  const renderPhoto = () => {
    return <Image source={source} style={styles.imagePreview} />;
  };

  const renderPreview = () => {
    return (
      <View style={styles.container}>
        {typeMedia == 'photo' && renderPhoto()}
        {typeMedia == 'video' && renderVideo()}
      </View>
    );
  };

  const rendeUI = () => {
    return (
      <View style={styles.container}>
        <StatusBar />
        {renderHeader()}
        {renderPreview()}
      </View>
    );
  };
  return rendeUI();
};
export default PreviewScreen;
