import "./Footer.css";
import { Container, Row, Col } from "react-bootstrap";
import { Send, Mail } from "lucide-react";
import Button from "@ui/Button/Button";

const NewsLetter = () => {
  return (
    <div className="footer-newsletter">
      <Container>
        <Row className="d-flex align-items-center justify-content-center">
          {/* Phần tiêu đề + thông tin */}
          <Col md={6}>
            <div className="newsletter-info">
              <h3 className="newsletter-title m-0">
                <Send size={24} /> Đăng ký nhận bản tin
              </h3>
              <p className="newsletter-sub m-0">
                Để nhận các thông tin mới từ TTG cũng như các chương trình
                khuyến mãi
              </p>
            </div>
          </Col>

          <Col md={6}>
            <div className="newsletter-box">
              <div className="newsletter-email">
                <Mail size={18} strokeWidth="0.75px" />
              </div>
              <input
                className="newsletter-input"
                type="text"
                placeholder="Vui lòng nhập email của bạn..."
              />
              <div className="newsletter-action">
                <Button content={"Đăng ký"} primary={true} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NewsLetter;
