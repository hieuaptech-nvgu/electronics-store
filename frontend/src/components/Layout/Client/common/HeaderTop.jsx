import React from 'react';
import "./Header.css";
import {Container} from "react-bootstrap";

const HeaderTop = () => {
    return (
      <div className="header-top">
        <Container>
          <p className="header-top-address m-0">
            Hotline: 0968 239 497 - 097 221 6881 * Tư vấn build PC: 0986552233 *
            Địa chỉ: CS1: 83-85 Thái Hà - Đống Đa - Hà Nội CS2: 83A Cửu Long -
            Q10 - TP.HCM
          </p>
        </Container>
      </div>
    );
};

export default HeaderTop;