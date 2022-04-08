
import React, { useContext, useEffect } from 'react';
import { Context } from "../Context/Context"
import axios from 'axios'
import { Link } from "react-router-dom";

function Layout() {
    const { searchText, setDataToContext, inputText, searchResult, setDataToContextArray, currentIndex } = useContext(Context);
    function submitSearch() {
        setDataToContext("searchText", inputText);
        if (inputText !== searchText && inputText !== "") {
            setDataToContext("searchResult", [])
        }

    }
    useEffect(() => {
        if (inputText !== "") {
            setDataToContext("searchResult", [])
        }
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=d7b13d486b797794c2bf863312c9d85f&per_page=10&format=json&nojsoncallback=1&text=${searchText}`)

            .then(res => {

                res.data.photos && res.data.photos.photo.map((result) => {
                    let photoDetails = {}
                    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=d7b13d486b797794c2bf863312c9d85f&photo_id=${result.id}&per_page=20&format=json&nojsoncallback=1`)
                        .then((res) => {
                            const large = res.data.sizes.size.filter(res => res.label == "Large Square")
                            photoDetails.url = large[0].source
                            photoDetails.title = result.title
                            photoDetails.link = large[0].url
                            setDataToContextArray("searchResult", photoDetails)

                        })
                })

            })
    }, [searchText])
    return (
        <div className="layout">
            <h1>Gallery.io</h1>
            <h3>Looking for Gallery Images? Search for your favourite collection.</h3>
            <div className="search">
                <input type="text" onChange={(e) => setDataToContext("inputText", e.target.value)} />
                <button type="submit" onClick={() => submitSearch()}>Search</button>
            </div>
            <div className="imageSection">

                {searchResult && searchResult.length > 0 ? searchResult.map((result, index) =>

                    <>
                        <Link to="/image">
                            <img className="image" key={index} src={result.url} onClick={() => setDataToContext("currentIndex", index)} heigth="250" width="250" />
                        </Link>
                    </>

                ) :
                    <div id="container">
                        <div id="square" className="shimmer image"></div>
                        <div id="square" className="shimmer image"></div>
                        <div id="square" className="shimmer image"></div>
                        <div id="square" className="shimmer image"></div>

                    </div>
                }
            </div>
        </div>
    );
}

export default Layout;
