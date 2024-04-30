import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {ButtonMainProps} from '../../types';

const circularImage: React.FC<ButtonMainProps> = ({
  embled,
  onEvent,
  source,
}) => {
  const renderUI = () => {
    return (
      <>
        {embled ? (
          <TouchableOpacity onPress={onEvent}>
            <Image source={source} style={styles.captureImage} />
          </TouchableOpacity>
        ) : (
          <View style={styles.captureImage} />
        )}
      </>
    );
  };
  return renderUI();
};

export default circularImage;
const styles = StyleSheet.create({
  captureImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    resizeMode: 'stretch',
  },
});
