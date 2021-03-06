import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Sentence from './Sentence'
import SpellChecker from './SpellChecker'
import ExportWidget from './ExportWidget'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/spellchecker' component={SpellChecker}/>
      <Route path='/grammar' component={Sentence}/>
      <Route path='/widget' //component={ExportWidget}
        render={(props) => <ExportWidget {...props} />}
        />
    </Switch>
  </main>
)

export default Main
