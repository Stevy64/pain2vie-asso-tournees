import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTournee from "./components/add-tournee.component";
import TourneesList from "./components/tournees-list.component";

function App() {
  return (
    <div className="corpus">
      <nav className="navbar navbar-expand fixed-top navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          <span className="logo">Pain2Vie</span>
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tournees"} className="nav-link">
              <span className="menu">Liste</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/ajouter"} className="nav-link">
              <span className="menu">Nouveau</span>
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-4 lead">
        <span className="pain2vie-title">
          <h2>Association Pain2Vie Le Mans</h2>
        </span>
        <Switch>
          <Route exact path={["/", "/tournees"]} component={TourneesList} />
          <Route exact path="/ajouter" component={AddTournee} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
