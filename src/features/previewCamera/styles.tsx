import { StyleSheet, ViewStyle, ImageStyle } from 'react-native';

interface Styles {
  imagePreview: ImageStyle;
  container: ViewStyle;
  backgroundImage: ImageStyle;
  previewImage: ImageStyle;
  buttonBack: ViewStyle;
  containerHeader: ViewStyle;
}

const styles: Styles = StyleSheet.create({
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
    backgroundColor: 'black',
  },
  containerHeader: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default styles;
