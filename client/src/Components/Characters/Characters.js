import React  from 'react'
import PropTypes from 'prop-types'
import "./Characters.css"
import SingleCharacter from "../SingleCharacter"

const Characters = props => {
    const { charactersData } = props;
    // we render the row only when data has arrived, for animation to run properly
    const dataArrived = charactersData.length > 0;

    return (
        <div className="characters">
            {dataArrived ?
                <>   
                    {charactersData.map((c, i) =>  <SingleCharacter key={c.id} character={c} />)}   
                </>
                :
                null
            }
        </div>
    )
}

Characters.defaultProps = {
    charactersData: [],
}

Characters.propTypes = {
    charactersData: PropTypes.array.isRequired,
}

export default Characters;

