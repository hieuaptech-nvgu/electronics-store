import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Header.css";
const HeaderBottom = () => {
  return (
    <div className="header-bottom">
      <Container>
        <Row>
          <Col md={3}>
            <div className="categories-sidebar"></div>
          </Col>
          <Col md={9}>b</Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeaderBottom;
