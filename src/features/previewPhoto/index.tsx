import React from 'react';
import {View, Image, StatusBar, TouchableOpacity} from 'react-native';
import {Colors} from '../../constants';
import navigateRef from '../../navigateRef';
import styles from '../previewPhoto/styles';
import {RouteProp} from '@react-navigation/native';
import type {PhotoFile} from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Params = {
  Details: {source: PhotoFile; typeMedia: string};
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

  const renderPreview = () => {
    return (
      <View style={styles.container}>
        {source && <Image source={source} style={styles.imagePreview} />}
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
