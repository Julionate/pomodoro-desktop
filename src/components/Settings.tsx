import { CloseIcon } from "../assets/icons/CloseIcon";
import { createPortal } from "preact/compat";
import { signal } from "@preact/signals";

export const isOpen = signal<boolean>(false);

export const toggleSettings = () => {
  isOpen.value = !isOpen.value;
};

const SettingsMenu = () => {
  return (
    <div class="absolute w-full h-max max-w-72 p-6 rounded-2xl top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-white/75 shadow-xl shadow-gray-700/25 backdrop-blur-md overflow-y-hidden">
      <CloseIcon
        onClick={toggleSettings}
        class="absolute w-6 h-6 fill-black hover:fill-gray-700 cursor-pointer right-4 top-4"
      />
      <h1 class="text-4xl font-bold mb-6">Settings</h1>
      <div class="flex flex-col font-medium text-xl overflow-y-auto gap-3">
        <div class="flex justify-between">
          <span>Working</span>
          <input class="w-16 h-8 bg-black/5 rounded-md text-center outline-none focus:border-2 border-black mr-2" />
        </div>
        <div class="flex justify-between">
          <span>Break</span>
          <input class="w-16 h-8 bg-black/5 rounded-md text-center outline-none focus:border-2 border-black mr-2" />
        </div>
        <div class="flex justify-between">
          <span>Long break</span>
          <input class="w-16 h-8 bg-black/5 rounded-md text-center outline-none focus:border-2 border-black mr-2" />
        </div>
      </div>
    </div>
  );
};

export const Settings = () => {
  return createPortal(<SettingsMenu />, document.body);
};
