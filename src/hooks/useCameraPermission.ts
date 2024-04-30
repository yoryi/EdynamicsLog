import { Camera } from 'react-native-vision-camera';
import { useEffect, useState } from 'react';

type CameraPermissionState = boolean | null;
const useCameraPermission = (): [CameraPermissionState, () => void] => {
  const [cameraPermission, setCameraPermission] = useState<CameraPermissionState>(null);
  const requirePermissions = async () => {
    try {
      await Camera.requestCameraPermission();
      setCameraPermission(true);
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      setCameraPermission(false);
    }
  };

  useEffect(() => {
    (async () => {
      await requirePermissions();
    })();
  }, []);

  const refreshPermission = async () => {
    await requirePermissions();
  };
  return [cameraPermission, refreshPermission];
};
export default useCameraPermission;
