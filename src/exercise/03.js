// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {Switch} from '../switch'

// 🐨 create your ToggleContext context here
const ToggleContext = React.createContext()

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return (
    <ToggleContext.Provider value={{on, toggle}}>
      {children}
    </ToggleContext.Provider>
  )
}

const useToggleContext = () => {
  const context = React.useContext(ToggleContext)
  if (!context) {
    throw Error(
      "Please use the Toggle parent to render the 'ToggleOn' and 'ToggleOff' and 'ToggleButton' components",
    )
  }
  return context
}

function ToggleOn({children}) {
  const {on} = useToggleContext()
  return on ? children : null
}

function ToggleOff({children}) {
  const {on} = useToggleContext()
  return on ? null : children
}

function ToggleButton({...props}) {
  const {on, toggle} = useToggleContext()
  return <Switch on={on} onClick={toggle} {...props} />
}

const App = () => (
  <Toggle>
    <ToggleOn> The Switch is on </ToggleOn>
    <ToggleOff> The Switch is off </ToggleOff>
    <ToggleButton />
  </Toggle>
)

//Failing..
//const App = () => <ToggleButton />

export default App

/*
eslint
  no-unused-vars: "off",
*/
