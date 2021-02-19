export default class stopWatch {
  running = false;
  paused = false;
  startTime = 0;
  savedTime: null | number = null;
  difference = 0;
  tInterval: null | NodeJS.Timeout = null;

  startWatch = () => {
    if (!this.running) {
      this.startTime = new Date().getTime();
      this.tInterval = setInterval(this.updateTime, 1);
      this.paused = false;
      this.running = true;
    }
  };

  pauseWatch = () => {
    if (this.paused) {
      this.startWatch();
    } else {
      this.paused = true;
      this.running = false;
      this.savedTime = this.difference;
      this.destroy();
    }
  };

  updateTime = () => {
    const currentTime = new Date().getTime();
    if (this.savedTime) {
      this.difference = currentTime - this.startTime + this.savedTime;
    } else {
      this.difference = currentTime - this.startTime;
    }
  };

  resetWatch = () => {
    this.startTime = 0;
    this.difference = 0;
    this.savedTime = null;
    this.tInterval = null;
    this.paused = false;
    this.running = false;
  };

  destroy = () => {
    if (this.tInterval != null) {
      clearInterval(this.tInterval);
    }
  };

  getSeconds = () => {
    return this.difference / 1000;
  };
}
