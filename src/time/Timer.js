class Timer {
  constructor() {
    this.startTime = 0;
    this.stopTime = 0;
  }

  static now() {
    return (new Date()).getTime();
  }

  start() {
    this.startTime = this.startTime ? this.startTime : Timer.now();
  }

  stop() {
    this.stopTime = this.startTime ? this.stopTime + Timer.now() - this.startTime : this.stopTime;
    this.startTime = 0;
  }

  reset() {
    this.startTime = 0;
    this.stopTime = 0;
  }

  time() {
    return this.stopTime + (this.startTime ? Timer.now() - this.startTime : 0);
  }
}

export default Timer;
