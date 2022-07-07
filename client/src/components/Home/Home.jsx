import React from 'react'
import {useSelector, useDispatch} from "react-redux";
import { getAllGames } from '../../redux/reducer/reducer';
import style from "./Home.module.css";
import { useState, useEffect } from 'react';
import { Cards } from '../Cards/Cards';


const Home = () => {

    const allGames = useSelector(state => state.videogames.allGames);
    const search = useSelector(state => state.videogames.search);
    const gameSearched = useSelector(state => state.videogames.gameSearched);
    const dispatch = useDispatch();

    const updateState = () =>{
        let res = dispatch(getAllGames());
        return res
    }

    useEffect(() => {
      if(allGames.length===0) updateState();
    }, [])

    const nextHandler = () =>{
        
    }

    const prevHandler = () =>{
        
    }
    

  return (
    <div className={`${style.homeContainer}`}>
        <ul>
            {
                search===""?<Cards allGames={allGames} nextHandler={nextHandler} prevHandler={prevHandler}/>:gameSearched?.map((g)=>{
                    return(
                        <div key={g.id}>
                            <h2>{g.name}</h2><h3>{g.id}</h3>
                        </div>)
                })
            }
        </ul>
    </div>
  )
}

export default Home