import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ButtonCameraProps} from '../../types';

const ButtonMain: React.FC<ButtonCameraProps> = ({onEvent}) => {
  const renderUI = () => {
    return (
      <TouchableOpacity style={styles.buttonMain} onPress={onEvent}>
        <View style={styles.buttonCircle}/>
      </TouchableOpacity>
    );
  };
  return renderUI();
};

export default ButtonMain;
const styles = StyleSheet.create({
  buttonMain: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 40,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
  },
  buttonCircle: {
    width: 45,
    height: 45,
    borderRadius: 40,
    backgroundColor: 'white',
  },
});
