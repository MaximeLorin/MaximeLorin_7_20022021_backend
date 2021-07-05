const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.signup = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    if (!hash) {
      return res.status(404).json({ error: "Mot de passe vide !" });
    }

    const user = new User({ userName: req.body.userName, password: hash });
    if (!user) {
      return res.status(404).json({ error: "Il n'y a rien a envoyer" });
    }
    await user.save();
    res.status(201).json({ message: "Utilisateur créé !" });
  } catch (err) {
    res.status(500).json({ error: "Impossible de s'enregistrer !" });
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé !" });
    }

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Mot de passe non valide !" });
    }
    res.status(200).json({
      userId: user._id,
      token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
        expiresIn: "24h",
      }),
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
