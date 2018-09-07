import Time from './Time';

class TimeFormatter {
  static pad(num, size) {
    const s = `0000${num}`;
    return s.substr(s.length - size);
  }

  static format(milliseconds) {
    let hours = Math.floor((milliseconds / Time.ONE_HOUR) % 24);
    let minutes = Math.floor((milliseconds / Time.ONE_MINUTE) % 60);
    let seconds = Math.floor((milliseconds / Time.ONE_SECOND) % 60);
    let ms = Math.floor((milliseconds % 1000) / 10);

    hours = TimeFormatter.pad(hours, 2);
    minutes = TimeFormatter.pad(minutes, 2);
    seconds = TimeFormatter.pad(seconds, 2);
    ms = TimeFormatter.pad(ms, 2);

    const formattedTime = `${minutes}:${seconds}:${ms}`;

    return (hours > 0) ? `${hours}:${formattedTime}` : formattedTime;
  }
}

export default TimeFormatter;
