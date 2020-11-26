import React from "react";
import { Route, Switch } from "react-router-dom";
import Game from "./game";
import Login from "./Login";

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/play/:id" exact component={Game} />
        <Route path="/login" component={Login} />
      </Switch>
    </>
  );
};

export default App;
