import React, { useState, useEffect } from 'react';
import map from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import * as API from '../../api/API';

import './Covid19Essentials.scss';

const Covid19Essentials = () => {
  const [essentialsGeneral, setEssentialsGeneral] = useState([]);
  const [essentialsKids, setEssentialsKids] = useState([]);
  const [essentialsTravel, setEssentialsTravel] = useState([]);

  const [cursorGeneral, setCursorGeneral] = useState('');
  const [cursorKids, setCursorKids] = useState('');
  const [cursorTravel, setCursorTravel] = useState('');

  const [hasMoreGeneral, setHasMoreGeneral] = useState(true);
  const [hasMoreKids, setHasMoreKids] = useState(true);
  const [hasMoreTravel, setHasMoreTravel] = useState(true);

  useEffect(() => {
    API.getEssentials(4, 'general')
      .then((res) => {
        if (res.status === 200) {
          setEssentialsGeneral(res.data.essentials);
          setCursorGeneral(
            res.data.essentials[res.data.essentials.length - 1].cursorTime
          );
          setHasMoreGeneral(true);
        } else {
          setEssentialsGeneral([]);
          setCursorGeneral('');
          setHasMoreGeneral(false);
        }
      })
      .catch((err) => {
        setHasMoreGeneral(false);
      });

    API.getEssentials(4, 'kids')
      .then((res) => {
        if (res.status === 200) {
          setEssentialsKids(res.data.essentials);
          setCursorKids(
            res.data.essentials[res.data.essentials.length - 1].cursorTime
          );
          setHasMoreKids(true);
        } else {
          setEssentialsKids([]);
          setCursorKids('');
          setHasMoreKids(false);
        }
      })
      .catch((err) => {
        setHasMoreKids(false);
      });

    API.getEssentials(4, 'travel')
      .then((res) => {
        if (res.status === 200) {
          setEssentialsTravel(res.data.essentials);
          setCursorTravel(
            res.data.essentials[res.data.essentials.length - 1].cursorTime
          );
          setHasMoreTravel(true);
        } else {
          setEssentialsTravel([]);
          setCursorTravel('');
          setHasMoreTravel(false);
        }
      })
      .catch((err) => {
        setHasMoreTravel(false);
      });
  }, []);

  const loadMoreGeneral = () => {
    API.getEssentialsAfter(8, cursorGeneral, 'general')
      .then((res) => {
        if (res.status === 200) {
          let data = res.data.essentials;

          setEssentialsGeneral((essentials) => [
            ...essentialsGeneral,
            ...res.data.essentials,
          ]);
          setCursorGeneral(data[data.length - 1].cursorTime);
          setHasMoreGeneral(true);
        } else {
          setHasMoreGeneral(false);
        }
      })
      .catch((error) => setHasMoreGeneral(false));
  };

  const loadMoreKids = () => {
    API.getEssentialsAfter(8, cursorKids, 'kids')
      .then((res) => {
        if (res.status === 200) {
          let data = res.data.essentials;

          setEssentialsKids((essentials) => [
            ...essentialsKids,
            ...res.data.essentials,
          ]);
          setCursorKids(data[data.length - 1].cursorTime);
          setHasMoreKids(true);
        } else {
          setHasMoreKids(false);
        }
      })
      .catch((error) => setHasMoreKids(false));
  };

  const loadMoreTravel = () => {
    API.getEssentialsAfter(8, cursorTravel, 'travel')
      .then((res) => {
        if (res.status === 200) {
          let data = res.data.essentials;

          setEssentialsTravel((essentials) => [
            ...essentialsTravel,
            ...res.data.essentials,
          ]);
          setCursorTravel(data[data.length - 1].cursorTime);
          setHasMoreTravel(true);
        } else {
          setHasMoreTravel(false);
        }
      })
      .catch((error) => setHasMoreTravel(false));
  };

  const displayItems = (essentials, cursor, loadMore, hasMore) => {
    return essentials.length > 0 ? (
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
                        <h6 className="card-title text-small">{item.title}</h6>
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
    );
  };

  return (
    <div>
      <Tabs className="mt-3">
        <TabList>
          <Tab>Everyday</Tab>
          <Tab>Kids</Tab>
          <Tab>Travel</Tab>
        </TabList>

        <TabPanel>
          <h2>Covid-19 Everyday Essentials</h2>
          {displayItems(
            essentialsGeneral,
            cursorGeneral,
            loadMoreGeneral,
            hasMoreGeneral
          )}
        </TabPanel>
        <TabPanel>
          <h2>Covid-19 Kids Essentials</h2>
          {displayItems(essentialsKids, cursorKids, loadMoreKids, hasMoreKids)}
        </TabPanel>
        <TabPanel>
          <h2>Covid-19 Travel Essentials</h2>
          {displayItems(
            essentialsTravel,
            cursorTravel,
            loadMoreTravel,
            hasMoreTravel
          )}
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Covid19Essentials;
