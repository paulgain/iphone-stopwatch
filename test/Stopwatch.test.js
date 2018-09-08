import React from 'react';
import TestRenderer from 'react-test-renderer';
import Stopwatch from '../src/component/Stopwatch';
import Header from '../src/component/Header';
import ButtonPanel from '../src/component/ButtonPanel';
import TimerPanel from '../src/component/TimerPanel';
import LapList from '../src/component/LapList';
import Footer from '../src/component/Footer';
import Timer from '../src/time/Timer';

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

  describe('stopwatch sections', () => {
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
