import { CloseIcon } from "../assets/icons/CloseIcon";
import { createPortal } from "preact/compat";
import { Signal, signal, useSignal } from "@preact/signals";
import { Pomodoro } from "../lib/Pomodoro";
import { WriteConfig } from "../lib/Configuration";
import { secondsToMinutes, minutesToSeconds } from "../lib/TimeFormatter";
export const isOpen = signal<boolean>(false);

export const toggleSettings = () => {
  isOpen.value = !isOpen.value;
};

const SettingsMenu = () => {
  const { workingTime, restingTime, longRestingTime, longRestingCycle } =
    Pomodoro.getData();

  const [workingInput, restingInput, longRestingInput, longRestingCycleInput] =
    [
      useSignal<number>(secondsToMinutes(workingTime)),
      useSignal<number>(secondsToMinutes(restingTime)),
      useSignal<number>(secondsToMinutes(longRestingTime)),
      useSignal<number>(longRestingCycle),
    ];

  const handleOnInput = (e: Event, Signal: Signal<number>) => {
    const target = e.target as HTMLInputElement;
    try {
      const targetNumber = Number(target.value);
      Signal.value = targetNumber < 0 ? 0 : targetNumber;
    } catch (err) {
      console.error(`An error ocurred: ${err}`);
    }
  };

  const handleSubmit = async () => {
    const data = {
      workingTime: minutesToSeconds(workingInput.value),
      restingTime: minutesToSeconds(restingInput.value),
      longRestingTime: minutesToSeconds(longRestingInput.value),
      longRestingCycle: longRestingCycleInput.value,
    };
    Pomodoro.setData(data);
    await WriteConfig(data);
  };

  return (
    <div class="absolute flex flex-col w-full max-w-96 h-3/4 max-h-max p-6 rounded-2xl top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-white/75 shadow-xl shadow-gray-700/25 backdrop-blur-md overflow-y-hidden">
      <CloseIcon
        onClick={() => toggleSettings()}
        class="absolute w-6 h-6 fill-black hover:fill-gray-700 cursor-pointer right-4 top-4"
      />
      <h1 class="text-4xl font-bold mb-6 select-none">Settings</h1>
      <div class="flex flex-col font-normal text-xl gap-3 h-1/2 max-h-max overflow-y-auto">
        <span class="font-medium">Time (Minutes)</span>
        <div class="flex justify-between">
          <span>Working</span>
          <input
            onInput={(e) => handleOnInput(e, workingInput)}
            type="number"
            defaultValue={workingInput.value}
            class="max-w-18 h-8 pl-2 bg-black/5 hover:bg-black/10 rounded-md outline-none focus:border-2 border-black"
          />
        </div>
        <div class="flex justify-between">
          <span>Break</span>
          <input
            onInput={(e) => handleOnInput(e, restingInput)}
            type="number"
            defaultValue={restingInput.value}
            min={0}
            class="max-w-18 h-8 pl-2 bg-black/5 hover:bg-black/10 rounded-md outline-none focus:border-2 border-black"
          />
        </div>
        <div class="flex justify-between">
          <span>Long break</span>
          <input
            onInput={(e) => handleOnInput(e, longRestingInput)}
            type="number"
            defaultValue={longRestingInput.value}
            min={0}
            class="max-w-18 h-8 pl-2 bg-black/5 hover:bg-black/10 rounded-md outline-none focus:border-2 border-black"
          />
        </div>
        <div class="flex justify-between">
          <span>Long break cycles</span>
          <input
            onInput={(e) => handleOnInput(e, longRestingCycleInput)}
            type="number"
            defaultValue={longRestingCycleInput.value}
            min={0}
            class="max-w-18 h-8 pl-2 bg-black/5 hover:bg-black/10 rounded-md outline-none focus:border-2 border-black"
          />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        class="font-medium self-center select-none mt-4 py-1 px-4 border-2 rounded-lg w-max h-max hover:bg-gray-700 hover:border-gray-700 hover:text-white text-center transition-colors duration-100 cursor-pointer"
      >
        Save
      </button>
    </div>
  );
};

export const Settings = () => {
  return createPortal(<SettingsMenu />, document.body);
};
