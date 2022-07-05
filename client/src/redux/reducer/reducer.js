import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    allGames: [],
    game:{},
    allGenres: [],
    loading: false,
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
        }
    }
})

export const {setAllGames, setAllGenres, setGame, setLoading} = gameSlice.actions;

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