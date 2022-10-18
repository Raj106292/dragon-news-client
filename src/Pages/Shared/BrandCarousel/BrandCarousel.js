import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './BrandCarousel.css';

const BrandCarousel = () => {
    return (
        <Carousel className='mt-3'>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://w0.peakpx.com/wallpaper/384/111/HD-wallpaper-asus-glitter-logo-creative-metal-grid-background-asus-logo-brands-asus-thumbnail.jpg"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://60a99bedadae98078522-a9b6cded92292ef3bace063619038eb1.ssl.cf2.rackcdn.com/images_brands_asus_2020_2020_asus_rog_banner.jpg"
                    alt="Second slide"
                />
            </Carousel.Item>
        </Carousel>
    );
};

export default BrandCarousel;