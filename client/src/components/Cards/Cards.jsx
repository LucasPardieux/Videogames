import React from 'react'
import Card from '../Card/Card';
import style from "./Cards.module.css"
import {AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai"


export const Cards = (props) => {

    const eachGame = props.allGames?.map((g) => {
        return (
            <div className={`${style.eachGame}`}>
                <li key={g.id}>
                    <Card
                        id={g.id}
                        name={g.name}
                        image={g.image}
                        genres={g.genres}
                        rating={g.rating}
                        platforms={g.platforms}
                    />
                </li>
            </div>
        )
    })


  return (
    <div className={`${style.contenedor}`}>
            <div className={`${style.prevNext}`}>
                <button onClick={props.prevHandler}><AiOutlineArrowLeft/></button>
                <p>/</p>
                <button onClick={props.nextHandler}><AiOutlineArrowRight/></button>
            </div>
            <ul className={`${style.ulGame}`}>
                {props.allGames.length!=0?eachGame:"No games found"}
            </ul>
        </div>
  )
}
