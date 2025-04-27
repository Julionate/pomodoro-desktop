import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/plugin-notification";
import { ReadConfig } from "./Configuration";

class NotificationClass {
  private enabled: "enabled" | "disabled";

  constructor() {
    this.enabled = "enabled";
  }

  sendNotification = async (
    title: string,
    notification: string
  ): Promise<void> => {
    if ((await this.permissionGranted()) && this.enabled === "enabled") {
      sendNotification({ title: title, body: notification });
    }
  };

  setConfiguration = (state: "enabled" | "disabled") => {
    this.enabled = this.enabled = state;
  };

  getEnabledStatus = () => {
    return this.enabled;
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

  fetchConfig = async () => {
    const configuration = await ReadConfig();
    if (configuration && configuration.enableNotifications) {
      this.enabled =
        configuration.enableNotifications === "enabled"
          ? "enabled"
          : "disabled";
    }
  };
}

export const Notification = new NotificationClass();
