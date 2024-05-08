import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';
import {VideoProperties} from 'react-native-video';

interface Styles {
  container: ViewStyle;
  buttonBack: ViewStyle;
  containerHeader: ViewStyle;
  wrapperMedia: ViewStyle;
  buttonUpload: ViewStyle;
  titleHeader: TextStyle;
  captionHeader: TextStyle;
  titleBotton: TextStyle;
  containerOptions: ViewStyle;
  containerItems: ViewStyle;
  containerMedia: ViewStyle;
  tag: ViewStyle;
  titleTag: TextStyle;
  mediaCamera: ImageStyle | VideoProperties;
  titleMedia: TextStyle;
  captionMedia: TextStyle;
}

const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  buttonBack: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#242528',
  },
  containerHeader: {
    height: 60,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonUpload: {
    height: 40,
    width: 100,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: 'white',
    justifyContent: 'center',
  },
  titleHeader: {
    fontSize: 20,
    color: 'white',
    paddingBottom: 2,
    fontWeight: 'bold',
  },
  captionHeader: {
    fontSize: 12,
    color: '#DBFF00',
  },
  titleMedia: {
    fontSize: 20,
    color: 'white',
    paddingBottom: 2,
    fontWeight: 'bold',
  },
  captionMedia: {
    color: 'white',
  },
  titleBotton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  containerOptions: {
    height: 80,
    padding: 25,
    borderColor: 'white',
    borderTopWidth: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    justifyContent: 'space-between',
  },
  containerItems: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerMedia: {
    flexDirection: 'row',
  },
  wrapperMedia: {
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  mediaCamera: {
    width: 90,
    height: 90,
    borderRadius: 10,
    objectFit: 'cover',
  },
  titleTag: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tag: {
    width: 80,
    height: 35,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'red',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default styles;
