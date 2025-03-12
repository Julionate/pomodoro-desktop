import { CloseIcon } from "../assets/Icons/CloseIcon";
import { createPortal } from "preact/compat";
import { useSignal } from "@preact/signals";

const SettingsMenu = () => {
  return (
    <div class="absolute w-max h-max p-6 rounded-2xl top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-white/75 shadow-xl shadow-gray-700/25 backdrop-blur-md">
      <CloseIcon class="absolute w-6 h-6 fill-black hover:fill-gray-700 cursor-pointer right-0" />
      <h1 class="text-4xl font-bold">Settings</h1>
      <div class="flex flex-col font-medium text-xl">
        <span>Working time</span>
        <span>Resting time</span>
        <span>Short break</span>
        <span>Long break</span>
      </div>
    </div>
  );
};

export const Settings = () => {
  return createPortal(<SettingsMenu />, document.body);
};
