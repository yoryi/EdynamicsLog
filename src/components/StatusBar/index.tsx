import {StatusBar} from 'react-native';
import {ButtonCameraProps} from '../../types';

const StatusNav: React.FC<ButtonCameraProps> = () => {
  const renderUI = () => {
    return <StatusBar backgroundColor={'black'} barStyle={'light-content'} />;
  };
  return renderUI();
};
export default StatusNav;
