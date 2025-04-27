import "./styles/global.css";
import { PauseIcon } from "./assets/icons/PauseIcon";
import { PlayIcon } from "./assets/icons/PlayIcon";
import { RestartIcon } from "./assets/icons/RestartIcon";
import { NextIcon } from "./assets/icons/NextIcon";
import { SettingsIcon } from "./assets/icons/SettingsIcon";
import { Pomodoro } from "./lib/Pomodoro";
import { TimeFormatter } from "./lib/TimeFormatter";
import { toggleSettings, Settings, isOpen } from "./components/Settings";
import { useEffect } from "preact/hooks";
import { Notification } from "./lib/Notifications";

function App() {
  useEffect(() => {
    Pomodoro.fetchConfig()
      .then(() => console.log("Data loaded successfull"))
      .catch(() => {
        console.log("Data coudn't load.");
      });

    Notification.fetchConfig()
      .then(() => console.log("Notification data loaded successfull"))
      .catch(() => {
        console.log("Data coudn't load");
      });
  }, []);

  return (
    <>
      <main class="w-screen h-screen flex flex-col items-center justify-center gap-6 p-6 overflow-y-hidden">
        <SettingsIcon
          onClick={toggleSettings}
          class="absolute top-6 right-6 w-8 h-8 stroke-black hover:stroke-gray-700 transition-colors cursor-pointer select-none"
        />
        <section class="h-max w-full max-w-4xl flex flex-col justify-center items-center overflow-hidden">
          <span class="font-medium select-none">
            {Pomodoro.isWorking.value
              ? "It's time to work!"
              : "It's time to take a break"}
          </span>
          <span
            onClick={toggleSettings}
            class="text-7xl sm:text-9xl font-medium text-black hover:text-gray-700 cursor-pointer select-none"
          >
            {TimeFormatter(Pomodoro.time.value)}
          </span>
        </section>
        <section class="w-max max-w-96 h-12 flex justify-center items-center *:fill-black *:hover:fill-gray-700 *:select-none *:cursor-pointer">
          <RestartIcon
            title="Restart"
            onClick={Pomodoro.resetTimer}
            class="w-auto h-full"
          />
          {Pomodoro.paused.value ? (
            <PauseIcon
              title="Play"
              onClick={Pomodoro.togglePause}
              class="w-auto h-full"
            />
          ) : (
            <PlayIcon
              title="Pause"
              onClick={Pomodoro.togglePause}
              class="w-auto h-full"
            />
          )}
          <NextIcon
            title="Skip"
            onClick={Pomodoro.skipState}
            class="w-auto h-full"
          />
        </section>
        <section class="absolute bottom-6 w-full max-w-96 flex flex-col justify-center items-center group">
          <span class="font-medium text-lg cursor-default">
            {`You have completed ${Pomodoro.getData()["pomodoros"]} pomodoros`}
          </span>
          <span class="hidden group-hover:block text-lg absolute -bottom-6 cursor-default">
            {`Next Long Rest in ${
              Pomodoro.getData()["longRestingCycle"]
            } pomodoros`}
          </span>
        </section>
      </main>
      {isOpen.value && <Settings />}
    </>
  );
}

export default App;
