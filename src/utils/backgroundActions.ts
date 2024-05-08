import axios from 'axios';
import {MediaCamera} from '../types/index';
import {Dispatch, UnknownAction} from 'redux';
import {updateObject} from '../redux/feature/photoQ';
import NetInfo from '@react-native-community/netinfo';
import BackgroundActions from 'react-native-background-actions';

const updateState = (objeto: any, state: string) => {
  return {...objeto, state};
};

const sendObjectToAPI = async (dispatch: any, object: MediaCamera) => {
  const netInfoState = await NetInfo.fetch();
  try {
    const currentState = object.state;
    if (currentState === 'pendiente' || currentState === 'error') {
      if (!netInfoState.isConnected) {
        dispatch(
          updateObject({
            id: object?.nameMedia,
            newState: updateState(object, 'pendiente'),
          }),
        );
      }
      dispatch(
        updateObject({
          id: object?.nameMedia,
          newState: updateState(object, 'procesando'),
        }),
      );
      await new Promise(resolve => setTimeout(resolve, 1200));
      const body = {...object};
      const response = await axios.post(
        'https://api.restful-api.dev/objects',
        body,
      );
      dispatch(
        updateObject({
          id: object?.nameMedia,
          newState: updateState(
            object,
            response.status === 200 ? 'subida' : 'error',
          ),
        }),
      );
    }
  } catch (error) {
    dispatch(
      updateObject({
        id: object?.nameMedia,
        newState: updateState(object, 'error'),
      }),
    );
  }
};

export const onStartTaskBackground = (
  dispatch: Dispatch<UnknownAction>,
  state: [],
) => {
  const options = {
    taskName: 'backgroundTask',
    taskTitle: 'backgroundTask',
    taskDesc: 'Carga Multimedia en segundo plano aplications',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    parameters: {},
  };
  const taskActions = async () => {
    for (const states of state) {
      await sendObjectToAPI(dispatch, states);
    }
    BackgroundActions.stop();
  };
  BackgroundActions.start(taskActions, options);
};
