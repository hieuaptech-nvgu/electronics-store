import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  footerAbout,
  footerContact,
  footerBank,
  footerPolicy} from "./footer.mock";
import "./Footer.css";
import { MapPin } from "lucide-react";
import { Phone } from "lucide-react";
import { Mail } from "lucide-react";

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
              <h3 className="footer-title">{footerContact.title}</h3>
              <p className="footer-description d-flex gap-2">
                <MapPin size={20} /> {footerContact.addresses[0]} <br />{" "}
                {footerContact.addresses[1]}
              </p>
              <p className="footer-description d-flex align-items-center gap-2">
                <Phone size={20} />
                {footerContact.phones[0]} - {footerContact.phones[1]}
              </p>
              <p className="footer-description d-flex align-items-center gap-2">
                <Mail size={20} /> {footerContact.email}
              </p>
            </div>
          </Col>

          {/* Bank */}
          <Col>
            <div className="footer-section footer-bank">
              <h3 className="footer-title">{footerBank.title}</h3>
              <ul className="d-flex flex-column gap-3 p-0 list-unstyled">
                {footerBank.links.map((l) => (
                  <li className="footer-description">{l.text}</li>
                ))}
              </ul>
            </div>
          </Col>

          {/* Policy */}
          <Col>
            <div className="footer-section footer-policy">
              <h3 className="footer-title">{footerPolicy.title}</h3>
              <ul className="d-flex flex-column gap-3 p-0 list-unstyled">
                {footerPolicy.links.map((l) => (
                  <li className="footer-description">{l.text}</li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FooterMain;
