import {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../constants';
import {ButtonCameraProps} from '../../types';

const ButtonOptions: React.FC<ButtonCameraProps> = ({iconName, onEvent}) => {
  const [isActive, setIsActive] = useState(false);
  const backgroundColor = isActive ? Colors.GREEN_APP : Colors.BLACK_50;
  const iconColor = isActive ? Colors.BLACK : Colors.WHITE;

  const handleEventButton = () => {
    setIsActive(!isActive);
    onEvent && onEvent();
  };
  
  const renderUI = () => {
    return (
      <TouchableOpacity
        style={[styles.buttonOptions, {backgroundColor}]}
        onPress={handleEventButton}>
        <Icon name={iconName} size={20} color={iconColor} />
      </TouchableOpacity>
    );
  };
  return renderUI();
};

export default ButtonOptions;
const styles = StyleSheet.create({
  buttonOptions: {
    width: 35,
    height: 35,
    borderRadius: 40,
    marginRight: 10,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
