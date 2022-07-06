import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import style from './Nav.module.css'
import logo from '../../images/gamerCaveLogo.png'
import { getSearch } from '../../redux/reducer/reducer';


export class Nav extends Component {

    constructor(props){
        super(props);
        this.searchHandler = this.searchHandler.bind(this);
    }

    searchHandler(){
        const input = document.getElementById("inputSearch").value;
        this.props.getSearch(input)
    }


    render() {
        return (
            <div className={`${style.navContainer}`}>
                <div className={`${style.navLogo}`}>
                    <img src={logo} alt="gamerCave Logo" />
                </div>
                <nav>
                    <ul className={`${style.navList}`}>
                        <li>
                            <Link to='/home' className={`${style.navLink}`}>Home</Link>
                        </li>
                        <li>
                            <Link to='/home' className={`${style.navLink}`}>Create game</Link>
                        </li>
                        <li>
                            <Link to='/home' className={`${style.navLink}`}>Rankings</Link>
                        </li>
                        <li>
                            <Link to='/home' className={`${style.navLink}`}>About</Link>
                        </li>
                        <li className={`${style.navSearch}`}>
                            <input id='inputSearch' placeholder="Search..." type="text" />
                            <button onClick={this.searchHandler}>🔍</button>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export const mapStateToProps = (state) => {
  return {
    search: state.videogames.search
  }
};

export const mapDispatchToProps = (dispatch) => {
  return {
    getSearch: (input) => dispatch(getSearch(input))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav)