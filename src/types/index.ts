import type {PhotoFile, VideoFile} from 'react-native-vision-camera';
import { GestureResponderEvent, ImageProps, ImageSourcePropType } from "react-native";
import { VideoProperties } from 'react-native-video';

export type Routes = {
  Camera: undefined;
  PreviewPhoto: {
    source: PhotoFile; typeMedia: string
  };
};

export type MediaCamera = {
  state: string;
  pathMedia: PhotoFile | VideoFile | ImageProps | VideoProperties | any;
  nameMedia: string;
  typeMedia: string;
};

export type ItemState = 'pendiente' | 'error' | 'subiendo' | 'procesando'

export interface ButtonCameraProps {
  iconName?: string;
  color?: string;
  onEvent?: (event: GestureResponderEvent) => void;
}

export interface ButtonMainProps {
  source?: PhotoFile | ImageSourcePropType | any;
  embled?: boolean;
  onRecording?: () => void;
  onEndRecording?: () => void;
  onEvent?: (event: GestureResponderEvent) => void;
}

export interface CounterRecordingProps {
  counter?: boolean;
}