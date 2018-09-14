import React, { Component } from 'react';
import shortid from 'shortid';
import raf from 'raf';
import TimerPanel from './TimerPanel';
import ButtonPanel from './ButtonPanel';
import LapList from './LapList';
import Timer from '../time/Timer';
import Header from './Header';
import Footer from './Footer';
import EVENT_TYPE from '../event/EventType';
import '../assets/styles/Stopwatch.scss';

class Stopwatch extends Component {
  static initialState() {
    return {
      eventType: EVENT_TYPE.RESET,
      time: 0,
      listTime: 0,
      lapTimes: []
    };
  }

  constructor(props) {
    super(props);
    this.timer = new Timer();
    this.listTimer = new Timer();
    this.rafHandle = null;
    this.state = Stopwatch.initialState();

    this.tick = this.tick.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  componentDidMount() {
    raf(this.tick);
  }

  componentWillUnmount() {
    raf.cancel(this.rafHandle);
  }

  onButtonClick(event) {
    switch (event.target.name) {
      case EVENT_TYPE.START:
        this.start();
        break;
      case EVENT_TYPE.STOP:
        this.stop();
        break;
      case EVENT_TYPE.LAP:
        this.lap();
        break;
      case EVENT_TYPE.RESET:
        this.reset();
        break;
      default: throw new Error(`Unknown click event: ${event.target.name}`);
    }
  }

  tick() {
    const { eventType } = this.state;
    if (eventType === EVENT_TYPE.START) {
      this.setState({
        time: this.timer.time(),
        listTime: this.listTimer.time()
      });
    }
    this.rafHandle = raf(this.tick);
  }

  start() {
    this.timer.start();
    this.listTimer.start();
    this.setState({ eventType: EVENT_TYPE.START });
  }

  stop() {
    this.timer.stop();
    this.listTimer.stop();
    this.setState({ eventType: EVENT_TYPE.STOP });
  }

  reset() {
    this.timer.reset();
    this.listTimer.reset();
    this.setState(Stopwatch.initialState());
  }

  lap() {
    this.createLapTime();
    this.listTimer.reset();
    this.listTimer.start();
    this.setState(this.addLapTime);
  }

  createLapTime() {
    this.currentLapTime = {
      id: shortid(),
      lapTime: this.listTimer.time()
    };
  }

  addLapTime(prevState) {
    return {
      ...prevState,
      lapTimes: [...prevState.lapTimes, this.currentLapTime]
    };
  }

  render() {
    const {
      eventType,
      time,
      listTime,
      lapTimes
    } = this.state;

    return (
      <div styleName="stopwatch">
        <Header />
        <TimerPanel time={time} />
        <ButtonPanel eventType={eventType} onButtonClick={this.onButtonClick} />
        <LapList listTime={listTime} lapTimes={lapTimes} eventType={eventType} />
        <Footer />
      </div>
    );
  }
}

export default Stopwatch;
