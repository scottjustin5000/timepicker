import styled from 'styled-components'

const FilterContainer = styled.div`
  margin: 8px;
`
const Input = styled.input`
 type: text;
 width: 100%;
 padding-left: 16px;
 padding: 0.4rem;
 margin-bottom: 8px;
 border:none;
 outline: none;
 background: none;
 border-bottom-color: #000;
 border-bottom-style: solid;
 border-bottom-width: 1px;
 :focus::-webkit-input-placeholder {
  transition: text-indent 0.2s 0.2s ease; 
  text-indent: -100%;
  opacity: 1;
}
`
const SmallTitle = styled.div`
  display:flex;
  font-weight; 600;
  font-size: 8px;
  visibility: ${props => props.visibility};
  ${props => !props.required} {
    &:after {
      content: " *";
      color: #ff0000;
    }
}
`

const DropDownWrapper = styled.div`
  position: absolute;
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  margin-top: ${props => props.visible ? `-${props.top}px` : null};
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  z-index: 100;
  cursor: default;
  transition: ${props => props.animationDuration}ms;
  opacity: ${props => props.visible ? 1 : 0};
  transform: ${props => props.visible ? 'scale(1)' : 'scale(0.9)'};
` 

const DropDownOptions = styled.div`
  display: flex;
  z-index: 100;
  max-height: 150px;
  overflow: hidden;
`

const OptionsContainer = styled.div`
  display: flex;
  flex: auto;

`
const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  background: #ffffff;
  box-sizing: border-box;
  overflow: auto;
  flex: 1 0 auto;
  text-align: left;
  line-height: 28px;
  width:56px;
  color: ${props => props.color || '#000'};
  font-size: 1.1rem;
  font-weight: 500;
  &:after {
    display: block;
    height:150px;
    content:"";
  }
`
const ListItem = styled.li`
  cursor: pointer;
  background-color: ${props => props.backgroundColor};
  list-style: none;
  padding: 0 0 0 14px;
  font-size: 12px;
  &:hover {
    background-color:#efefef;
  }
`
const Option = styled.div`
  display: flex; 
  align-items: center;
`
const OptionLabel = styled.div`
  padding-left: 8px;
`

const Now = styled.div`
  border-top: 1px solid #cecece;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 800;
  text-align: left;
  padding: 8px;
  color: rgba(133, 211, 255, .8);
  `
const IconWrapper = styled.div`
  position: relative;
  width: 100%;
`

export {
  Option,
  IconWrapper,
  DropDownWrapper,
  OptionsContainer,
  Now,
  FilterContainer,
  Input,
  SmallTitle,
  DropDownList,
  DropDownOptions,
  ListItem,
  OptionLabel
}
