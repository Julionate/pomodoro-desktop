import { Signal, signal } from "@preact/signals";
import { data } from "../types/Settings";
import { ReadConfig } from "./Configuration";
import { Sound } from "./Sound";

export class PomodoroClass {
  private workingTime: number;
  private restingTime: number;
  private longRestingTime: number;
  private autoStart: Signal<"enabled" | "disabled">;
  private longRestingCycle: Signal<number>;
  private longRestingCycleCopy: number;
  private pomodoros: Signal<number>;
  readonly paused: Signal<boolean>;
  readonly isWorking: Signal<boolean>;
  readonly time: Signal<number>;

  constructor() {
    this.workingTime = 1200;
    this.restingTime = 300;
    this.longRestingTime = 900;
    this.autoStart = signal("disabled");
    this.longRestingCycleCopy = 3;
    this.longRestingCycle = signal(this.longRestingCycleCopy);
    this.pomodoros = signal(0);
    this.paused = signal(false);
    this.isWorking = signal(true);
    this.time = signal(this.workingTime);
    this.initTimer();
  }

  togglePause = () => {
    this.paused.value = !this.paused.value;
  };

  resetTimer = () => {
    this.time.value = this.isWorking.value
      ? this.workingTime
      : this.restingTime;
  };

  skipState = () => {
    this.isWorking.value = !this.isWorking.value;
    this.resetTimer();
  };

  getData = () => {
    return {
      workingTime: this.workingTime,
      restingTime: this.restingTime,
      longRestingTime: this.longRestingTime,
      longRestingCycle: this.longRestingCycle.value,
      pomodoros: this.pomodoros.value,
      autoStart: this.autoStart.value,
    };
  };

  setData = (data: data) => {
    this.workingTime = data.workingTime;
    this.restingTime = data.restingTime;
    this.longRestingTime = data.longRestingTime;
    this.longRestingCycle.value = data.longRestingCycle;
    this.longRestingCycleCopy = data.longRestingCycle;
    this.autoStart.value = data.autoStart;
    this.resetTimer();
  };

  fetchConfig = async () => {
    const config = await ReadConfig();
    if (!config) return;
    this.setData(config);
  };

  private switchState = () => {
    this.isWorking.value = !this.isWorking.value;
  };

  private addPomodoro = () => {
    if (this.isWorking.value) {
      this.pomodoros.value += 1;
    }
  };

  autoStartHandler = () => {
    this.autoStart.value === "enabled"
      ? (this.paused.value = true)
      : (this.paused.value = false);
  };

  private playAudio = () => {
    !this.isWorking.value ? Sound.workAudio.play() : Sound.breakAudio.play();
  };

  private longBreakHandle = () => {
    this.longRestingCycle.value -= 1;
    if (this.longRestingCycle.value <= 0) {
      this.longRestingCycle.value = this.longRestingCycleCopy;
      return true;
    } else {
      return false;
    }
  };

  private initTimer() {
    setInterval(() => {
      if (this.time.value > 0 && this.paused.value) {
        this.time.value -= 1;
      } else if (this.time.value <= 0 && this.paused.value) {
        this.autoStartHandler();
        this.time.value = this.isWorking.value
          ? this.longBreakHandle()
            ? this.longRestingTime
            : this.restingTime
          : this.workingTime;
        this.addPomodoro();
        this.playAudio();
        this.switchState();
      }
    }, 1000);
  }
}

export const Pomodoro = new PomodoroClass();
