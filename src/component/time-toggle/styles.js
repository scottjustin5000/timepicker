import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const Icon = styled.div`
  cursor: ${props => props.cursor ? props.cursor : 'default'};
  position: absolute;
  font-size: 16px;
  right: 0px;
  top: 12px;
`

export {
  Wrapper,
  Icon
}
