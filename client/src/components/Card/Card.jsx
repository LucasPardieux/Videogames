import React from 'react'
import style from "./Card.module.css"
import { Link } from 'react-router-dom';
import { FaPlaystation, FaXbox, FaWindows, FaAndroid, FaApple, FaLinux, FaGamepad } from "react-icons/fa"
import { SiNintendo, SiWii, SiNintendogamecube, SiAtari, SiSega } from "react-icons/si"
import { TbDeviceGamepad } from "react-icons/tb"
import { AiOutlineBuild } from "react-icons/ai"
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md"
import { getFavorites, remFavorite } from '../../redux/reducer/reducer'
import { useDispatch, useSelector } from 'react-redux';



const Card = (props) => {

    const favorites = useSelector(state => state.videogames.favorites)
    const dispatch = useDispatch();

    const platformIcon = (platforms) => {
        let platformsArray = [];
        var id;
        platforms?.map((p) => {
            if(p.hasOwnProperty("platform")){id = p.platform.id}else{id = p}
            switch (id) {
                case 187:case 18: case 16: case 15: case 27: case 19: case 17: case "playstation":
                    platformsArray.push(<FaPlaystation key={id}/>)
                    break;
                case 4: case "pc":
                    platformsArray.push(<FaWindows key={id}/>)
                    break;
                case 1: case 14: case 80: case 186: case "xbox":
                    platformsArray.push(<FaXbox key={id}/>)
                    break;
                case 21: case "android":
                    platformsArray.push(<FaAndroid key={id}/>)
                    break;
                case 7: case 8: case 9: case 13: case 83: case "nintendo": case 79: case 49:
                    platformsArray.push(<SiNintendo key={id}/>)
                    break;
                case 3: case 5: case "apple": case 41:
                    platformsArray.push(<FaApple key={id}/>)
                    break;
                case 6: case "linux":
                    platformsArray.push(<FaLinux key={id}/>)
                    break;
                case 10: case 11: case "wii":
                    platformsArray.push(<SiWii key={id}/>)
                    break;
                case 105: case "gamecube":
                    platformsArray.push(<SiNintendogamecube key={id}/>)
                    break;
                case 24: case 43: case 26: case "gameBoy":
                    platformsArray.push(<TbDeviceGamepad key={id}/>)
                    break;
                case 55: case 166:
                    platformsArray.push(<AiOutlineBuild key={id}/>)
                    break;
                case 28: case 31: case 23: case 22: case 25: case 34: case 46: case 50: case "atari":
                    platformsArray.push(<SiAtari key={id}/>)
                    break;
                case 167: case "genesis":
                    platformsArray.push(<FaGamepad key={id}/>)
                    break;
                case 107: case 119: case 117: case 74: case "sega":
                    platformsArray.push(<SiSega key={id}/>)
                    break;
                default:
                    platformsArray.push(<AiOutlineBuild key={id}/>)
                    break;
            }
        })
        return platformsArray;
    }

    const addFavorite = (props) => {
        if(favorites.includes(props)){
            return dispatch(remFavorite(props));
        }else{
            return dispatch(getFavorites(props));
        }
    }

    const showFavorite = (props) => {
        const allFavorites = favorites?.map((f) => {
            if(f?.id === props.id){
                return f
            }
        })
        if(props.id==="1f8p") return;

        if(allFavorites?.filter(e=>e)[0]?.name === props.name){
            return <MdOutlineFavorite/>
        }else{
            return <MdOutlineFavoriteBorder/>
        }
    }

    const parseGenres = (genres) =>{
        const genresArr = genres?.map((g) => g.name)
        return genresArr?.join(" | ")
    }


    return (
        <div className={`${style.cardContainerBefore}`}>
            <div className={`${style.cardContainer}`}>

            <div className={`${style.cardImage}`}>
                <img src={props.image} alt="videogame" />
            </div>

            <div>
                <div className={`${style.cardInfoReq}`}>
                     <h2>{props.name}</h2>
                     <p>Rating: <span>{props.rating}</span></p>
                     <p>Genres: <span>{parseGenres(props.genres)}</span></p>
                </div>
                <div className={`${style.cardInfoNoReq}`}>
                    <span className={`${style.iconFavorite}`} onClick={(e) => {addFavorite(props)}}>
                    {showFavorite(props)}
                    </span>
                    <span>{platformIcon(props.platforms)}</span>
                    {props.id!=="1f8p"?<Link to={`/details/${props.id}`}><button className={`${style.cardDetailsButton}`}>Details</button></Link>:<span></span>}
                </div>
            </div>
        </div>
        </div>
    )
}

export default Card