import React, { StrictMode } from 'react';
import ReactDom from 'react-dom';
import './index.css';
import App from './App';

const rootElement = document.getElementById('app');
ReactDom.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement,
);
