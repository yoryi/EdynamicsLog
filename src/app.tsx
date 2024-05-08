import {LogBox} from 'react-native';
import {Routers} from '../src/routers';
import {Provider} from 'react-redux';
import stores from './redux/stores';

const Applications = () => {
  return (
    <Provider store={stores}>
      <Routers />
    </Provider>
  );
};
export default Applications;
