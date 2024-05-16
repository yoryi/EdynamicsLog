import {Image, StyleSheet, View} from 'react-native';
const ImageSlider = () => {
  return (
    <View style={styles.wrapperSlider}>
      <Image
        resizeMode={'repeat'}
        style={styles.imageSlider}
        source={{uri: 'https://i.ibb.co/rkrZpT3/slider-Zoom.png'}}
      />
    </View>
  );
};

export default ImageSlider;
const styles = StyleSheet.create({
  wrapperSlider: {
    width: 400,
    height: 80,
    justifyContent: 'flex-end',
  },
  imageSlider: {
    width: '100%',
    height: 40,
  },
});
