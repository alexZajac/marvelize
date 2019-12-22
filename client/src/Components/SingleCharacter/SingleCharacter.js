import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { COLORS, DEFAULT_CHARACTER_IMAGE } from "../../Constants"
import "./SingleCharacter.css"

const SingleCharacter = props => {
    const { character: c } = props;
    const [src, setSrc] = useState(c.thumbnail);
    const handleImageError = e => {
        e.target.onerror = null;
        setSrc(DEFAULT_CHARACTER_IMAGE);
    }
    return (
        <div className="card-container">
            <div className="wrapper-image">
                <img alt="character thumbnail" onError={e => handleImageError(e)} src={src} className="character-image"/>
            </div>

            <div className="wrapper-content" style={{background: `linear-gradient(${COLORS.end_gradient}, ${c.color})`}}>
                <p className="character-desc">{c.description}</p>
                <div className="absolute-container">
                    <div className="marvel-bg" style={{background: `${COLORS.marvel_red}`}}>
                            <p className="character-name">{c.name.toUpperCase()}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

SingleCharacter.propTypes = {
    character: PropTypes.object.isRequired,
}

SingleCharacter.defaultProps = {
    character: {}
}

export default SingleCharacter

