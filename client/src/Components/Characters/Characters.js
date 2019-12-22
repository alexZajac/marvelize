import React  from 'react'
import PropTypes from 'prop-types'
import "./Characters.css"
import SingleCharacter from "../SingleCharacter"

const Characters = props => {
    const { charactersData } = props;
    // we render the row only when data has arrived, for animation to run properly
    const dataArrived = charactersData.length > 0;

    const selectFirstRow = (i, c, cData) => (
        i < cData.length/2 ? 
            <SingleCharacter key={c.id} character={c} />
            :
            null
    );
    const selectSecondRow = (i, c, cData) => (
        i >= cData.length/2 ? 
            <SingleCharacter key={c.id} character={c} />
            :
            null
    )

    return (
        <div className={`characters ${dataArrived ? "" : "disappear"}`}>
            {dataArrived ?
                <>
                    <div className="row-characters first-part-c appear">
                        {charactersData.map((c, i) => selectFirstRow(i, c, charactersData))}  
                    </div>
                    <div className="row-characters appear">
                        {charactersData.map((c, i) => selectSecondRow(i, c, charactersData))}   
                    </div>
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

