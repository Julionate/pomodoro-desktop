export enum TimeFormats {
  Seconds = "Seconds",
  Minutes = "Minutes",
  Hours = "Hours",
}

export const TimeFormatter = (t: number) => {
  const addZero = (t: number) => (t < 10 ? `0${t}` : t);

  const h = Math.floor(t / 3600);
  const m = Math.floor(t / 60) - h * 60;
  const s = Math.floor(t - h * 3600 - m * 60);

  return `${addZero(h)}:${addZero(m)}:${addZero(s)}`;
};

export const TimeConverter = (
  time: number,
  from: TimeFormats,
  to: TimeFormats
): number => {
  const conversionRates: Record<TimeFormats, number> = {
    [TimeFormats.Hours]: 3600,
    [TimeFormats.Minutes]: 60,
    [TimeFormats.Seconds]: 1,
  };

  return (time * conversionRates[from]) / conversionRates[to];
};

export const secondsToMinutes = (input: number) => {
  return TimeConverter(input, TimeFormats.Seconds, TimeFormats.Minutes);
};

export const minutesToSeconds = (input: number) => {
  return TimeConverter(input, TimeFormats.Minutes, TimeFormats.Seconds);
};
