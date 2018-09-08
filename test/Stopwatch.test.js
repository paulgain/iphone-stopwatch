import React from 'react';
import TestRenderer from 'react-test-renderer';
import Stopwatch from '../src/component/Stopwatch';
import Header from '../src/component/Header';
import ButtonPanel from '../src/component/ButtonPanel';
import TimerPanel from '../src/component/TimerPanel';
import LapList from '../src/component/LapList';
import Footer from '../src/component/Footer';

describe('Stopwatch', () => {
  let testRenderer;

  beforeEach(() => {
    testRenderer = TestRenderer.create(<Stopwatch />);
  });

  test('it should match the local snapshot', () => {
    const tree = testRenderer.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('it should render a Header', () => {
    const header = testRenderer.root.findByType(Header);
    expect(header.props).toEqual({});
  });

  test('it should render a TimerPanel', () => {
    const timerPanel = testRenderer.root.findByType(TimerPanel);
    expect(timerPanel.props.time).toBe(0);
  });

  test('it should render a ButtonPanel', () => {
    const buttonPanel = testRenderer.root.findByType(ButtonPanel);
    expect(buttonPanel.props.eventType).toBe('Reset');
    expect(buttonPanel.props.onButtonClick).toBeInstanceOf(Function);
  });

  test('it should render a LapList', () => {
    const lapList = testRenderer.root.findByType(LapList);
    expect(lapList.props.listTime).toBe(0);
    expect(lapList.props.lapTimes).toEqual([]);
    expect(lapList.props.eventType).toBe('Reset');
  });

  test('it should render a Footer', () => {
    const tooter = testRenderer.root.findByType(Footer);
    expect(tooter.props).toEqual({});
  });
});
