import "./styles/global.css";
import { PauseIcon } from "./assets/Icons/PauseIcon";
import { PlayIcon } from "./assets/Icons/PlayIcon";
import { RestartIcon } from "./assets/Icons/RestartIcon";
import { NextIcon } from "./assets/Icons/NextIcon";
import { SettingsIcon } from "./assets/Icons/SettingsIcon";

import { Pomodoro } from "./lib/Pomodoro";
import { TimeFormatter } from "./lib/TimeFormatter";

function App() {
  return (
    <>
      <main class="w-screen h-screen flex flex-col items-center justify-center gap-6 p-6">
        <SettingsIcon class="absolute top-6 right-6 w-8 h-8 stroke-black hover:stroke-gray-700 transition-colors cursor-pointer select-none" />
        <section class="min-h-32 h-max w-full max-w-4xl flex flex-col justify-center items-center overflow-hidden">
          <span class="font-medium">
            {Pomodoro.isWorking.value
              ? "It's time to work!"
              : "It's time to take a break"}
          </span>
          <span class="text-8xl font-medium text-black hover:text-gray-700 cursor-pointer select-none">
            {TimeFormatter(Pomodoro.time.value)}
          </span>
        </section>
        <section class="w-max max-w-96 h-12 flex justify-center items-center *:fill-black *:hover:fill-gray-700 *:select-none *:cursor-pointer">
          <RestartIcon onClick={Pomodoro.resetTimer} class="w-auto h-full" />
          {Pomodoro.paused.value ? (
            <PauseIcon onClick={Pomodoro.togglePause} class="w-auto h-full" />
          ) : (
            <PlayIcon onClick={Pomodoro.togglePause} class="w-auto h-full" />
          )}
          <NextIcon onClick={Pomodoro.skipState} class="w-auto h-full" />
        </section>
        <section class="absolute bottom-6 w-full max-w-96 flex flex-col justify-center items-center group">
          <span class="font-medium text-lg cursor-default">
            You have finished 3 pomodoros
          </span>
          <span class="hidden group-hover:block text-lg absolute -bottom-6 cursor-default">
            Next long rest in 1 pomodoro
          </span>
        </section>
      </main>
    </>
  );
}

export default App;
