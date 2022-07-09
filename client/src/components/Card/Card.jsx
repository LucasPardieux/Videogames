import React from 'react'
import style from "./Card.module.css"
import { FaPlaystation, FaXbox, FaWindows, FaAndroid, FaApple, FaLinux, FaGamepad } from "react-icons/fa"
import { MdComputer } from "react-icons/md"
import { SiNintendo, SiWii, SiNintendogamecube, SiAtari, SiSega } from "react-icons/si"
import { TbDeviceGamepad } from "react-icons/tb"
import { AiOutlineBuild } from "react-icons/ai"



const Card = (props) => {

    const platformIcon = (platforms) => {
        let platformsArray = [];
        const ids = platforms?.map((p) => {
            switch (p.platform.id) {
                case 187:case 18: case 16: case 15: case 27: case 19: case 17:
                    platformsArray.push(<FaPlaystation/>)
                    break;
                case 4:
                    platformsArray.push(<FaWindows/>)
                    break;
                case 1: case 14: case 80: case 186:
                    platformsArray.push(<FaXbox/>)
                    break;
                case 21:
                    platformsArray.push(<FaAndroid/>)
                    break;
                case 7: case 8: case 9: case 13: case 83:
                    platformsArray.push(<SiNintendo/>)
                    break;
                case 3: case 5:
                    platformsArray.push(<FaApple/>)
                    break;
                case 6:
                    platformsArray.push(<FaLinux/>)
                    break;
                case 10: case 11:
                    platformsArray.push(<SiWii/>)
                    break;
                case 105:
                    platformsArray.push(<SiNintendogamecube/>)
                    break;
                case 24: case 43: case 26:
                    platformsArray.push(<TbDeviceGamepad/>)
                    break;
                case 79: case 49:
                    platformsArray.push(<SiNintendo/>)
                    break;
                case 55:
                    platformsArray.push(<AiOutlineBuild/>)
                    break;
                case 41:
                    platformsArray.push(<FaApple/>)
                    break;
                case 166:
                    platformsArray.push(<AiOutlineBuild/>)
                    break;
                case 28: case 31: case 23: case 22: case 25: case 34: case 46: case 50:
                    platformsArray.push(<SiAtari/>)
                    break;
                case 167:
                    platformsArray.push(<FaGamepad/>)
                    break;
                case 107: case 119: case 117: case 74:
                    platformsArray.push(<SiSega/>)
                    break;
                case 41:
                    platformsArray.push(<FaApple/>)
                    break;
                default:
                    platformsArray.push(<AiOutlineBuild/>)
                    break;
            }
        })
        return platformsArray;
    }



    return (
        <div className={`${style.cardContainerBefore}`}>
            <div className={`${style.cardContainer}`}>

            <div className={`${style.cardImage}`}>
                <img src={props.image} alt="videogame Image" />
            </div>

            <div>
                <div className={`${style.cardInfoReq}`}>
                     <h2>{props.name}</h2>
                     <p>Rating: {props.rating}</p>
                     <p>Genres: {props.genres?.map((g) => {return <span key={g.id}>{g.name + " / "}</span>})}</p>
                </div>
                <div className={`${style.cardInfoNoReq}`}>
                    <span>{platformIcon(props.platforms)}</span>
                    <button className={`${style.cardDetailsButton}`}>Details</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Card