import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router';
import Image from 'react-bootstrap/Image';
import ReactPlayer from 'react-player/lazy';
import Table from 'react-bootstrap/Table';
import Rating from 'react-rating';
import Card from 'react-bootstrap/Card';
import {AiFillStar,AiOutlineStar} from "react-icons/ai";
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

const Animecard = (props) => {
    let {id} = useParams();
    const [animeDetails,setAnimeDetails] = useState()
    const [error,setError] = useState()
    const [Characters,setCharacters] = useState()
    const [searchCharacter,setSearchCharacter] = useState('')
    const navigate =useNavigate()

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
                setAnimeDetails(json.data)
                setError()}
        }   
        
    }
    const getCharacterList = async(url)=>{
        const response = await fetch(url)
        console.log(response.status)
        if(response.status !="200"){
            setError(response.statusText)
        }
        else{
            const json = await response.json();
            if(json.data){
                console.log(json.data.length)
                setCharacters(json.data)
                setError()}
        }   
    }
    useEffect(()=>{
        getAnimeList(props.url+id)
        getCharacterList(props.url+id+"/characters")
    },[props.url])

   const getCharacterDetails=(id)=>{
    navigate(`/character/${id}`)
    }


    return ( 
    <>
    {(error || animeDetails) ? error ? <p>{error}</p> : animeDetails ? null:<p>No Content Available</p> :<Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                </Spinner>}
    
        
        {animeDetails &&
    //   <Container fluid="xl" style={{paddingTop:"10px", backgroundImage:`url(${animeDetails.images.webp.large_image_url})`}} className="animeDetailCard">
    <Container fluid="xl" style={{paddingTop:"10px"}} className="animeDetailCard">
      <Row className="animeDetailsRow">
        <Col xs="auto" sm={3}>
        <Image src={animeDetails.images.jpg.image_url} rounded />
        <br/>
        <a href={`/anime/${id}/pictures/`}>view pictures</a>
        </Col>
        <Col xs="auto" sm={9}>
        {animeDetails.title_english ? <Row className="rowclass">
            <Col sm={2}>Name:</Col>
            <Col sm={10}>{animeDetails.title_english}</Col>
            </Row>: null}
            {animeDetails.synopsis ? <Row className="rowclass">
            <Col sm={2}>Description:</Col>
            <Col sm={10}>{animeDetails.synopsis}</Col>
            </Row> : null}
            {animeDetails.duration ? <Row className="rowclass">
            <Col sm={2} >Duration:</Col>
            <Col sm={10}>{animeDetails.duration}</Col>
            </Row> : null}
            {animeDetails.rating ? <Row className="rowclass">
            <Col sm={2} >Rating:</Col>
            <Col sm={10}>{animeDetails.rating}</Col>
            </Row>: null}
            {animeDetails.score ? <Row className="rowclass">
            <Col sm={2} >Score:</Col>
            <Col sm={10}>
                <Rating className="rating-stars" readonly quiet={true} emptySymbol={<AiOutlineStar />} fullSymbol={<AiFillStar />} start={0} stop={5} initialRating={animeDetails.score %5} /></Col>
            </Row>:null}
            <Row className="rowclass">
            <Col sm={2} >Genres:</Col>
            <Col sm={10}>
                {(animeDetails.genres).map(genre =>{
                    return(
                        <>
                        <Button variant="outline-primary" disabled>{genre.name}</Button>{' '}
                        </>
                    )
                })}
            </Col>
            </Row>
            {animeDetails.status ? <Row className="rowclass">
            <Col sm={2} >Status:</Col>
            <Col sm={10}>{animeDetails.status}</Col>
            </Row>: null}
            {animeDetails.season ? <Row className="rowclass">
            <Col sm={2} >When:</Col>
            <Col sm={10}>{animeDetails.season}-{animeDetails.year}</Col>
            </Row>: null}
            {animeDetails.type ? <Row className="rowclass">
            <Col sm={2} >Type:</Col>
            <Col sm={10}>{animeDetails.type}</Col>
            </Row>: null}
            {animeDetails.source ? <Row className="rowclass">
            <Col sm={2} >Source:</Col>
            <Col sm={10}>{animeDetails.source}</Col>
            </Row>: null}
            <Row className="rowclass">
            <Col sm={2} >Trailer:</Col>
            <Col sm={10}>
            {animeDetails.trailer.embed_url ? <ReactPlayer controls url={animeDetails.trailer.embed_url}/> : <p>No Trailer</p>}
            </Col>
            </Row>
            
        </Col>
      </Row>
      
      <br/>
      <div>
      <Form.Group as={Col} >
            <Form.Label className="justify-content-center d-flex"><h2>Characters</h2></Form.Label>
            <Form.Control
            placeholder="Search Character"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={searchCharacter} onChange={(e)=>setSearchCharacter(e.target.value)}
            />
            <br/>
            </Form.Group>
      </div>
      <Row xs={2} md={6} className="g-4">
      {(error || Characters) ? error ? <p>{error}</p> : Characters.length  ? null:<p>No characters Available</p> :<Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                </Spinner>}
      {Characters && Characters !==0  ? Characters.filter(character=>{
          return searchCharacter.toLowerCase() === '' ? character : character.character.name.toLowerCase().includes(searchCharacter) 
      }
      ).map(character => (
        <Col key={character.character.mal_id}  >
          <Card className="animeCard" onClick={()=>getCharacterDetails(character.character.mal_id)} >
            <Card.Img variant="top" src={character.character.images.jpg.image_url} />
            <Card.Body>
              <Card.Title>{character.character.name}</Card.Title>

                  <Card.Text >{character.role}</Card.Text> </Card.Body>
          </Card>
        </Col>
      )):null}
    </Row>
    </Container>
    }
    </>
     );
}
 
export default Animecard;