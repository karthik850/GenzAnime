import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { propTypes } from 'react-bootstrap/esm/Image';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useHref, useNavigate } from 'react-router';



const MyNavbar = (props) => {
    const [search,setSearch]=useState()
    const history=useNavigate()

    const onSearchClick=(e)=>{
        e.preventDefault()
        // console.log(e.target.search.value)
        // props.searchBar(search)
        history(`/search/${search}/page/1`)
        setSearch(null)

        
    }

    return ( 
        <Navbar expand="lg" className="bg-dark">
      <Container fluid>
        <Navbar.Brand href="/" className="myNavbar">GenzAnime</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className="myNavbar"/>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            
            <Nav.Link href="/popular/page/1" className="myNavbar">Popular</Nav.Link>
            <Nav.Link href="/season/page/1" className="myNavbar">
              Season
            </Nav.Link>
            <Nav.Link href="/upcomming/page/1" className="myNavbar">Upcomming</Nav.Link>
            {/* <Nav.Link href="/nsfw/page/1" className="myNavbar">NSFW</Nav.Link> */}
          </Nav>
          <Form onSubmit={onSearchClick} className="d-flex myNavbar">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={search} onChange={(e)=>setSearch(e.target.value)}
            />
            {/* <input type="text" className="me-2" aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)}/> */}
            <Button type="submit" variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
     );
}
 
export default MyNavbar;