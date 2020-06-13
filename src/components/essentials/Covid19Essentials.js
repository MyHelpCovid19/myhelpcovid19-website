import React, { useState, useEffect } from 'react';
import map from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';

import * as API from '../../api/API';

import './Covid19Essentials.scss';

const Covid19Essentials = () => {
  const [essentials, setEssentials] = useState([]);
  const [cursor, setCursor] = useState('');
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    API.getEssentials(8)
      .then((res) => {
        if (res.status === 200) {
          setEssentials(res.data.essentials);
          setCursor(
            res.data.essentials[res.data.essentials.length - 1].cursorTime
          );
          setHasMore(true);
        } else {
          setEssentials([]);
          setCursor('');
          setHasMore(false);
        }
      })
      .catch((err) => {
        setHasMore(false);
      });
  }, []);

  const loadMore = () => {
    API.getEssentialsAfter(8, cursor)
      .then((res) => {
        if (res.status === 200) {
          let data = res.data.essentials;

          setEssentials((essentials) => [
            ...essentials,
            ...res.data.essentials,
          ]);
          setCursor(data[data.length - 1].cursorTime);
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      })
      .catch((error) => setHasMore(false));
  };

  return (
    <div>
      <div className="clearfix">
        <div className="float-left">Covid-19 Everyday Essentials</div>
      </div>

      {essentials.length > 0 ? (
        <InfiniteScroll
          dataLength={essentials.length} //This is important field to render the next data
          next={loadMore}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="container mt-3">
            <small>
              <div className="row">
                {map.map(essentials, (item, idx) => {
                  return (
                    <div
                      key={idx}
                      className="col-sm-6 col-md-6 col-lg-3 col-xl-3"
                    >
                      <div className="card mb-3">
                        <img
                          src={item.image}
                          alt=""
                          height="200"
                          rel="noopener noreferrer"
                        />

                        <div className="card-body">
                          <h6 className="card-title text-small">
                            {item.title}
                          </h6>
                          <div className="card-text">
                            <div className="text-success mb-1">
                              by {item.seller}
                            </div>
                            <div className="mb-1">{item.desc}</div>
                          </div>

                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-warning btn-sm mt-3"
                          >
                            CHECK IT OUT
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </small>
          </div>
        </InfiniteScroll>
      ) : (
        <div>Please wait while loading...</div>
      )}
    </div>
  );
};

export default Covid19Essentials;
