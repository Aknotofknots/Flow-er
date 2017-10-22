import React from 'react'
import {
    Container,
    Row,
    Col
} from 'reactstrap';
import Copyright from 'react-icons/lib/md/copyright';


const Footer = (props) => {

    return (

             <Container fluid className="bg-dark text-white lead py-4">
                 <Row>
                     <Col className="text-center">
                          <footer className=""><Copyright/> Copyright <span className="text-danger">Flow:er</span> 2017</footer>
                     </Col>
                 </Row>
             </Container>
    )
};

export default Footer;