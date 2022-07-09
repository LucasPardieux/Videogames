import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    allGames: [],
    gameSearched: [],
    game:{},
    allGenres: [],
    loading: false,
    search:"",
}

export const gameSlice = createSlice({
    name: "videogames",
    initialState,
    reducers:{
        setAllGames: function(state, action){
            state.allGames = action.payload;
        },
        setGame: function(state, action){
            state.game = action.payload
        },
        setAllGenres: function(state, action){
            state.allGenres = action.payload
        },
        setLoading: function(state, action){
            state.loading = action.payload
        },
        setSearch: function(state, action){
            state.search = action.payload
        },
        gameSearched: function(state, action){
            state.gameSearched = action.payload
        },
    }
})

export const {setAllGames, setAllGenres, setGame, setLoading, setSearch, gameSearched} = gameSlice.actions;

export default gameSlice.reducer;

export const getAllGames = () => async (dispatch) =>{

    try {
        dispatch(setLoading(true));
        const games = await axios.get("http://localhost:3001/videogames");
            dispatch(setAllGames(games.data));
            dispatch(setLoading(false));
    } catch (error) {
        alert("Error al requerir los games")
    }
}

export const getSearch = (input) => (dispatch) =>{
    dispatch(setSearch(input))
    return axios.get(`http://localhost:3001/videogames?name=${input}`)
    .then((response) => response.data)
    .then((data) =>{
        dispatch(gameSearched(data))
    })
    .catch((err)=>console.log(err))
}

export const putSearchedGames = () => (dispatch) =>{
    dispatch(setSearch(""))
    return dispatch(gameSearched([]))
}

export const getAllGenres = () => (dispatch) => {

    return axios.get(`http://localhost:3001/genres`)
        .then((response) => response.data)
        .then((data) => {
            console.log(data)
            dispatch(setAllGenres(data))
        })
        .catch((error) => console.log(error))
}