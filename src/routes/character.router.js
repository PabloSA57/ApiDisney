const {Router} = require ("express");


const router = Router();

//crud
router.get("/");
router.post("/create");
router.put("/update");
router.delete("/delete");

router.get("/details/:id");

//query
router.get("/")
router.get("/")
router.get("/")



module.exports = router;