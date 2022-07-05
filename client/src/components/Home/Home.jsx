import React from 'react'
import {useSelector, useDispatch} from "react-redux";
import { getAllGames } from '../../redux/reducer/reducer';
import style from "./Home.module.css";
import { useState, useEffect } from 'react';


const Home = () => {

    const allGames = useSelector(state => state.videogames.allGames);
    const dispatch = useDispatch();

    const updateState = () =>{
        let res = dispatch(getAllGames());
        return res
    }

    useEffect(() => {
      if(allGames.length===0) updateState();
    }, [])
    

  return (
    <div>
        <ul>
            {
                allGames?.map((g)=> {
                    return(
                        <div>
                            <h2>{g.name}</h2>
                        </div>
                    )
                })
            }
        </ul>
    </div>
  )
}

export default Home