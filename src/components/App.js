import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Game from "./game";
import Login from "./Login";

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/login" />} />
        <Route path="/play/:id" exact component={Game} />
        <Route path="/login" component={Login} />
      </Switch>
    </>
  );
};

export default App;
