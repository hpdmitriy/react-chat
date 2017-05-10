import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

const DevTools = createDevTools(
  <DockMonitor defaultIsVisible={false} toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-m'>
    <LogMonitor theme='tomorrow' />
  </DockMonitor>
);

export default DevTools;