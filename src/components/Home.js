import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import AnimeList from './Animes';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate, useParams } from 'react-router';
import Pagination from 'react-bootstrap/Pagination';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';

import {GrNext,GrPrevious} from 'react-icons/gr'


const Home = (props) => {
    const [animes,setAnimes] = useState()
    const [error,setError] = useState()
    const [currentPage,setCurrentPage] = useState(1)
    const [nextPageAvailable,setNextPageAvailable] = useState(true)
    const [totalPages,setTotalPages] = useState(1)
    let {id,name} = useParams()
    let navigate=useNavigate()
    const [show, setShow] = useState(false);

    const getAnimeList= async(url)=>{
        if(props.value==='search' || props.value==='nsfw'){
            url=url+"&&page="+id
        }
        else if(props.value==='home'){
            if(id){
            url=url+"&page="+id}
        }
        else if(id){
            url=url+"?page="+id
        }
        console.log(url)
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
        if(props.value==='nsfw' && !sessionStorage.getItem("18+")){
            setShow(true)
        }
        else{
        getAnimeList(props.url)
        }
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

    const filterAnime=(value)=>{
        if(!sessionStorage.getItem("18+")){
            sessionStorage.setItem("18+",value)
        }
        
        setShow(false)
        if(sessionStorage.getItem("18+")){
            getAnimeList(props.url)
        }
        else{
            navigate(-1)
        }

    }

    const goToAnime=(value)=>{
        navigate(`/anime/${value}`)
    }


    
    return ( 
        <>
         {/* <Container fluid="md" style={{paddingTop:"10px"}}> */}
    
            
        {show ? <Alert show={show} variant="danger">
        <Alert.Heading>My Alert</Alert.Heading>
        <p>
          The page you are about to see contain 18+ content, <b>are you 18 years older</b>,
          <br/>
          please proceed with caution.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => filterAnime(true)} variant="outline-danger" >
            Yes, proceed
          </Button>{''}
          <Button onClick={() => filterAnime(false)} variant="outline-danger">
            No, close
          </Button>
        </div>
      </Alert>:null}


            {(error || animes) ? error ? <p>{error}</p> : animes.length>0 ? null:<p>No Content Available</p> :<Spinner className="spinner-class"animation="grow" role="status">
                <span className="visually-hidden">Loading...</span>
                </Spinner>}
            {animes && <>
                    {(id || name) ? null :
                    <Carousel data-bs-theme="dark" prevIcon={<GrPrevious className="courousal-icons"/>} nextIcon={<GrNext className="courousal-icons"/>}>
                        <Carousel.Item key={animes[0].mal_id} onClick={()=>goToAnime(animes[0].mal_id)} className="corousal-style">
                            <img
                            className="d-block w-100 corousal-style"
                            src={animes[0].images.jpg.large_image_url}
                            alt={animes[0].title_english}
                            width="800px"
                            height="400px"
                            />
                            <Carousel.Caption className="gradient-style">
                            <h5>{animes[0].title_english ? animes[0].title_english : animes[0].title}</h5>
                            <p>{animes[0].synopsis.slice(0,100)}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item key={animes[1].mal_id} onClick={()=>goToAnime(animes[1].mal_id)} className="corousal-style">
                            <img
                            className="d-block w-100 corousal-style"
                            src={animes[1].images.jpg.large_image_url}
                            alt={animes[1].title_english}
                            width="800px"
                            height="400px"
                            />
                            <Carousel.Caption className="gradient-style">
                            <h5>{animes[1].title_english ? animes[1].title_english : animes[1].title}</h5>
                            <p>{animes[1].synopsis.slice(0,100)}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item key={animes[2].mal_id} onClick={()=>goToAnime(animes[2].mal_id)} className="corousal-style">
                            <img
                            className="d-block w-100 corousal-style"
                            src={animes[2].images.jpg.large_image_url}
                            alt={animes[2].title_english}
                            width="800px"
                            height="400px"
                            />
                            <Carousel.Caption className="gradient-style">
                            <h5>{animes[2].title_english ? animes[2].title_english : animes[2].title}</h5>
                            <p>
                            {animes[2].synopsis.slice(0,100)}
                            </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        </Carousel>}
                        <br/>
                        <div style={{padding:"10px"}}>
                <AnimeList animes={animes}/>
                </div>
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
                </>}
                {/*  </Container> */}
        </>
        
     );
}
 
export default Home;