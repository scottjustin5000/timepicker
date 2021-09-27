import React, { useState, useRef, useEffect, Fragment } from 'react'
import useOnClickOutside from '../hooks/use-on-click-outside'
import TimeToggle from './time-toggle'
import {
  FilterContainer,
  Input,
  SmallTitle,
  DropDownList,
  ListItem,
  Option,
  OptionLabel,
  Now,
  DropDownOptions,
  OptionsContainer,
  DropDownWrapper,
  IconWrapper
} from './styles'


const FilterInput = (props) => {
  const [inputFocused, setInputFocused] = useState(false)
  const [active, setActive] = useState(false)
  const inputRef = useRef()
  const ref = useRef()
  const minRef = useRef()
  const hourRef = useRef()
  const secRef = useRef()
  const merRef = useRef()
  const [mins, setMins] = useState()
  const [hours, setHours] = useState()
  const [secs, setSecs] = useState()
  const [hourItems, setHourItems] = useState([])
  const [sixtyItems] = useState(Array.apply(0, Array(60)).map((_, index) =>  ('00' + index).substr(-2,2)))
  const [meridiem, setMeridiem] = useState()
  const [mode, setMode] = useState('time')

  const formatTime = () => {
    return props.tweleveHours ? `${hours - 0}:${mins}:${secs}:${meridiem}` : `${hours}:${mins}:${secs}`
  }

  useOnClickOutside(ref, () => setActive(false))

  useEffect(() => {
    if(props.tweleveHours) {
      const twelves = Array.apply(0, Array(11)).map((_, index) =>  ('00' + (index+1)).substr(-2,2))
      const f = [...['12'], ...twelves]
      setHourItems(f)

    } else {
      setHourItems(Array.apply(0, Array(24)).map((_, index) =>  ('00' + index).substr(-2,2)))
    }

  },[props.tweleveHours])

  useEffect(() => {
     if(!secs || !mins || !hours) return 
     
     const time = formatTime()
     inputRef.current.value = time

     setMode('clear')
     props.onTimeChanged(time)

  },[secs, mins, hours, meridiem])

  const setScroll = (el, top) => {
    el.scroll({
      top: top,
      behavior: 'smooth'
    })
  }

  const updateTime = (type) => {

    if(type!=='hour' && !hours) {
      setHours(props.tweleveHours ? '12' : '00')
    }  
    if(type!=='mins' && !mins) {
      setMins('00')
    }
    if(type!=='secs' && !secs) {
      setSecs('00')
    } 
    if(type!=='mer' && props.tweleveHours && !meridiem) {
      setMeridiem('AM')
    }
   
  }

  const handleHourSelection = (e, v) => { 
    setScroll(hourRef.current, e.target.offsetTop)
    setHours(v)
    updateTime('hour')
  }

  const handleMinSelection = (e, v) => { 
    setScroll(minRef.current, e.target.offsetTop)
    setMins(v)
    updateTime('mins')
  }

  const handleSecSelection = (e, v) => { 
    setScroll(secRef.current, e.target.offsetTop)
    setSecs(v)
    updateTime('secs')
  }

  const handleMeridiemSelection = (e, v) => { 
    setScroll(merRef.current, e.target.offsetTop)
    setMeridiem(v)
    updateTime('mer')
  }

  const handleFocus = () => {
    setInputFocused(true)
    setActive(true)
  }

  const handleBlur = (e) => {
    setInputFocused(false)
  }

  const handleClearClick = () => {
   
   setScroll(minRef.current, 0)
   setScroll(hourRef.current, 0)
   setScroll(secRef.current, 0)
   if(props.tweleveHours) {
    setScroll(merRef.current, 0)
   }
   
    inputRef.current.value = ''
    setMode('time')
    setHours()
    setMins()
    setSecs()
    setMeridiem()
    props.onTimeChanged('')
  }

  const setNow = () => {
    const d = new Date()
    const hh = d.getHours()
    const m = d.getMinutes()
    const s = d.getSeconds()
    if(props.tweleveHours) {
      setMeridiem(hh>=12 ? 'PM' : 'AM' )
      setScroll(merRef.current, hr>=12 ? 28 : 0)
      const hr =  hh >= 12 ? hh - 12 : hh
      setHours(hr === 0 ? '12' : ('00' + hr.toString()).substr(-2,2))
      setScroll(hourRef.current, hr* 28)
    } else {
      setHours(hh.toString())
    }
    setScroll(minRef.current, m * 28)
    setScroll(secRef.current, s * 28 )
    setMins(('00' + m).substr(-2,2))
    setSecs(('00' + s).substr(-2,2))
    setActive(false)
  }

  return (
    <FilterContainer>
      <>
      <IconWrapper>
        <TimeToggle mode={mode} onClearClick={handleClearClick} /> 
      </IconWrapper>
      <SmallTitle visibility={inputFocused ? 'visible' : 'hidden'}>
        { props.label }
      </SmallTitle>
      <Input
        disabled={props.disabled}
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={props.placeHolder}
      />
      <DropDownWrapper ref={ref} visible={active} animationDuration={100}>
        <DropDownOptions>
          <OptionsContainer>
            <DropDownList ref ={hourRef}>
              {hourItems.map(option => (
                <ListItem backgroundColor={option === hours ? 'rgba(133, 211, 255, .3)' : '#fff'}
                  onClick={(e) => { handleHourSelection(e, option) }} 
                  key={`_hr_${option}`}>
                  <Option>
                    <OptionLabel> {option} </OptionLabel>
                  </Option>
                </ListItem>
              ))}
              </DropDownList>
            <DropDownList ref={minRef}>
             {sixtyItems.map(option=> (
              <ListItem backgroundColor={option === mins ? 'rgba(133, 211, 255, .3)' : '#fff'}
                onClick={(e) => { handleMinSelection(e, option) }} 
                key={`_mi_${option}`}>
                <Option>
                  <OptionLabel> {option} </OptionLabel>
                </Option>
              </ListItem>
            ))}
          </DropDownList>
          <DropDownList ref={secRef}>
             {sixtyItems.map(option => (
              <ListItem backgroundColor={option === secs ? 'rgba(133, 211, 255, .3)' : '#fff'}
                onClick={(e) => { handleSecSelection(e, option) }} 
                key={`_se_${option}`}>
                <Option>
                  <OptionLabel> {option} </OptionLabel>
                </Option>
              </ListItem>
            ))}
          </DropDownList>
          { props.tweleveHours && <DropDownList ref={merRef}>
              {['AM', 'PM'].map(option => (
                <ListItem backgroundColor={option === meridiem ? 'rgba(133, 211, 255, .3)' : '#fff'}
                  onClick={(e) => { handleMeridiemSelection(e, option) }} 
                  key={option}>
                  <Option>
                    <OptionLabel> {option} </OptionLabel>
                  </Option>
                </ListItem>
              ))}
          </DropDownList>}
        </OptionsContainer>
        </DropDownOptions>
        <Now onClick={setNow}>Now</Now>
      </DropDownWrapper>
      </>
    </FilterContainer>
  )
}

export default FilterInput