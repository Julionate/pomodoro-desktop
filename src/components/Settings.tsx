import { CloseIcon } from "../assets/icons/CloseIcon";
import { createPortal } from "preact/compat";
import { Signal, signal, useSignal } from "@preact/signals";
import { Pomodoro } from "../lib/Pomodoro";

export const isOpen = signal<boolean>(false);

export const toggleSettings = () => {
  isOpen.value = !isOpen.value;
};

const SettingsMenu = () => {
  const { workingTime, restingTime, longRestingTime, longRestingCycle } =
    Pomodoro.getData();

  const [workingInput, restingInput, longRestingInput, longRestingCycleInput] =
    [
      useSignal<number>(workingTime),
      useSignal<number>(restingTime),
      useSignal<number>(longRestingTime),
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

  const handleSubmit = () => {
    const data = {
      workingTime: workingInput.value,
      restingTime: restingInput.value,
      longRestingTime: longRestingInput.value,
      longRestingCycle: longRestingCycleInput.value,
    };
    Pomodoro.setData(data);
  };

  return (
    <div class="absolute w-full max-w-96 h-3/4 max-h-max p-6 rounded-2xl top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-white/75 shadow-xl shadow-gray-700/25 backdrop-blur-md overflow-y-hidden">
      <CloseIcon
        onClick={() => toggleSettings()}
        class="absolute w-6 h-6 fill-black hover:fill-gray-700 cursor-pointer right-4 top-4"
      />
      <h1 class="text-4xl font-bold mb-6 select-none">Settings</h1>
      <div class="flex flex-col font-medium text-xl gap-3 h-1/2 max-h-max overflow-y-auto">
        <div class="flex justify-between">
          <span>Working</span>
          <input
            onInput={(e) => handleOnInput(e, workingInput)}
            type="number"
            defaultValue={workingTime}
            min={0}
            class="w-16 h-8 bg-black/5 rounded-md text-center outline-none focus:border-2 border-black mr-2"
          />
        </div>
        <div class="flex justify-between">
          <span>Break</span>
          <input
            onInput={(e) => handleOnInput(e, restingInput)}
            type="number"
            defaultValue={restingTime}
            min={0}
            class="w-16 h-8 bg-black/5 rounded-md text-center outline-none focus:border-2 border-black mr-2"
          />
        </div>
        <div class="flex justify-between">
          <span>Long break</span>
          <input
            onInput={(e) => handleOnInput(e, longRestingInput)}
            type="number"
            defaultValue={longRestingInput}
            min={0}
            class="w-16 h-8 bg-black/5 rounded-md text-center outline-none focus:border-2 border-black mr-2"
          />
        </div>
        <div class="flex justify-between">
          <span>Long break cycles</span>
          <input
            onInput={(e) => handleOnInput(e, longRestingCycleInput)}
            type="number"
            defaultValue={longRestingCycleInput}
            min={0}
            class="w-16 h-8 bg-black/5 rounded-md text-center outline-none focus:border-2 border-black mr-2"
          />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        class="font-medium mt-4 py-1 px-4 border-2 rounded-lg w-max h-max self-center hover:bg-gray-700 hover:border-gray-700 hover:text-white transition-colors duration-100"
      >
        Apply
      </button>
    </div>
  );
};

export const Settings = () => {
  return createPortal(<SettingsMenu />, document.body);
};
