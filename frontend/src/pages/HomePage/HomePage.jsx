import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import BaseCarousel from "../../components/BaseCarousel";
import Slider1 from "../../assets/images/slide_1_img.jpg";
import Slider2 from "../../assets/images/slide_2_img.jpg";
import Slider4 from "../../assets/images/slide_4_img.jpg";
import Banner1 from "../../assets/images/banner_top_1_img_large.jpg";
import Banner2 from "../../assets/images/banner_top_2_img_large.jpg";
import Banner3 from "../../assets/images/banner_top_3_img_large.jpg";
import "./HomePage.css";

const HomePage = () => {
  const slides = [
    {
      image: Slider1,
    },
    {
      image: Slider2,
    },
    {
      image: Slider4,
    },
  ];
  const banner = [Banner1, Banner2, Banner3];
  return (
    <Container>
      <Row>
        <Col md={2}></Col>
        <Col md={7}>
          <div className="box-heroes">
            <BaseCarousel slides={slides} fade interval={4000} />
          </div>
        </Col>  
        <Col md={3}>
          <div className="box-banner">
            {banner.map((i) => (
              <img className="w-100 h-100 object-fit-fill rounded" src={i} />
            ))}
          </div>
        </Col>
      </Row>
      <section></section>
    </Container>
  );
};

export default HomePage;
