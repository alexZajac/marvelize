import React from 'react'
import PropTypes from 'prop-types'
import "./Footer.css"
import arrow from "../../assets/images/arrow.png"

const Footer = props => {
    const { page, setPage } = props;
    const bottom_message = `Page ${page+1} - Data provided by Marvel. © 2019 MARVEL`;
    const resetPage = direction => {
        if((direction === -1 && page > 0) || direction === 1)
            setPage(page + direction)
    };

    return (
        <div className="footer">
            
            <div onClick={() => resetPage(-1)} style={{cursor: page > 0 ? "pointer" : "none"}} className="previous-wrapper">
                {page > 0 
                &&
                <div className="arrow-wrapper">
                    <img src={arrow} alt="arrow navigation" className="arrow inversed" />  
                    <div className="spacer"></div>
                </div>
                }
            </div>
            <div className="credentials-wrapper">
                <p className="copyrights">{bottom_message}</p>
            </div>
            <div onClick={() => resetPage(1)} className="next-wrapper">
                
                <div className="arrow-wrapper">
                    <div className="spacer"></div>
                    <img src={arrow} alt="arrow navigation" className="arrow" />
                </div>
            </div>
        </div>
    )
}

Footer.defaultProps = {
    page: 0,
    setPage: () => {},
}

Footer.propTypes = {
    page: PropTypes.number,
    setPage: PropTypes.func.isRequired
}

export default Footer;

