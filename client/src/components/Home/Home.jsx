import React from 'react'
import {useSelector, useDispatch} from "react-redux";
import { getAllGames, getSearch, putSearchedGames, getAllGenres, setAllGames } from '../../redux/reducer/reducer';
import style from "./Home.module.css";
import { useState, useEffect } from 'react';
import { Cards } from '../Cards/Cards';
import headerVideo from "../../images/header_l77cMXfi.mp4"
import {AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai"


const Home = () => {

    const allGames = useSelector(state => state.videogames.allGames);
    const search = useSelector(state => state.videogames.search);
    const gameSearched = useSelector(state => state.videogames.gameSearched);
    const allGenres = useSelector(state => state.videogames.allGenres)
    const dispatch = useDispatch();

    const updateState = () =>{
        let res = dispatch(getAllGames());
        let res2 = dispatch(getAllGenres())
        return res
    }

    useEffect(() => {
      if(allGames.length===0) updateState();
    }, [])

    const ITEMS_PER_PAGE = 15;

    var [dataFromApi, satDataFromApi] = useState(allGames)
    var [DataSearchedFromApi, setDataSearchedFromApi] = useState(gameSearched)
    var [items, setItems] = useState([...allGames]?.splice(0, ITEMS_PER_PAGE))
    var [currentPage, setCurrentPage] = useState(0);

    let pageCount = dataFromApi.length / ITEMS_PER_PAGE;

    if (items.length === 0) {
        for (let index = 1; index < 100; index++) {
          if (allGames.length !== 0) {
            setItems([...allGames].splice(0, ITEMS_PER_PAGE))
            satDataFromApi(allGames)
          }
        }
      }
    const filteredGames = (props) => {
        if(props!==undefined){
            return props.slice(currentPage, currentPage + ITEMS_PER_PAGE)
        }

        if(search !== ""){
            return gameSearched.slice(currentPage, currentPage + ITEMS_PER_PAGE)
          }
        return items.slice(currentPage, currentPage + ITEMS_PER_PAGE)

      }

    const nextHandler = () =>{
        if(search!=="")return;
        const totalData = dataFromApi.length;
        const nextPage = currentPage +1;
        const firstIndex = nextPage * ITEMS_PER_PAGE;
        if(firstIndex >= totalData) return;
        setItems([...dataFromApi]?.splice(firstIndex, ITEMS_PER_PAGE))
        setCurrentPage(nextPage)
    }

    const prevHandler = () =>{    
        if(search!=="")return;    
        const prevPage = currentPage - 1;
        if (prevPage < 0) return;
        const firstIndex = prevPage * ITEMS_PER_PAGE;
        pageCount = pageCount - 1;
        setItems([...dataFromApi]?.splice(firstIndex, ITEMS_PER_PAGE))
        setCurrentPage(prevPage)
    }

    const genreSelect = (e) => {
        const genre = e.target.value;
        setCurrentPage(0);
        
        if (genre === "null") {
            setItems(allGames)
          return satDataFromApi(allGames)
        }

        const filteredGames = allGames.filter((r) => {
          if (r.hasOwnProperty("genres")) {
            return r.genres?.map(g=>g.name).includes(genre)
          }
        })
        setItems(filteredGames)
        satDataFromApi(filteredGames)
      }

    const alphaOrder = (e) => {
        const value = e.target.value;

        setCurrentPage(0);

        if(search!==""){
          satDataFromApi(gameSearched);
        }
        
    
        if (value === "up") {
          const neatArray = [...dataFromApi].sort((prev, next) => {
            if (prev.name > next.name) {
              return 1;
            }
            if (prev.name < next.name) {
              return -1;
            }
            return 0;
          })
          setItems(neatArray);
          satDataFromApi(neatArray)
        }
        if (value === "down") {
            console.log(value)
          const neatArray = [...dataFromApi].sort((prev, next) => {
            if (prev.name > next.name) {
              return -1;
            }
            if (prev.name < next.name) {
              return 1;
            }
            return 0;
          })
          setItems(neatArray);
          satDataFromApi(neatArray)
          
        }
      }

      const ratingOrder = (e) => {
        let value = e.target.value;   
        
        setCurrentPage(0);

        if (value === "down") {
          if(search!==""){
            const neatArray = [...DataSearchedFromApi].sort((next, prev) => {
    
              if (prev.rating < next.rating) {
                return 1;
              } else {
                return -1;
              }
              return 0
      
            })
            setItems(neatArray);
            setDataSearchedFromApi(neatArray);
          return;
          }else{
            const neatArray = [...dataFromApi].sort((next, prev) => {
    
              if (prev.rating < next.rating) {
                return 1;
              } else {
                return -1;
              }
              return 0
      
            })
            setItems(neatArray);
            satDataFromApi(neatArray)
            return;
          }
          
        }
    
        if (value === "up") {
          if(search!==""){
            const neatArray = [...DataSearchedFromApi].sort((next, prev) => {
    
              if (prev.rating > next.rating) {
                return 1;
              } else {
                return -1;
              }
              return 0
      
            })
            setItems(neatArray);
            setDataSearchedFromApi(neatArray)
            return;
          }else{
            const neatArray = [...dataFromApi].sort((next, prev) => {
    
              if (prev.rating > next.rating) {
                return 1;
              } else {
                return -1;
              }
              return 0
      
            })
            setItems(neatArray);
            satDataFromApi(neatArray)
            return;
          }
          
        }
      }
    

  return (
    <div className={`${style.homeAll}`}>
        <div className={`${style.homeVideo}`}>
        <video loop muted autoPlay="autoplay" src={`${headerVideo}`} poster="https://images4.alphacoders.com/903/thumb-1920-903637.jpg"/>
        </div>
        <div className={`${style.filterContainer}`}>
            <ul>
                <li><button onClick={(e) => alphaOrder(e)} value={"up"}>▲name▲</button></li>
                <li><button onClick={(e) => alphaOrder(e)} value={"down"}>▼name▼</button></li>
                <li><button onClick={prevHandler}><AiOutlineArrowLeft/></button></li>
                <li><select defaultValue={"null"} name="genres" onChange={e=>genreSelect(e)}>
                    <option value="null">All</option>
                    {allGenres?.map((genre) => {
                        return <option key={genre.id}>{genre.name}</option>
                    })}
                    </select></li>
                    <li><button onClick={nextHandler}><AiOutlineArrowRight/></button></li>
                <li><button onClick={(e) => ratingOrder(e)} value={"up"}>▲rating▲</button></li>
                <li><button onClick={(e) => ratingOrder(e)} value={"down"}>▼rating▼</button></li>
            </ul>
        </div>
    <div className={`${style.homeContainer}`}>
        <ul>
            {
                search===""?<Cards allGames={filteredGames()} pageCount={pageCount} currentPage={currentPage}/>:<Cards allGames={filteredGames()} pageCount={pageCount} currentPage={currentPage}/>
            }
        </ul>
    </div>
    </div>
  )
}

export default Home