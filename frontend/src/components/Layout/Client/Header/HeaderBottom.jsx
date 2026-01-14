import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Header.css";
import CategorySidebar from "./CategorySidebar";
import { CircleStar } from "lucide-react";
import { Truck } from "lucide-react";
import { PhoneCall } from "lucide-react";
const HeaderBottom = () => {
  return (
    <div className="header-bottom">
      <Container>
        <Row className="d-flex align-items-center">
          <Col md={2}>
            <CategorySidebar />
          </Col>
          <Col md={10}>
            <div className="box-policy">
              <ul className="list-unstyled d-flex gap-3 m-0">
                <li className="box-item">
                  <CircleStar strokeWidth="1px" size="20" />
                  Chất lượng đảm bảo
                </li>
                <li className="box-item">
                  <Truck strokeWidth="1px" size="20" />
                  Vận chuyển siêu tốc
                </li>
                <li className="box-item">
                  <PhoneCall strokeWidth="1px" size="20" />
                  Tư vấn Build PC: 0986552233
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeaderBottom;
