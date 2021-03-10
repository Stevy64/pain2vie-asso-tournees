import React, { Component } from "react";
import TourneeDataService from "../services/tournee.service";
import Moment from 'moment';
import 'moment/locale/fr';

export default class Tournee extends Component {
  constructor(props) {
    super(props);
    this.onChangeVille = this.onChangeVille.bind(this);
    this.onChangePoids = this.onChangePoids.bind(this);
    this.onChangeTotal = this.onChangeTotal.bind(this);
    this.onChangeRemarques = this.onChangeRemarques.bind(this);
    this.onChangeBenevoles = this.onChangeBenevoles.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTournee = this.updateTournee.bind(this);
    this.deleteTournee = this.deleteTournee.bind(this);

    this.state = {
      currentTournee: {
        id: null,
        date: Moment().format("MM/YYYY -- [le] DD dddd [à] HH:mm"),
        ville: "",
        poids: "",
        total: 0,
        benevoles: "",
        remarques: "",
        published: false,
      },
      message: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { tournee } = nextProps;
    if (prevState.currentTournee.id !== tournee.id) {
      return {
        currentTournee: tournee,
        message: ""
      };
    }

    return prevState.currentTournee;
  }

  componentDidMount() {
    this.setState({
      currentTournee: this.props.tournee,
    });
  }

  onChangeVille(e) {
    const ville = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTournee: {
          ...prevState.currentTournee,
          ville: ville,
        },
      };
    });
  }

  onChangePoids(e) {
    const poids = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTournee: {
          ...prevState.currentTournee,
          poids: poids,
        },
      };
    });
  }

  onChangeTotal(e) {
    const total = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTournee: {
          ...prevState.currentTournee,
          total: total,
        },
      };
    });
  }

  onChangeRemarques(e) {
    const remarques = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTournee: {
          ...prevState.currentTournee,
          remarques: remarques,
        },
      };
    });
  }

  onChangeBenevoles(e) {
    const benevoles = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTournee: {
          ...prevState.currentTournee,
          benevoles: benevoles,
        },
      };
    });
  }

  updatePublished(status) {
    TourneeDataService.update(this.state.currentTournee.id, {
      published: status,
    })
      .then(() => {
        this.setState((prevState) => ({
          currentTournee: {
            ...prevState.currentTournee,
            published: status,
          },
          message: "Veuillez enrégistrer vos modifications",
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateTournee() {
    const data = {
      ville: this.state.currentTournee.ville,
      poids: this.state.currentTournee.poids,
      total: this.state.currentTournee.total,
      remarques: this.state.currentTournee.remarques,
      benevoles: this.state.currentTournee.benevoles,
      date: this.state.currentTournee.date,
    };

    TourneeDataService.update(this.state.currentTournee.id, data)
      .then(() => {
        this.setState({
          message: "Veuillez enregistrer vos modifications",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteTournee() {
    TourneeDataService.remove(this.state.currentTournee.id)
      .then(() => {
        this.props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentTournee } = this.state;

    return (
      <div>
        <h4>Tournée du {currentTournee.date}</h4>
        {currentTournee ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="ville">Ville</label>
                <input
                  type="text"
                  className="form-control"
                  id="ville"
                  value={currentTournee.ville}
                  onChange={this.onChangeVille}
                />
              </div>
              <div className="form-group">
                <label htmlFor="poids">Poids</label>
                <input
                  type="text"
                  className="form-control"
                  id="poids"
                  value={currentTournee.poids}
                  onChange={this.onChangePoids}
                />
              </div>
              <div className="form-group">
                <label htmlFor="total">Total</label>
                <input
                  type="text"
                  className="form-control"
                  id="total"
                  value={currentTournee.total}
                  onChange={this.onChangeTotal}
                />
              </div>
              <div className="form-group">
                <label htmlFor="benevoles">Benevoles</label>
                <input
                  type="text"
                  className="form-control"
                  id="benevoles"
                  value={currentTournee.benevoles}
                  onChange={this.onChangeBenevoles}
                />
              </div>
              <div className="form-group">
                <label htmlFor="remarques">Autres infos</label>
                <input
                  type="text"
                  className="form-control"
                  id="remarques"
                  value={currentTournee.remarques}
                  onChange={this.onChangeRemarques}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status :</strong>
                </label>
                {currentTournee.published ? " En attente.." : " Enregistré"}
              </div>
            </form>

            <div className="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
              <div className="btn-group" role="group" aria-label="First group">
                <button type="button" className="btn btn-secondary btn-danger">o</button>
                <button className="btn btn-outline-danger" onClick={this.deleteTournee}>
                  Supprimer
                </button>
              </div>

              <div className="btn-group" role="group" aria-label="Second group">
              <button type="button" className="btn btn-secondary btn-success">o</button>
                {currentTournee.published ? (
                <button
                  className="btn btn-outline-success"
                  onClick={() => this.updatePublished(false)}>
                  Enregistrer
                </button>
              ) : (
                <button
                  className="btn btn-outline-primary"
                  onClick={() => this.updatePublished(true) & this.updateTournee()}>
                  Modifier
                </button>
              )}
              </div>

            </div>
            <p>{currentTournee.published ? this.state.message : " Enregistré !"}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Veuillez sélectionner un élément de la liste...</p>
          </div>
        )}
      </div>
    );
  }
}