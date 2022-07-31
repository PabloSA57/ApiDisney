const {Router} = require ("express");


const router = Router();

const { getMovies,
        getDetailsMovie,
        createMovie,
        editMovie,
        deleteMovie
        } = require ("../controllers/movie.controller");
const routerPrivate = require("../middleware/routerPrivate");

router.get("/", routerPrivate, getMovies);
router.post("/create", routerPrivate, createMovie);
router.put("/edit/:id", routerPrivate, editMovie);
router.delete("/delete", routerPrivate, deleteMovie);
//movie and character
router.get("/details/:id", routerPrivate, getDetailsMovie)



module.exports = router;