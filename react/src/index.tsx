import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import WrappedApp from './App'

// React Boiler Plate um die gesammte App zu rendern
ReactDOM.render(
  <React.StrictMode>
    <WrappedApp/>
  </React.StrictMode>,
  document.getElementById('root')
)
