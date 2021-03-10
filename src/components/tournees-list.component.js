import React, { Component } from "react";
import TourneeDataService from "../services/tournee.service";

import Tournee from "./tournee.component";

export default class TourneesList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTournee = this.setActiveTournee.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      tournees: [],
      currentTournee: null,
      currentIndex: -1,
    };

    this.unsubscribe = undefined;
  }

  componentDidMount() {
    this.unsubscribe = TourneeDataService.getAll().orderBy("date", "desc").limit(15).onSnapshot(this.onDataChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onDataChange(items) {
    let tournees = [];

    items.forEach((item) => {
      let id = item.id;
      let data = item.data();
      tournees.push({
        id: id,
        ville: data.ville,
        date: data.date,
        poids: data.poids,
        total: data.total,
        benevoles: data.benevoles,
        remarques: data.remarques,
        published: data.published,
      });
    });

    this.setState({
      tournees: tournees,
    });
  }

  refreshList() {
    this.setState({
      currentTournee: null,
      currentIndex: -1,
    });
  }

  setActiveTournee(tournee, index) {
    this.setState({
      currentTournee: tournee,
      currentIndex: index,
    });
  }

  render() {
    const { tournees, currentTournee, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          {currentTournee ? (
            <Tournee
              tournee={currentTournee}
              refreshList={this.refreshList}
            />
          ) : (
            <div>
              <br />
              <p className="lead">Veuillez sélectionner un élément de la liste ...</p>
            </div>
          )}
        </div>
        <div className="col-md-6">
          <h4>Tournées</h4>

          <ul className="list-group">
            {tournees &&
              tournees.map((tournee, index) => (
                <li
                  className={ "list-group-item " + (index === currentIndex ? "active" : "") }
                  onClick={() => this.setActiveTournee(tournee, index)}
                  key={index}
                >
                  <b>{tournee.date}</b> <p>{tournee.ville}</p> <span className="total">Total : {tournee.total} Kgs</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}