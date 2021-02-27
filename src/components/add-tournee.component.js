import React, { useState } from "react";
import TourneeDataService from "../services/tournee.service";
import Moment from 'moment';
import 'moment/locale/fr';

const AddTournee = () => {
  const initialTourneeState = {
    ville: "",
    date: "--",
    poids: "",
    total: 0,
    benevoles: "",
    remarques: "",
    published: false
  };
  const [tournee, setTournee] = useState(initialTourneeState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTournee({ ...tournee, [name]: value });
  };

  const saveTournee = () => {
    var data = {
      ville: tournee.ville,
      date: Moment().format("dddd Do/MM/YY HH:mm"),
      poids: tournee.poids,
      total: tournee.total,
      benevoles: tournee.benevoles,
      remarques: tournee.remarques,
      published: false
    };

    TourneeDataService.create(data)
      .then(() => {
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTournee = () => {
    setTournee(initialTourneeState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Informations enrégistrées avec succès!</h4>
          <button className="btn btn-success" onClick={newTournee}>
            Ajouter
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="ville">Ville</label>
            <input
              type="text"
              className="form-control"
              id="ville"
              required
              value={tournee.ville}
              onChange={handleInputChange}
              name="ville"
              placeholder="Super U Mareil"
            />
          </div>

          <div className="form-group">
            <label htmlFor="poids">Poids des bacs</label>
            <input
              type="text"
              className="form-control"
              id="poids"
              required
              value={tournee.poids}
              onChange={handleInputChange}
              name="poids"
              placeholder="9.5 + 15 + 20.1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="total">Total</label>
            <input
              type="number"
              className="form-control"
              id="total"
              required
              value={tournee.total}
              onChange={handleInputChange}
              name="total"
            />
          </div>

          <div className="form-group">
            <label htmlFor="benevoles">Noms des bénévoles</label>
            <input
              type="text"
              className="form-control"
              id="benevoles"
              required
              value={tournee.benevoles}
              onChange={handleInputChange}
              name="benevoles"
            />
          </div>

          <div className="form-group">
            <label htmlFor="remarques">Autres infos</label>
            <textarea
              type="text"
              className="form-control"
              id="remarques"
              required
              value={tournee.remarques}
              onChange={handleInputChange}
              name="remarques"
              rows="3"
              placeholder="ex: 1 bac laissé à Mareil"
            ></textarea>
          </div>

          <button onClick={saveTournee} className="btn btn-success">
            Enregistrer
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTournee;