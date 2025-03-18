export class SoundClass {
  private path: string;
  private audio: HTMLAudioElement;

  constructor(path: string = "/sounds/bamboo.mp3") {
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
    this.breakAudio = new SoundClass("/sounds/ding.mp3");
  }
}

export const Sound = new SoundController();
