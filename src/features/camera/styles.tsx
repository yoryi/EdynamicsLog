import {StyleSheet, ViewStyle, ImageStyle} from 'react-native';

interface Styles {
  wrapper: ViewStyle;
  captureImage: ImageStyle;
  containerCamera: ViewStyle;
  Camera: ViewStyle;
  containerBarCamera: ViewStyle;
  containerOptions: ViewStyle;
  buttonCamera: ViewStyle;
  containerCounter: ViewStyle;
  containerSlider: ViewStyle;
  optionLeft: ViewStyle;
  optionRight: ViewStyle;
}

const styles: Styles = StyleSheet.create({
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
    alignItems: 'center',
    backgroundColor: 'black',
    justifyContent: 'space-between',
  },
  buttonCamera: {
    width: 50,
    height: 50,
    padding: 10,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  containerCounter: {
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSlider: {
    height: 80,
    flexDirection: 'row',
    position: 'relative',
  },
  optionLeft: {
    flexDirection: 'row',
    paddingLeft: 15,
  },
  optionRight: {
    flexDirection: 'row',
    paddingRight: 15,
  },
});

export default styles;
