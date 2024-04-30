import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import navigateRef from '../../navigateRef';
import {RouteProp} from '@react-navigation/native';
import type {PhotoFile} from 'react-native-vision-camera';
import {Colors} from '../../constants';
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
      <View
        style={{
          height: 80,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 20,
          paddingRight: 20,
        }}>
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

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  previewImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  buttonBack: {
    width: 50,
    height: 50,
    padding: 10,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.BLACK_50,
  },
});

export default PreviewScreen;
