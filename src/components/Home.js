import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import AnimeList from './Animes';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate, useParams } from 'react-router';
import Pagination from 'react-bootstrap/Pagination';

const Home = (props) => {
    const [animes,setAnimes] = useState()
    const [error,setError] = useState()
    const [currentPage,setCurrentPage] = useState(1)
    const [nextPageAvailable,setNextPageAvailable] = useState(true)
    const [totalPages,setTotalPages] = useState(1)
    let {id,name} = useParams()
    let navigate=useNavigate()

    const getAnimeList= async(url)=>{
        if(props.value==='search'){
            url=url+"&&page="+id
        }
        else if(id){
            url=url+"?page="+id
        }
        const response = await fetch(url)
        console.log(response.status)
        if(response.status !="200"){
            setError(response.statusText)
        }
        else{
            const json = await response.json();
            if(json.data){
                setAnimes(json.data)
            setCurrentPage(json.pagination.current_page)
            setNextPageAvailable(json.pagination.has_next_page)
            setTotalPages(json.pagination.last_visible_page)
            setError()
        }

        }   
        
    }
    useEffect(()=>{
        getAnimeList(props.url)
    },[props.url,id])

    const pageChange=(value)=>{
        let slug="/page/"+value
        if(props.value !=='home' && props.value !=='search'){
            slug="/"+props.value+"/page/"+value
        }
        else if(props.value ==='search'){
            slug=`/search/${name}/page/${value}`
        }
        navigate(slug)
        window.scrollTo({top: 0, behavior: 'smooth'});
    }


    
    return ( 
        <Container fluid="md" style={{paddingTop:"10px"}}>
            {(error || animes) ? error ? <p>{error}</p> : animes.length>0 ? null:<p>No Content Available</p> :<Spinner className="spinner-class"animation="grow" role="status">
                <span className="visually-hidden">Loading...</span>
                </Spinner>}
            {animes && <div>
                <AnimeList animes={animes}/>
                <Pagination className="justify-content-center">
                    <Pagination.First onClick={()=>pageChange(1)}/>
                    {currentPage <3 ? 
                    <Pagination.Prev disabled onClick={()=>pageChange(currentPage-1)}/>:
                    <Pagination>
                        <Pagination.Prev  onClick={()=>pageChange(1)}/>
                        <Pagination.Ellipsis />
                    </Pagination>}
                    {currentPage!==1 ? <Pagination.Item onClick={()=>pageChange(currentPage-1)}>{currentPage-1}</Pagination.Item>:null}
                    <Pagination.Item active>{currentPage}</Pagination.Item>
                    {currentPage<totalPages-1 ? <Pagination.Item onClick={()=>pageChange(currentPage+1)}>{currentPage+1}</Pagination.Item>:null}
                    

                    {currentPage<totalPages-1 ? <Pagination.Ellipsis />:null}
                    
                    {nextPageAvailable ? <Pagination><Pagination.Item onClick={()=>pageChange(totalPages)}>{totalPages}</Pagination.Item><Pagination.Next  onClick={()=>pageChange(currentPage+1)}/></Pagination>:<Pagination.Next  disabled/>}
                    <Pagination.Last onClick={()=>pageChange(totalPages)}/>
                </Pagination>
                </div>}
        
        </Container>
     );
}
 
export default Home;