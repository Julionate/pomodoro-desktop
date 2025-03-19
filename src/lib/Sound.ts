export class SoundClass {
  private path: string;
  private audio: HTMLAudioElement;

  constructor(path: string = "/sounds/warm_alarm.ogg") {
    this.path = path;
    this.audio = this.generateSoundObject();
  }

  private generateSoundObject = () => {
    return new Audio(this.path);
  };

  play = () => {
    this.audio.play();
  };
}

export class SoundController {
  readonly workAudio: SoundClass;
  readonly breakAudio: SoundClass;

  constructor() {
    this.workAudio = new SoundClass();
    this.breakAudio = new SoundClass("/sounds/magic_bell.ogg");
  }
}

export const Sound = new SoundController();
