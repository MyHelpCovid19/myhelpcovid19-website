import React, { useState, useEffect } from 'react';
import * as API from '../../api/API';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import map from 'lodash';

import { ESSENTIAL_BAR_DATA } from '../../constants/constants';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 1 },
    items: 1,
  },
};

const Covid19EssentialBar = () => {
  const [essentials, setEssentials] = useState([]);

  useEffect(() => {
    setEssentials(ESSENTIAL_BAR_DATA.essentials);
  }, []);

  return (
    <Carousel
      responsive={responsive}
      swipeable={false}
      draggable={false}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={1500}
      containerClass="carousel-container"
      itemClass="carousel-item-padding-40-px"
      additionalTransfrom={0}
      arrows
      minimumTouchDrag={80}
    >
      {map.map(essentials, (item, idx) => {
        return (
          <div key={idx} className="d-flex justify-content-center mx-2">
            <a
              target="_blank"
              without="true"
              rel="noopener noreferrer"
              href={item.url}
            >
              <div className="card-block">
                <img
                  src={item.image}
                  alt="Essentials"
                  width="200"
                  height="200"
                  rel="noopener noreferrer"
                />
                <div className="card-body d-flex justify-content-center">
                  <div className="btn btn-warning btn-sm">CHECK IT OUT</div>
                </div>
              </div>
            </a>
          </div>
        );
      })}
    </Carousel>
  );
};

export default Covid19EssentialBar;
