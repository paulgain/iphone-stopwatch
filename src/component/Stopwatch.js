import React, { Component } from 'react';
import shortid from 'shortid';
import TimerPanel from './TimerPanel';
import ButtonPanel from './ButtonPanel';
import LapList from './LapList';
import Timer from '../time/Timer';
import Header from './Header';
import Footer from './Footer';
import EVENT_TYPE from '../event/EventTypes';
import '../assets/styles/Stopwatch.scss';

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.timer = new Timer();
    this.listTimer = new Timer();
    this.requestID = null;
    this.state = {
      eventType: EVENT_TYPE.RESET,
      time: 0,
      listTime: 0,
      lapTimes: []
    };

    this.start = this.start.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
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

  start() {
    this.timer.start();
    this.listTimer.start();
    this.setState({
      eventType: EVENT_TYPE.START,
      time: this.timer.time(),
      listTime: this.listTimer.time()
    });
    this.requestID = requestAnimationFrame(this.start);
  }

  stop() {
    this.timer.stop();
    this.listTimer.stop();
    cancelAnimationFrame(this.requestID);
    this.setState({ eventType: EVENT_TYPE.STOP });
  }

  reset() {
    this.timer.reset();
    this.listTimer.reset();
    cancelAnimationFrame(this.requestID);
    this.setState({
      eventType: EVENT_TYPE.RESET,
      time: 0,
      listTime: 0,
      lapTimes: []
    });
  }

  lap() {
    const time = { id: shortid(), lapTime: this.listTimer.time() };
    this.listTimer.reset();
    this.setState(prevState => ({
      lapTimes: [...prevState.lapTimes, time]
    }));
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
