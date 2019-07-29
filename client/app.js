import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {withRouter, Route, Switch} from 'react-router-dom'

const App = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes />
    </div>
  )
}

export default App
