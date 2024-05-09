import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StatusBar,
  ImageProps,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import {Colors} from '../../constants';
import navigateRef from '../../navigateRef';
import Video, {VideoProperties} from 'react-native-video';
import {useSelector, useDispatch} from 'react-redux';
import type {PhotoFile, VideoFile} from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ItemState, MediaCamera} from '../../types';
import {onStartTaskBackground} from '../../utils/backgroundActions';

const PhotoQScreen = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state?.photoQ)?.listImage;
  const onBackNavegations = () => {
    return navigateRef.navigate('Camera');
  };
  const onStartTask = () => {
    onStartTaskBackground(dispatch, state);
  };

  const getBackgroundColor = (state: ItemState | string): string => {
    switch (state) {
      case 'pendiente':
        return '#FF9E0B';
      case 'error':
        return '#D63232';
      case 'procesando':
        return '#0091FF';
      case 'subida':
        return '#00b32d';
      default:
        return '#FF9E0B';
    }
  };

  const renderHeader = () => {
    return (
      <View style={styles.containerHeader}>
        <TouchableOpacity style={styles.buttonBack} onPress={onBackNavegations}>
          <Icon name={'navigate-before'} size={30} color={Colors.WHITE} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderOptions = () => {
    return (
      <View style={styles.containerOptions}>
        <View>
          <Text style={styles.titleHeader}>PhotoQ</Text>
          <Text style={styles.captionHeader}>
            {state?.length ?? 0} archivos en cola
          </Text>
        </View>
        <TouchableOpacity style={styles.buttonUpload} onPress={onStartTask}>
          <Text style={styles.titleBotton}>Cargar Todo</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderVideo = (source: VideoFile | VideoProperties | any) => {
    return (
      <Video
        repeat={true}
        controls={false}
        disableFocus={true}
        resizeMode={'cover'}
        source={{uri: source}}
        useTextureView={false}
        playWhenInactive={true}
        posterResizeMode={'cover'}
        ignoreSilentSwitch="ignore"
        style={styles.mediaCamera}
        allowsExternalPlayback={false}
        automaticallyWaitsToMinimizeStalling={false}
      />
    );
  };

  const renderPhoto = (source: PhotoFile | ImageProps | any) => {
    return <Image source={{uri: source}} style={styles.mediaCamera} />;
  };

  const renderItem = ({item}: {item: MediaCamera}) => {
    return (
      <View style={styles.containerItems}>
        <View style={styles.containerMedia}>
          {item.typeMedia === 'photo' && (
            <View>{renderPhoto(item.pathMedia)}</View>
          )}
          {item.typeMedia === 'video' && (
            <View>{renderVideo(item.pathMedia)}</View>
          )}
          <View style={styles.wrapperMedia}>
            <Text style={styles.titleMedia}>{item.nameMedia}</Text>
            <Text numberOfLines={1} style={styles.captionMedia}>
              Media: {item.typeMedia}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.tag,
            {backgroundColor: getBackgroundColor(item?.state)},
          ]}>
          <Text style={styles.titleTag}>{item?.state.toUpperCase()}</Text>
        </View>
      </View>
    );
  };

  const renderList = () => {
    return (
      <FlatList
        renderItem={renderItem}
        data={[...state].reverse()}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.nameMedia}
      />
    );
  };

  const rendeUI = () => {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        {renderHeader()}
        {renderOptions()}
        {renderList()}
      </SafeAreaView>
    );
  };
  return rendeUI();
};
export default PhotoQScreen;
