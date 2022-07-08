const {default: axios} = require("axios");
const { Router } = require ("express");
const controller = require("../controllers/controllers.js")
const router = Router();
const {API_KEY} = process.env;
const {Videogame} = require("../db.js");


router.get("/", async (req,res,next) => {
    const {name} = req.query;
    let videogame
    try {
        if(name === undefined){
            videogame = await controller.getGames();
        }else{
            videogame = await controller.getGameByName(name);
        }
        res.status(200).send(videogame);
    } catch (error) {
        res.status(400).send("Error al obtener los videojuegos")
    }
})

router.post("/", (req,res,next) =>{
    const {name, description, release, rating, genreID} = req.body;
    Videogame.create({
        name, description, release, rating,
    })
    .then(game =>{
        game.addGenre(genreID);
        res.status(201).send(game);
    })
    .catch (error=>{
            res.status(400).send({error:"Game was not created."})
        })
})
module.exports = router;