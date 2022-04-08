
import React, { useContext } from 'react';
import { Context } from "../Context/Context"

function Image() {
    const { searchResult, currentIndex } = useContext(Context);
    return (
        <div className="layout innerImage">
            <img src={searchResult[currentIndex].url} height="50%" width="auto"></img>
            <h2>{searchResult[currentIndex].title}</h2>
            <h2>image Link : <a href={searchResult[currentIndex].link} style={{ color: 'white' }} target="_blank">Click Here</a></h2>
        </div>
    );
}

export default Image;
