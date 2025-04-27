import { create, BaseDirectory, mkdir, readFile } from "@tauri-apps/plugin-fs";
import { data } from "../types/Settings";

const CONFIG_PATH = "config/config.json";
const [encoder, decoder] = [new TextEncoder(), new TextDecoder()];

const HandleConfigFolder = async () => {
  await mkdir("config", { recursive: true, baseDir: BaseDirectory.AppConfig });
};

export const WriteConfig = async (data: data) => {
  await HandleConfigFolder();
  const file = await create(CONFIG_PATH, {
    baseDir: BaseDirectory.AppConfig,
  });

  await file.write(encoder.encode(JSON.stringify(data, null, 2)));
  await file.close();
};

export const ReadConfig = async (): Promise<data> => {
  const rawData = await readFile(CONFIG_PATH, {
    baseDir: BaseDirectory.AppConfig,
  });
  const data = decoder.decode(rawData);
  const dataJSON: data = JSON.parse(data);

  return dataJSON;
};
