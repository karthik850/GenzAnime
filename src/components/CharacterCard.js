import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router';
import Image from 'react-bootstrap/Image';
import ReactPlayer from 'react-player/lazy';
import Table from 'react-bootstrap/Table';
import Rating from 'react-rating';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';

const CharacterCard = (props) => {
    let {id} = useParams();
    const [characterDetails,setcharacterDetails] = useState()
    const [error,setError] = useState()

    const getAnimeList= async(url)=>{
        const response = await fetch(url)
        console.log(response.status)
        if(response.status !="200"){
            setError(response.statusText)
        }
        else{
            const json = await response.json();
            if(json.data){
                console.log(json.data)
                setcharacterDetails(json.data)
                setError()}
        }   
        
    }

    useEffect(()=>{
        getAnimeList(props.url+id+"/full")
    },[props.url])


    return ( 

    <Container fluid="xl" style={{paddingTop:"10px"}}>
        {(error || characterDetails) ? error ? <p>{error}</p> : characterDetails ? null:<p>No Content Available</p> :<Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                </Spinner>}
        {characterDetails &&
      <>
      <Row >
        <Col xs="auto" sm={3}>
        <Image src={characterDetails.images.jpg.image_url} rounded />
        </Col>
        <Col xs="auto" sm={9}>
        {characterDetails.name ? <Row className="rowclass">
            <Col sm={2}>Name:</Col>
            <Col sm={10}>{characterDetails.name}</Col>
            </Row>: null}
            {characterDetails.about ? <Row className="rowclass">
            <Col sm={2}>About:</Col>
            <Col sm={10}>{characterDetails.about}</Col>
            </Row>: null}
            <Row className="rowclass">
            <Col sm={2}>Pictures:</Col>
            <Col sm={10}><a href={`/character/${characterDetails.mal_id}/pictures`}>view pictures</a></Col>
            </Row>
            <Row className="rowclass">
            <Col sm={2} >animes:</Col>
            <Col sm={10}>
                
            <ListGroup>
      
    {(characterDetails.anime).map(anime =>{
                return (
                    <ListGroup.Item>
                        <Col xs={6} md={10}>
                        
                        <a href={`/anime/${anime.anime.mal_id}`} >
                        <Image src={anime.anime.images.jpg.small_image_url} roundedCircle height="50px" width="50px" style={{paddingRight:"5px"}}/>
                        {anime.anime.title}
                    </a>
                        </Col>
                    </ListGroup.Item>
                )
            })}
            </ListGroup></Col>
            </Row>
        </Col>
      </Row>
      </>}
    </Container>
     );
}
 
export default CharacterCard;