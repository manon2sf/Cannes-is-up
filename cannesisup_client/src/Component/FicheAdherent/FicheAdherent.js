/* imports */
import React, { Component } from "react";
import { Card, ListGroup } from "react-bootstrap";

import NavbarVisiteurs from "../Navbar/NavbarVisiteurs/NavbarVisiteurs";
import Footer from "../Footer/Footer";
import url from "../../url.json";

import "../../../src/mainStyle.css";
import "./style.css";

/* Component */
class FicheAdherent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataAdherent: { coordonnes: {}, dirigeant: {}, reseauSociaux: {} },
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    const body = {
      id: this.props.match.params.id,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(body),
    };

    /* Requête */
    fetch(url["url-server"] + "/visiteurs/adherent", options)
      .then((response) => response.json())
      .then(
        (data) => {
          this.setState({ dataAdherent: data });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  checkPicture = () => {
    if (this.state.dataAdherent.dirigeant.photoPortrait === "photoportrait") {
      return <Card.Img src="/assets/img/avatar.png" />;
    } else {
      return (
        <Card.Img
          src={
            url["url-server"] +
            "/uploads/" +
            this.state.dataAdherent.dirigeant.photoPortrait
          }
        />
      );
    }
  };

  checkCouv = () => {
    if (this.state.dataAdherent.photoCouverture === "photocouv") {
      return (
        <Card.Img
          className="couverture"
          variant="top"
          src="/assets/img/fond_equipe.png"
          alt="couverture"
        />
      );
    } else {
      return (
        <Card.Img
          className="couverture"
          variant="top"
          src={
            url["url-server"] +
            "/uploads/" +
            this.state.dataAdherent.photoCouverture
          }
        />
      );
    }
  };

  render() {
    return (
      <div className="maindiv">
        <NavbarVisiteurs />
        <div className="ficheadherent">
          {/* Fiche gauche */}
          <Card className="fichegauche">
            {/* Image couverture */}
            {this.checkCouv()}

            {/* Logo + liens PDF */}
            <Card.Body className="top-link">
              <div className="logo-cont">
                <Card.Img
                  className="card-img"
                  src={
                    "http://localhost:8080/uploads/" +
                    this.state.dataAdherent.logo
                  }
                ></Card.Img>
              </div>

              <div className="download-container">
                <p className="download-txt">
                  Télécharger la brochure de la société
                </p>
                <a
                  href={
                    "http://localhost:8080/uploads/" +
                    this.state.dataAdherent.dossierPresentation
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="download-img"
                    src="/assets/img/download-solid.svg"
                    alt="logo"
                  ></img>
                </a>
              </div>
            </Card.Body>

            {/* Description entreprise */}
            <Card.Body className="blockCard">
              <ListGroup variant="flush">
                {/* Nom + texte */}
                <ListGroup.Item className="description">
                  <h4> {this.state.dataAdherent.nomDeSociete} </h4>
                  <p className="paragraphfiche">
                    {" "}
                    {this.state.dataAdherent.descriptionExhaustive}
                  </p>
                </ListGroup.Item>

                {/* Secteur d'activité */}
                <ListGroup.Item className="description">
                  <h3> Secteur d'activité </h3>
                  <p style={{ fontWeight: 900 }}>
                    {" "}
                    {this.state.dataAdherent.secteurDactivite}{" "}
                  </p>
                </ListGroup.Item>

                {/* Coordonnées */}
                <ListGroup.Item className="description">
                  <h3> Coordonnées </h3>
                  <p>
                    <span style={{ fontWeight: 700 }}>Adresse: </span>
                    {this.state.dataAdherent.coordonnes.adresse
                      ? this.state.dataAdherent.coordonnes.adresse + ", "
                      : " "}
                    {this.state.dataAdherent.coordonnes.complementDadresse
                      ? this.state.dataAdherent.coordonnes.complementDadresse +
                        ", "
                      : " "}
                    {this.state.dataAdherent.coordonnes.codePostal
                      ? this.state.dataAdherent.coordonnes.codePostal + " "
                      : " "}
                    {this.state.dataAdherent.coordonnes.ville
                      ? this.state.dataAdherent.coordonnes.ville + " "
                      : " "}
                  </p>
                  <p>
                    <span style={{ fontWeight: 700 }}>Téléphone: </span>
                    {this.state.dataAdherent.coordonnes.telephone
                      ? this.state.dataAdherent.coordonnes.telephone
                      : " "}
                  </p>
                  <p>
                    <span style={{ fontWeight: 700 }}>Email: </span>
                    {this.state.dataAdherent.coordonnes.mailSociete
                      ? this.state.dataAdherent.coordonnes.mailSociete
                      : " "}
                  </p>
                  <p>
                    {" "}
                    <span style={{ fontWeight: 700 }}>Site web:</span>
                    <a
                      target="_blank"
                      href="https://cannesisup.com/contact.php"
                      rel="noopener noreferrer"
                    >
                      {this.state.dataAdherent.coordonnes.siteWeb
                        ? this.state.dataAdherent.coordonnes.siteWeb
                        : " "}
                    </a>
                  </p>
                </ListGroup.Item>

                {/* Réseaux sociaux */}
                <ListGroup.Item className="description">
                  <h3> Réseaux sociaux </h3>
                  {this.state.dataAdherent.reseauSociaux.facebook !== "" && (
                    <a
                      href={this.state.dataAdherent.reseauSociaux.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="facebook"
                    >
                      <img
                        src="/assets/img/facebook.svg"
                        alt="facebook"
                        className="reseaux-logo "
                      />
                    </a>
                  )}

                  {this.state.dataAdherent.reseauSociaux.instagram !== "" && (
                    <a
                      href={this.state.dataAdherent.reseauSociaux.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="/assets/img/instagram.svg"
                        alt="instagram"
                        className="reseaux-logo ml-20"
                      />
                    </a>
                  )}
                  {this.state.dataAdherent.reseauSociaux.linkedin !== "" && (
                    <a
                      href={this.state.dataAdherent.reseauSociaux.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="/assets/img/linkedin.svg"
                        alt="linkedin"
                        className="reseaux-logo ml-20"
                      />
                    </a>
                  )}
                  {this.state.dataAdherent.reseauSociaux.twitter !== "" && (
                    <a
                      href={this.state.dataAdherent.reseauSociaux.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="/assets/img/twitter.svg"
                        alt="twitter"
                        className="reseaux-logo ml-20"
                      />
                    </a>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

          {/* Fiche droite */}
          <Card className="fichedroite">
            {/* Photo de profil */}
            {this.checkPicture()}
            {/* Identité dirigeant */}
            <Card.Body className="dirigeant">
              <h3 style={{ padding: 0 }}> Dirigeant </h3>
              <p style={{ fontWeight: 900, margin: 0 }}>
                {" "}
                {this.state.dataAdherent.dirigeant.prenom}{" "}
                {this.state.dataAdherent.dirigeant.nom}{" "}
              </p>
              <p>{this.state.dataAdherent.dirigeant.fonction}</p>
              <h3> Parole de membre </h3>
              <p> {this.state.dataAdherent.dirigeant.paroleDeMembre}</p>
            </Card.Body>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }
}

export default FicheAdherent;
