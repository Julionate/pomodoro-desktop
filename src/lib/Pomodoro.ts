import { Signal, signal } from "@preact/signals";

export class PomodoroClass {
  readonly time: Signal<number>;
  readonly pomodoros: Signal<number>;
  private workingTime: number;
  private restingTime: number;
  readonly paused: Signal<boolean>;
  readonly isWorking: Signal<boolean>;

  constructor() {
    this.workingTime = 3;
    this.restingTime = 1;
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

  private switchState = () => {
    this.isWorking.value = !this.isWorking.value;
  };

  private initTimer() {
    setInterval(() => {
      if (this.time.value > 0 && this.paused.value) {
        this.time.value -= 1;
      } else if (this.time.value <= 0 && this.paused.value) {
        this.time.value = this.isWorking.value
          ? this.restingTime
          : this.workingTime;
        this.switchState();
      }
    }, 1000);
  }
}

export const Pomodoro = new PomodoroClass();
