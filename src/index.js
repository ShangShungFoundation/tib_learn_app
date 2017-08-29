import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render((
  <BrowserRouter basename="/tib_learn_app/">
    <App />
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
