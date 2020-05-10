import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';

import ReactPlayer from 'react-player';

import './LiveNewsChannelsMasonry.scss';

const LiveNewsChannelsMasonry = (props) => {
  const [channelDetails, setChannelDetails] = useState([]);

  useEffect(() => {
    let channelDetails = [];

    Object.entries(props.data.data).forEach(
      ([key, value]) =>
        (channelDetails = [...channelDetails, { name: key, data: value }])
    );

    setChannelDetails(channelDetails);
  }, [props.data]);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
    500: 1,
  };

  // Convert array to JSX items
  let items = channelDetails.map(function (item) {
    return (
      <div key={item.name}>
        <div className="player-wrapper">
          <div key={item.name}>
            <ReactPlayer
              url={item.data}
              className="react-player"
              width="100%"
              height="100%"
              controls={true}
              config={{
                youtube: {
                  playerVars: { showinfo: 1 },
                },
              }}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center py-2 text-white">
          <small>{item.name}</small>
        </div>
      </div>
    );
  });

  return (
    <div className="mt-3">
      {channelDetails !== '' ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
          columnAttrs={{
            className: 'should be overridden',
            'data-test': '',
            style: { '--test': 'test' },
          }}
        >
          {items}
        </Masonry>
      ) : (
        ''
      )}
    </div>
  );
};

export default LiveNewsChannelsMasonry;
