import React from 'react';

import Stopwatch from '../src/component/Stopwatch';
import './Application.scss';

const Application = () => (
  <>
    <div styleName="header" />
    <div styleName="content">
      <Stopwatch />
    </div>
    <div styleName="footer" />
  </>
);

export default Application;
