import {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ButtonMainProps} from '../../types';

const ButtonMain: React.FC<ButtonMainProps> = ({onEvent, onRecording, onEndRecording}) => {
  const [isPressed, setIsPressed] = useState(false);
  
  const startRecording = () => (
    (setIsPressed(true), onRecording && onRecording(),
    setTimeout(() => (setIsPressed(false), onEndRecording && onEndRecording()), 10000))
  );

  const renderUI = () => {
    return (
      <TouchableOpacity
        onLongPress={startRecording}
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
