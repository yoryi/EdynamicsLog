import {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ButtonCameraProps} from '../../types';

const ButtonMain: React.FC<ButtonCameraProps> = ({onEvent}) => {
  const [isPressed, setIsPressed] = useState(false);
  const startRecording = () => setIsPressed(true);
  const stopRecording = () => setIsPressed(false);

  const renderUI = () => {
    return (
      <TouchableOpacity
        onPressIn={startRecording}
        onPressOut={stopRecording}
        style={styles.buttonMain}
        onPress={onEvent}>
        <View
          style={[styles.buttonCircle, isPressed && styles.buttonPressed]}
        />
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
    width: 50,
    height: 50,
    borderRadius: 40,
    backgroundColor: 'white',
  },
  buttonPressed: {
    backgroundColor: 'red',
  },
});
