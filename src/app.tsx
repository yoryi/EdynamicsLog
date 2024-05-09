import {Provider} from 'react-redux';
import stores from './redux/stores';
import {Routers} from '../src/routers';

const Applications = () => {
  return (
    <Provider store={stores}>
        <Routers />
    </Provider>
  );
};
export default Applications;
