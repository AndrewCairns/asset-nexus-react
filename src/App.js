import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./app/home";
import GridView from "./app/grid";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <header>
          <div className="c-contain">
            <h1>
              {" "}
              <Link to="/"> Base Pattern Library </Link>
            </h1>
            <h3>
              A comprehensive list of styles which can be used as a base to
              build new applications.
            </h3>
          </div>
        </header>
        <div className="c-contain c-vh">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/grid" component={GridView} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
