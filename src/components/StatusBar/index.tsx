import {StyleSheet, View, StatusBar, SafeAreaView} from 'react-native';
import {ButtonCameraProps} from '../../types';

const StatusNav: React.FC<ButtonCameraProps> = () => {
  const renderUI = () => {
    return (
      <View style={styles.statusBar}>
        <SafeAreaView>
          <StatusBar backgroundColor={'black'} barStyle={'light-content'} />
        </SafeAreaView>
      </View>
    );
  };
  return renderUI();
};

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
export default StatusNav;
const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
