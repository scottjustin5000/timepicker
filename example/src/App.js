import React from 'react'

import { TimePicker } from 'timepicker'
import 'timepicker/dist/index.css'

const App = () => {
  const handleTimeChanged= (time) => {
    console.log('time = ', time)
  }
  return <div style={{width: '400px'}}>
     <TimePicker 
      placeHolder='set time'
      label = 'time'
      tweleveHours 
     onTimeChanged={handleTimeChanged} />
  </div> 
}

export default App
