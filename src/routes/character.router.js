const {Router} = require ("express");
const { 
        getCharacters,
        createCharacter,
        editCharacter,
        deleteCharacter,
        detailsCharacter
        } = require ('../controllers/character.controller');
const routerPrivate = require("../middleware/routerPrivate");

const router = Router();

//crud
router.get("/", routerPrivate, getCharacters);
router.post("/create", routerPrivate, createCharacter);
router.put("/edit", routerPrivate, editCharacter);
router.delete("/delete/:id", routerPrivate, deleteCharacter);

router.get("/details/:id", routerPrivate, detailsCharacter);





module.exports = router;