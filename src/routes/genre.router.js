const {Router} = require ("express");
const {createGenre} = require('../controllers/genre.controller')

const router = Router();
const routerPrivate = require("../middleware/routerPrivate");

router.post('/create', routerPrivate, createGenre);

module.exports = router;