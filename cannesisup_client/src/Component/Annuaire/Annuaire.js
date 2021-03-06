import React, { Component } from "react";

import { Form, Row, Container, Col } from "react-bootstrap";

import "../../../src/mainStyle.css";
import "../SignUp/style.css";
import "./Annuaire.css";

import CarteAnnuaire from "./CarteAnnuaire/CarteAnnuaire";
import Footer from "../Footer/Footer";
import { affichageNavbar } from "../affichageNavbar";
import url from "../../url.json";

// import InfiniteScroll from "react-infinite-scroll-component";

class Annuaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BDDdata: [],
      recherche: " ",
      dataFlattened: [],
    };
  }

  componentDidMount() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    };

    fetch(url["url-server"] + "/visiteurs", options)
      .then((response) => response.json())
      .then(
        (data) => {
          const flattenedData = data.map((element) => {
            return Object.assign(
              {},
              ...(function _flatten(o) {
                return [].concat(
                  ...Object.keys(o).map((k) =>
                    typeof o[k] === "object" ? _flatten(o[k]) : { [k]: o[k] }
                  )
                );
              })(element)
            );
          });

          this.setState({ BDDdata: data, dataFlattened: flattenedData });
        },

        (error) => {
          console.log(error);
        }
      );
  }

  handleSearchBar = async (e) => {
    await this.setState({ recherche: e.target.value });
  };

  affichageAnnuaire = () => {
    var adherentFiltred;

    if (this.state.recherche === " ") {
      return this.state.BDDdata.map((element, index) => (
        <Col key={index} className="styleCol" xs={12} sm={6} md={4}>
          <CarteAnnuaire
            id={element._id}
            nomDeSociete={element.nomDeSociete}
            descriptionExhaustive={element.descriptionExhaustive}
            secteurDactivite={element.secteurDactivite}
            prenom={element.dirigeant.prenom}
            nom={element.dirigeant.nom}
            photoProfil={
              url["url-server"] + "/uploads/" + element.dirigeant.photoPortrait
            }
            couv={url["url-server"] + "/uploads/" + element.photoCouverture}
            logo={url["url-server"] + "/uploads/" + element.logo}
          />
        </Col>
      ));
    } else {
      adherentFiltred = this.state.dataFlattened.filter((membre) => {
        for (let property in membre) {
          if (
            String(membre[property]).match(
              new RegExp(this.state.recherche, "i")
            ) &&
            property !== "_id"
          ) {
            return true;
          }
        }
        return false;
      });

      return adherentFiltred.map((element, index) => (
        <Col key={index} className="styleCol" xs={12} sm={6} md={4}>
          <CarteAnnuaire
            id={element._id}
            nomDeSociete={element.nomDeSociete}
            descriptionExhaustive={element.descriptionExhaustive}
            secteurDactivite={element.secteurDactivite}
            prenom={element.prenom}
            nom={element.nom}
            photoProfil={
              url["url-server"] + "/uploads/" + element.photoPortrait
            }
            couv={url["url-server"] + "/uploads/" + element.photoCouverture}
            logo={url["url-server"] + "/uploads/" + element.logo}
          />
        </Col>
      ));
    }
  };

  render() {
    return (
      <div>
        {affichageNavbar()}
        <div className="header">
          <h1>ANNUAIRE DES MEMBRES</h1>
        </div>
        <div className="barreRecherche">
          <Form.Control
            placeholder="Recherchez : un membre, une activité, un mot clé..."
            className="react-search-field"
            onChange={this.handleSearchBar}
            name="recherche"
          />
        </div>
        <div>
          <p className="nombreMembres">
            {" "}
            Nombre de membres : {this.state.BDDdata.length}
          </p>
        </div>
        <div className="annuaireContainer">
          <Container>
            <Row>{this.affichageAnnuaire()}</Row>
          </Container>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default Annuaire;
