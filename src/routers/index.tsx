import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PreviewPhoto, Camera} from '../features';
import navigateRef from '../navigateRef';
import {Routes} from '../types';

export function Routers(): React.ReactElement | null {
  const Stack = createNativeStackNavigator<Routes>();
  return (
    <GestureHandlerRootView style={styles.root}>
       <NavigationContainer
          ref={navigator => {
            navigateRef.setNavigator(navigator);
          }}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            statusBarStyle: 'dark',
            animationTypeForReplace: 'pop',
          }}
          initialRouteName={'Camera'}>
          <Stack.Screen name={'Camera'} component={Camera} />
          <Stack.Screen name={'PreviewPhoto'} component={PreviewPhoto} />
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
