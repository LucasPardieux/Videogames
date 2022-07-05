const {default: axios} = require("axios");
const { Router } = require ("express");
const controller = require("../controllers/controllers.js")
const router = Router();
const {API_KEY} = process.env;

router.get("/", async (req,res,next) => {
    try {
        const genre = await controller.fillDB();
        res.status(200).send(genre)
    } catch (error) {
        res.sendStatus(404)
    }
})



module.exports = router;