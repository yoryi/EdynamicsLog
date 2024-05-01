import { PhotoFile } from "react-native-vision-camera";
import { GestureResponderEvent, ImageSourcePropType } from "react-native";

export type Routes = {
  Camera: undefined;
  PreviewPhoto: {
    source: PhotoFile; typeMedia: string
  };
};

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