import React from 'react';

import Stopwatch from '../src/component/Stopwatch';
import './Application.scss';

const Application = () => (
  <React.Fragment>
    <div styleName="header">
      <p>Header</p>
    </div>
    <div styleName="content">
      <Stopwatch />
    </div>
    <div styleName="footer">
      <p>Footer</p>
    </div>
  </React.Fragment>
);

export default Application;
