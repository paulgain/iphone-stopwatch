import React from 'react';
import TestRenderer from 'react-test-renderer';
import Stopwatch from '../src/component/Stopwatch';
import Header from '../src/component/Header';
import ButtonPanel from '../src/component/ButtonPanel';
import TimerPanel from '../src/component/TimerPanel';
import LapList from '../src/component/LapList';
import Footer from '../src/component/Footer';
import Timer from '../src/time/Timer';
import EVENT_TYPE from '../src/event/EventType';

describe('Stopwatch', () => {
  const initialState = {
    eventType: 'Reset',
    time: 0,
    listTime: 0,
    lapTimes: []
  };

  describe('static initialState()', () => {
    test('it should create the state', () => {
      expect(Stopwatch.initialState()).toEqual(initialState);
    });
  });

  describe('constructor()', () => {
    test('should define 2 timers, state, props and requestID', () => {
      const testRenderer = TestRenderer.create(<Stopwatch />);
      const instance = testRenderer.getInstance();
      expect(instance.timer).toBeInstanceOf(Timer);
      expect(instance.listTimer).toBeInstanceOf(Timer);
      expect(instance.props).toEqual({});
      expect(instance.state).toEqual(initialState);
      expect(instance.handle).not.toBe(null);
    });
  });

  describe('onButtonClick(event)', () => {
    const stopwatch = new Stopwatch();
    const event = { target: { name: 'Start' } };

    test('it should call the start() function', () => {
      stopwatch.start = jest.fn();
      stopwatch.onButtonClick(event);
      expect(stopwatch.start).toHaveBeenCalled();
    });

    test('it should call the stop() function', () => {
      stopwatch.stop = jest.fn();
      event.target.name = 'Stop';
      stopwatch.onButtonClick(event);
      expect(stopwatch.stop).toHaveBeenCalled();
    });

    test('it should call the lap() function', () => {
      stopwatch.lap = jest.fn();
      event.target.name = 'Lap';
      stopwatch.onButtonClick(event);
      expect(stopwatch.lap).toHaveBeenCalled();
    });

    test('it should call the reset() function', () => {
      stopwatch.reset = jest.fn();
      event.target.name = 'Reset';
      stopwatch.onButtonClick(event);
      expect(stopwatch.reset).toHaveBeenCalled();
    });

    test('it should throw an error', () => {
      expect(() => stopwatch.onButtonClick({ target: { name: 'Doh' } }))
        .toThrowError('Unknown click event: Doh');
    });
  });

  describe('stopwatch actions start(), stop(), reset() and lap()', () => {
    let stopwatch;

    beforeEach(() => {
      stopwatch = new Stopwatch();
    });

    it('it should start both timers and update the state', () => {
      stopwatch.timer = { start: jest.fn() };
      stopwatch.listTimer = { start: jest.fn() };
      stopwatch.setState = jest.fn();
      stopwatch.start();

      expect(stopwatch.timer.start).toHaveBeenCalled();
      expect(stopwatch.listTimer.start).toHaveBeenCalled();
      expect(stopwatch.setState).toHaveBeenCalledWith({ eventType: EVENT_TYPE.START });
    });

    it('it should stop both timers and update the state', () => {
      stopwatch.timer = { stop: jest.fn() };
      stopwatch.listTimer = { stop: jest.fn() };
      stopwatch.setState = jest.fn();
      stopwatch.stop();

      expect(stopwatch.timer.stop).toHaveBeenCalled();
      expect(stopwatch.listTimer.stop).toHaveBeenCalled();
      expect(stopwatch.setState).toHaveBeenCalledWith({ eventType: EVENT_TYPE.STOP });
    });

    it('it should reset both timers and update the state', () => {
      stopwatch.timer = { reset: jest.fn() };
      stopwatch.listTimer = { reset: jest.fn() };
      stopwatch.setState = jest.fn();
      stopwatch.reset();

      expect(stopwatch.timer.reset).toHaveBeenCalled();
      expect(stopwatch.listTimer.reset).toHaveBeenCalled();
      expect(stopwatch.setState).toHaveBeenCalledWith(Stopwatch.initialState());
    });

    it('it should save the current lap time', () => {
      stopwatch.createLapTime = jest.fn();
      stopwatch.listTimer = { reset: jest.fn(), start: jest.fn() };
      stopwatch.setState = jest.fn();
      stopwatch.lap();

      expect(stopwatch.createLapTime).toHaveBeenCalled();
      expect(stopwatch.listTimer.reset).toHaveBeenCalled();
      expect(stopwatch.listTimer.start).toHaveBeenCalled();
      expect(stopwatch.setState).toHaveBeenCalledWith(stopwatch.addLapTime);
    });
  });

  describe('helper functions', () => {
    let stopwatch;

    beforeEach(() => {
      stopwatch = new Stopwatch();
      stopwatch.listTimer = { time: jest.fn().mockReturnValue(100) };
      stopwatch.createLapTime();
    });

    it('it should create a lap time', () => {
      expect(stopwatch.currentLapTime.id).toBeDefined();
      expect(stopwatch.currentLapTime.lapTime).toEqual(100);
    });

    it('it should immutably add a lap time to the previous lap times', () => {
      const prevState = { lapTimes: [{ id: 'UTWe8YB9Cs', lapTime: 10 }] };
      const newState = stopwatch.addLapTime(prevState);

      expect(newState.lapTimes.length).toEqual(2);

      // Test for immutability
      expect(newState).not.toBe(prevState);
      expect(newState.lapTimes).not.toBe(prevState.lapTimes);
    });
  });

  describe('stopwatch UI sections', () => {
    const { root } = TestRenderer.create(<Stopwatch />);

    test('it should contain a Header', () => {
      const header = root.findByType(Header);
      expect(header.props).toEqual({});
    });

    test('it should contain a TimerPanel', () => {
      const timerPanel = root.findByType(TimerPanel);
      expect(timerPanel.props.time).toBe(0);
    });

    test('it should contain a ButtonPanel', () => {
      const buttonPanel = root.findByType(ButtonPanel);
      expect(buttonPanel.props.eventType).toBe('Reset');
      expect(buttonPanel.props.onButtonClick).toBeInstanceOf(Function);
    });

    test('it should contain a LapList', () => {
      const lapList = root.findByType(LapList);
      expect(lapList.props.listTime).toBe(0);
      expect(lapList.props.lapTimes).toEqual([]);
      expect(lapList.props.eventType).toBe('Reset');
    });

    test('it should contain a Footer', () => {
      const tooter = root.findByType(Footer);
      expect(tooter.props).toEqual({});
    });
  });

  describe('Snapshot', () => {
    test('it should match the local snapshot', () => {
      const testRenderer = TestRenderer.create(<Stopwatch />);
      expect(testRenderer.toJSON()).toMatchSnapshot();
    });
  });
});
