import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Homepage from './components/pages/homepage/Homepage';
import TimePicker from './components/pages/time-picker-page/TimePickerPage';
import GetMili from './components/pages/get-mili/GetMili';
import BabylonPage from './components/pages/babylon-page/BabylonPage';
import MidiPage from './components/pages/midi-page/MidiPage';
import Error from "./components/pages/error/Error";

const App = () => {
  return (
    <HashRouter>
      <Switch>
          <Route path="/" component={Homepage} exact/>
          <Route path="/timepicker" component={TimePicker} exact/>
          <Route path="/get-mili" component={GetMili} exact/>
          <Route path="/babylon-page" component={BabylonPage} exact/>
          <Route path="/midi-page" component={MidiPage} exact/>
          <Route render={(props) => <Error {...props}/>}/>
      </Switch>
    </HashRouter>
  );
}

export default App;
