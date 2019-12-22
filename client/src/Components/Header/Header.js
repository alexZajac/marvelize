import React from 'react';
import "./Header.css"
import marvel from "../../assets/images/marvel.png"
import smartrenting from "../../assets/images/smartrenting.png"

const Header = () => (
        <div className="header">
            <img alt="marvel logo" src={marvel} className="marvel-logo" />
            <div className="characters-wrapper">
                <p className="characters-text">Characters</p>
            </div>
            <img alt="smartrenting logo" src={smartrenting} className="smartrenting-logo" />
        </div>
    )

export default Header;

