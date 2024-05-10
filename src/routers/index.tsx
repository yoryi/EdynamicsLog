import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PhotoQ, Camera} from '../features';
import navigateRef from '../navigateRef';

export function Routers(): React.ReactElement | null {
  const Stack = createNativeStackNavigator();
  return (
    <GestureHandlerRootView style={styles.root}>
      <NavigationContainer
        ref={navigator => {
          navigateRef.setNavigator(navigator);
        }}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            statusBarColor: 'black',
            statusBarStyle: 'light',
            statusBarAnimation: 'none',
          }}
          initialRouteName={'Camera'}>
          <Stack.Screen name={'Camera'} component={Camera} />
          <Stack.Screen name={'PhotoQ'} component={PhotoQ} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
