import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Make sure the path is correct
import './index.css'; // Tailwind CSS file

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
