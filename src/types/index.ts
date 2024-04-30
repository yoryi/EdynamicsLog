import { PhotoFile } from "react-native-vision-camera";
import { GestureResponderEvent } from "react-native";

export type Routes = {
  Camera: undefined;
  PreviewPhoto: {
    source: PhotoFile; typeMedia: string
  };
};

export interface ButtonCameraProps {
  iconName: string;
  color?: string;
  onEvent?: (event: GestureResponderEvent) => void;
}