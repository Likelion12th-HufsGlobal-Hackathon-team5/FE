import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { createRoot } from 'react-dom/client'


const rootElement=document.getElementById('root');
createRoot(rootElement).render(
  <>
    <App/>
  </>
);