import Carousel from "react-bootstrap/Carousel";

const BaseCarousel = ({ slides = [], fade = false, interval = 3000 }) => {
  if (!slides || slides.length === 0) return null;

  return (
    <Carousel fade={fade} interval={interval}>
      {slides.map((slide, index) => (
        <Carousel.Item key={index}>
          <div className="ratio ratio-16x9">
            <img
              className="w-100 h-100 object-fit-cover rounded"
              src={slide.image}
              alt={slide.alt || `slide-${index}`}
            />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default BaseCarousel;
