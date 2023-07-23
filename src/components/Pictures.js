import React,{useEffect, useState} from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';
import {  useParams } from 'react-router';
import Spinner from 'react-bootstrap/Spinner';

const Pictures = (props) => {

    let {id} = useParams();
    const [pictures,setPictures] = useState()
    const [error,setError] = useState()

    const getPicturesList= async(url)=>{
        const response = await fetch(url)
        console.log(response.status)
        if(response.status !="200"){
            console.log("error")
            setError(response.statusText)
        }
        else{
            const json = await response.json();
            if(json.data){
                console.log("karthik")
                console.log(json.data)
                setPictures(json.data)
                setError()}
        }   
        
    }

    useEffect(()=>{
        console.log("karthik inside useEffect")
        getPicturesList(props.url+id+"/pictures")
    },[props.url])
    return ( 
        <Container fluid="md" style={{paddingTop:"10px"}}>
            {(error || pictures) ? error ? <p>{error}</p> : pictures ? null:<p>No Content Available</p> :<Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                </Spinner>}

        <Row xs={1} md={6} className="g-4">
            {pictures && pictures.map((picture,index) =>{
            return(
                <Col key={index}><Card className="animeCard">
                <Card.Img variant="top" src={picture.jpg.image_url} />
                
            </Card>
            </Col>
             )})} 
        </Row>
        </Container>
     );
}
 
export default Pictures;