const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  addFavoriteRecipe,
  getFavorites,
  removeFavoriteRecipe,
} = require("../addFavorite/favController");

router.get("/favorite", authMiddleware, (req, res) => {
  return getFavorites(req, res);
});

router.post("/addToFavortite", authMiddleware, (req, res) => {
  addFavoriteRecipe(req, res);
});
router.post('/removeTofavorite', authMiddleware, (req, res) => {
  removeFavoriteRecipe(req, res)
})

module.exports = router;
