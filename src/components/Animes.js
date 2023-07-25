import React from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router";

const AnimeList = (props) => {
    const navigate = useNavigate();

    const animeClick=(id)=>{
        
        navigate(`/anime/${id}`)
    }
    return ( 
        <Row xs={2} md={5} className="g-4">
            {Object.values(props.animes).map((anime,idx) =>{
            return(
                <Col key={anime.mal_id}><Card className="animeCard" onClick={()=>animeClick(anime.mal_id)}>
                <Card.Img variant="top" src={anime.images.jpg.image_url} />
                <Card.Body className="MycardBody">
                <Card.Title>{anime.title_english ? anime.title_english : anime.title}</Card.Title>
                </Card.Body>
                
            </Card>
            </Col>
             )})} 
        </Row>
     );
}
 
export default AnimeList;