import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {footerAbout} from "./footer.mock";
import "./Footer.css";

const FooterMain = () => {
  return (
    <div className="footer-main">
      <Container>
        <Row>
          {/* About TTG */}
          <Col>
            <div className="footer-section footer-about">
              <h3 className="footer-title">{footerAbout.title}</h3>
              <p className="footer-description">{footerAbout.description}</p>
              <img className="footer-badge" src={footerAbout.badges} />
            </div>
          </Col>

          {/* Contact */}
          <Col>
            <div className="footer-section footer-contact">
              <h3 className="footer-title">{footerAbout.title}</h3>
            </div>
          </Col>

          {/* Bank */}
          <Col>
            <div className="footer-section footer-bank">
              <h3 className="footer-title">{footerAbout.title}</h3>
            </div>
          </Col>

          {/* Policy */}
          <Col>
            <div className="footer-section footer-policy">
              <h3 className="footer-title">{footerAbout.title}</h3>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FooterMain;
