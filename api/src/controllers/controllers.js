const {default:axios} = require("axios");
require("dotenv").config()
const {API_KEY} = process.env;
const {conn, Videogame, Genre} = require("../db.js");


module.exports = {
    getGames: async function(id){
        let rpta;
        let arrayConcat = [];

        try {
            const info = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
            const infoDB = await Videogame.findAll();
            rpta = info.data.results;
            arrayConcat = rpta.concat(infoDB);
            arrayConcat = arrayConcat.map((g)=>{
                let newObj = {
                    id: g.id,
                    name: g.name,
                    released: g.released,
                    image: g.background_image,
                    rating: g.rating,
                    platforms: g.platforms,
                    genres: g.genres,
                }
                return newObj
            })
            if(id !== undefined){
                let gameById = arrayConcat.filter(g => g.id == id)
                return gameById
            }else{
                return arrayConcat;
            }
        } catch (error) {
            throw new Error(error);
        }
    },

    getGameByName: async function(name){

        try {
            console.log(name)
            const info = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
            const infoDB = await Videogame.findAll({
                where:{
                    name:name
                }
            });
            rpta = info.data.results;
            arrayConcat = rpta.concat(infoDB);
            let arrayAux = arrayConcat.map((g, i)=>{
                if(i < 15){
                    let newObj = {
                        name: g.name,
                        released: g.released,
                        image: g.background_image,
                        rating: g.rating,
                        platforms: g.platforms,
                        genres: g.genres,
                    }
                    return newObj
                }
            })

            return arrayAux.filter(g => g);
        } catch (error) {
            throw new Error(error);
        }
    },

    getGenres: async function(){
        let arrayAux = [];
        let rpta;

        try {
            rpta = await this.getGames();
            for(let x in rpta){
                if(rpta[x].genres !== undefined){
                    var genreAux = rpta[x].genres;
                }
                for(let y in genreAux){
                    arrayAux.push(genreAux[y].name)
                }
            }
        let finalGenres = [...new Set(arrayAux)];
        return finalGenres;

        } catch (error) {
            return error;
        }
    },

    fillDB: async function(id){
        const genres = await Genre.findAll();
        let genresDB = await Genre.findAll();
        if(genres.length !==0){
            return genres;
        }else {
            let ApiGenres = await this.getGenres();
            if(genresDB.length===0){
                for(let x in ApiGenres){
                    await Genre.create({
                        name:ApiGenres[x]
                    })
                }
            }
            genresDB = await Genre.findAll();
            return genresDB; 
        }
    },
}