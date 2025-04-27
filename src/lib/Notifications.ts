import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/plugin-notification";

export const testPermission = async () => {
  let permissionGranted = await isPermissionGranted();

  if (!permissionGranted) {
    const permission = await requestPermission();
    permissionGranted = permission === "granted";
  }

  if (permissionGranted) {
    sendNotification({ title: "Tauri", body: "Tauri is awesome!" });
  }
};

class NotificationClass {
  sendNotification = async (
    title: string,
    notification: string
  ): Promise<void> => {
    if (await this.permissionGranted()) {
      sendNotification({ title: title, body: notification });
    }
  };

  private permissionGranted = async (): Promise<boolean> => {
    let hasPermission: boolean;

    hasPermission = await this.checkPermissions();

    if (!hasPermission) {
      hasPermission = await this.requestPermission();
    }

    return hasPermission;
  };

  private checkPermissions = async (): Promise<boolean> => {
    return await isPermissionGranted();
  };

  private requestPermission = async (): Promise<boolean> => {
    const permission = await requestPermission();
    return permission === "granted";
  };
}

export const Notification = new NotificationClass();
