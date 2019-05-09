/**
 * Displays a slider
 * TODO: The images should be imported from the src folder not the public one
 * TODO: Fix autoplay
 */

import React from 'react';
import Slider from 'react-slick';

import slidesJson from '../../common/config/slides.json';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  autoPlay: true,
  autoPlaySpeed: 2000,
  slidesToShow: 3,
  slidesToScroll: 1,
  adaptiveHeight: true,
  variableWidth: false,
  className: 'slider',
  pauseOnHover: false,
};

function Carousel() {
  return (
    <Slider {...settings}>
      {slidesJson.map(slide => (
        <div
          key={slide.link}
        >
          <div
            className="slider__test-slide"
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/${slide.image})` }}
          />
        </div>
      ))}
    </Slider>
  );
}

export default Carousel;
