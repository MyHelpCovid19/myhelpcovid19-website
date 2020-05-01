import React, { useState, useEffect } from 'react';
import map from 'lodash';
import Moment from 'react-moment';
import InfiniteScroll from 'react-infinite-scroll-component';

import * as API from '../../api/API';

import './FreeCourses.scss';

const FromUdemy = () => {
  const [courses, setCourses] = useState([]);
  const [cursor, setCursor] = useState('');
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    API.getCourses(8, 'udemy')
      .then((res) => {
        if (res.status === 200) {
          setCourses(res.data.courses);
          setCursor(res.data.courses[res.data.courses.length - 1].cursorTime);
          setHasMore(true);
        } else {
          setCourses([]);
          setCursor('');
          setHasMore(false);
        }
      })
      .catch((err) => {
        setHasMore(false);
      });
  }, []);

  const loadMore = () => {
    API.getCoursesAfter(8, 'udemy', cursor)
      .then((res) => {
        if (res.status === 200) {
          let data = res.data.courses;

          setCourses((courses) => [...courses, ...res.data.courses]);
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
        <div className="float-left">Udemy Courses</div>
        <div className="float-right">
          <small>Note: Coupon codes expires in 2 days only</small>
        </div>
      </div>

      {courses.length > 0 ? (
        <InfiniteScroll
          dataLength={courses.length} //This is important field to render the next data
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
                {map.map(courses, (item, idx) => {
                  return (
                    <div
                      key={idx}
                      className="col-sm-6 col-md-6 col-lg-4 col-xl-3"
                    >
                      <div className="card mb-3">
                        <img src={item.image} alt="" height="150" />

                        <div className="card-body">
                          <h6 className="card-title text-small">
                            {item.title}
                          </h6>
                          <div className="card-text">
                            <div className="text-success mb-1">
                              by {item.authors}
                            </div>
                            <div className="mb-1">Topics: {item.topics}</div>
                            <div className="text-muted">
                              Added <Moment fromNow>{item.addedAt}</Moment>
                            </div>
                          </div>

                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-primary btn-sm mt-3"
                          >
                            Redeem Course
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

export default FromUdemy;
