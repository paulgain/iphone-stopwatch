import React from 'react';

import Stopwatch from '../src/component/Stopwatch';
import './Application.scss';

const Application = () => (
  <React.Fragment>
    <div styleName="header" />
    <div styleName="content">
      <Stopwatch />
    </div>
    <div styleName="footer" />
  </React.Fragment>
);

export default Application;
