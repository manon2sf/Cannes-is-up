const Adherent = require("../models/adherent");

const updateAdherent = (req, res, next) => {
  console.log(req.files.couv[0]);

  if (req.files.couv) {
    Adherent.findOneAndUpdate(
      { _id: req.params.id },
      { photoCouverture: req.files.couv[0].filename }
    )
      .then(() => res.status(200).json({ message: "Objet modifié !" }))
      .catch((error) => res.status(400).json({ error }));
  } else if (req.files.logo) {
    Adherent.findOneAndUpdate(
      { _id: req.params.id },
      { logo: req.files.logo[0].filename }
    )
      .then(() => res.status(200).json({ message: "Objet modifié !" }))
      .catch((error) => res.status(400).json({ error }));
  } else if (req.files.dossier) {
    Adherent.findOneAndUpdate(
      { _id: req.params.id },
      { dossierPresentation: req.files.dossier[0].filename }
    )
      .then(() => res.status(200).json({ message: "Objet modifié !" }))
      .catch((error) => res.status(400).json({ error }));
  } else if (req.files.photoPortrait) {
    Adherent.findOneAndUpdate(
      { _id: req.params.id },
      { photoPortrait: req.files.photoPortrait[0].filename }
    )
      .then(() => res.status(200).json({ message: "Objet modifié !" }))
      .catch((error) => res.status(400).json({ error }));
  }
};

module.exports = updateAdherent;