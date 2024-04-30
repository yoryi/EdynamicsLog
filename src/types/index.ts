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
  source?: PhotoFile | ImageSourcePropType;
  embled?: boolean;
  onEvent?: (event: GestureResponderEvent) => void;
}