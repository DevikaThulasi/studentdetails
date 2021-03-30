import React from "react"
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
const Header = () => {

   return (

      <header>

         <nav>
            <Container className="HeaderComp" fluid >

               <Row lg={12}>
                  <Col lg={7}> STUDENT REGISTRATION</Col>
                  <Col lg={2}><Link to="/tablecomponent" className="navLink" style={{ textDecoration: "none" }}>View Details</Link></Col>
                  <Col lg={2}><Link to="/" className="navLink" style={{ textDecoration: "none" }}>Registration</Link></Col>
               </Row>
            </Container>
         </nav>

      </header>
   )
}
export default Header;