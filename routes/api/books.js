const router = require("express").Router();
const booksController = require("../../controllers/bookController");

// Matches with "/api/books" GET AND POST ALL IN ONE LINE
router.route("/").get(booksController.findAll).post(booksController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(booksController.findById)
  .delete(booksController.remove);

module.exports = router;
