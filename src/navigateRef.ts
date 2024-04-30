import { CommonActions, NavigationContainerRef } from '@react-navigation/native';
import { Routes } from './types';

let navigator: NavigationContainerRef<Routes> | null = null;

const getNavigator = () => {
  return navigator;
};

const setNavigator = (nav: NavigationContainerRef<Routes> | any) => {
  navigator = nav;
};

const goBack = () => {
  if (navigator) {
    navigator.dispatch(CommonActions.goBack());
  }
};

const navigate = (name: string, params: any) => {
  if (navigator) {
    navigator.dispatch(
      CommonActions.navigate({
        name,
        params,
      }),
    );
  }
};

export default {
  getNavigator,
  setNavigator,
  goBack,
  navigate,
};
