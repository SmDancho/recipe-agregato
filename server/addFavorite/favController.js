const Card = require("../models/card");
const User = require("../models/user");

async function addFavoriteRecipe(req, res) {
  try {
    const { label, img, cusType, category, link } = req.body;

    const card = new Card({ label, img, cusType, category, link });

    const isAdded = await Card.findOne({ label });

    if (isAdded) {
      await card.delete();
      return res.json({ message: "already added" });
    }

    await card.save();
    await User.findByIdAndUpdate(req.userId, {
      $push: { favorites: card },
    });

    return await res.json({ message: "Saved!" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e });
  }
}

async function removeFavoriteRecipe(req, res) {
  try {


    const card = await Card.findOne(req.params._id);

    await card.deleteOne();

    await User.findByIdAndUpdate(req.userId, {
      $pull: { favorites: card._id },
    });

    return await res.json({ message: "Removed!" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e });
  }
}

async function getFavorites(req, res) {
  try {
    const user = await User.findById(req.userId);
    const list = await Promise.all(
      user.favorites.map((element) => {
        return Card.findById(element._id);
      })
    );
    return res.json({ list });
  } catch (e) {
    return console.log(e);
  }
}

module.exports = { addFavoriteRecipe, getFavorites, removeFavoriteRecipe };
