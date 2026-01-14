import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Header.css";
import { Link } from "react-router-dom";
import Logo from "../../../../assets/images/logo.png";
import { Search } from "lucide-react";
import Button from "../../../Button/Button";
import { User } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { ShoppingBag } from "lucide-react";

const HeaderMain = () => {
  return (
    <div className="header-main">
      <Container>
        <Row className="d-flex align-items-center">
          <Col md={3}>
            <Link to="/">
              <img src={Logo} alt="" />
            </Link>
          </Col>
          <Col md={6}>
            <div className="box-search">
              <input
                className="header-search"
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
              />
              <div className="search-action">
                <Button content={<Search />} primary={true} />
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="d-flex align-items-center gap-5">
              <div className="header-auth">
                <User size={30} strokeWidth="0.75px" />
                <div className="header-box-text">
                  Đăng nhập / Đăng ký
                  <span>
                    Tài khoản của tôi <ChevronDown size={16} />
                  </span>
                </div>
              </div>
              <div className="header-cart">
                <ShoppingBag strokeWidth="1px" />
                Giỏ hàng
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeaderMain;
