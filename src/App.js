import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Homepage from './components/pages/homepage/Homepage';
import TimePicker from './components/pages/time-picker-page/TimePickerPage';
import Error from "./components/pages/error/Error";

const App = () => {
  return (
    <HashRouter>
      <Switch>
          <Route path="/" component={Homepage} exact/>
          <Route path="/timepicker" component={TimePicker} exact/>
          <Route render={(props) => <Error {...props}/>}/>
      </Switch>
    </HashRouter>
  );
}

export default App;
