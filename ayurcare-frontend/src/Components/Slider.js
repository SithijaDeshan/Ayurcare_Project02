import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slide1 from '../Assets/home1.png';
import slide2 from '../Assets/home2.jpg';
import slide3 from '../Assets/home3.png';
import slide4 from '../Assets/home4.jpg';
import './slider.css'


const SlideComponent = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500
    };

    return (
        <div className='slider-container'>
            {/*<h2>React Slick Demo</h2>*/}
            <Slider {...settings}>
                <div className='slider-home'>
                    <img src={slide1} alt="Slide 1" />
                </div>
                <div className='slider-home'>
                    <img src={slide2} alt="Slide 2" />
                </div>
                <div className='slider-home'>
                    <img src={slide3} alt="Slide 3" />
                </div>
                <div className='slider-home'>
                    <img src={slide4} alt="Slide 3" />
                </div>
            </Slider>
        </div>
    );
};

export default SlideComponent;
