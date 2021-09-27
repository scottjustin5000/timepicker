import React from 'react'
import { Wrapper, Icon } from './styles'
import Clock from './clock'
import Close from './close'


const Toggle = (props) => {

  const renderIcon = () => {
    if(props.mode=== 'clear') {
      return (
        <Icon cursor='pointer' onClick={props.onClearClick}> 
        <Close /> 
      </Icon>
      )
    } else {
      return (
        <Icon>
        <Clock /> 
      </Icon>
      )
    }
  }

  return (
    <Wrapper>
     { renderIcon() }
   </Wrapper>
  )
}

export default Toggle