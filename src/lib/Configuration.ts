import { create, BaseDirectory, mkdir, readFile } from "@tauri-apps/plugin-fs";

const HandleConfigFolder = async () => {
  await mkdir("config", { recursive: true, baseDir: BaseDirectory.AppConfig });
};

export const CreateFile = async () => {
  await HandleConfigFolder();

  const file = await create("config/test.txt", {
    baseDir: BaseDirectory.AppConfig,
  });
  await file.write(new TextEncoder().encode("Hola"));
  await file.close();
};

export const ReadFile = async () => {
  return await readFile("config/test.txt", {
    baseDir: BaseDirectory.AppConfig,
  });
};
