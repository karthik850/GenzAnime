import React from 'react'
import { useParams } from 'react-router';
import Home from './Home';

const SearchAnime = (props) => {
    const {name,id}=useParams()
    
    return ( 
        <Home url={props.url+name} value='search'/>
     );
}
 
export default SearchAnime;