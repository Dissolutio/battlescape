import React from 'react';
import ReactDOM from 'react-dom';
import { CloudinaryContext } from 'cloudinary-react'

import App from './App';
import 'normalize.css'
import './index.css'
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <CloudinaryContext cloudName="mystery-maintenance">
    <App />
  </CloudinaryContext>,
  document.getElementById('root'));

serviceWorker.unregister();
