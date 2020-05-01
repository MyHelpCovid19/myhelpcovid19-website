import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookSquare,
  faInstagramSquare,
} from '@fortawesome/free-brands-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import Header from './layouts/Header';
import Home from './home/Home';
import Faqs from './faqs/Faqs';

import './App.scss';

import TableCovid19AllPatients from './tablecovid19/TableCovid19AllPatients';
import LiveNewsChannels from './livenewschannels/LiveNewsChannels';
import FreeCourses from './freecourses/FreeCourses';
import StateGovtHome from './stategovtdata/StateGovtHome';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Route
          render={({ location }) => (
            <div>
              <Header />
              <Route exact path="/" render={() => <Redirect to="/IN" />} />
              <Switch location={location}>
                <Route
                  exact
                  path="/IN"
                  render={(props) => <Home {...props} />}
                />
                <Route
                  exact
                  path="/faqs"
                  render={(props) => <Faqs {...props} />}
                />
                <Route
                  exact
                  path="/IN/:stateCode"
                  render={(props) => <StateGovtHome {...props} />}
                />
                <Route
                  exact
                  path="/freecourses"
                  render={(props) => <FreeCourses {...props} />}
                />
                <Route
                  exact
                  path="/allpatients"
                  render={(props) => <TableCovid19AllPatients {...props} />}
                />
                <Route
                  exact
                  path="/livenewschannels"
                  render={(props) => <LiveNewsChannels {...props} />}
                />
                <Redirect to="/IN" />
              </Switch>
            </div>
          )}
        />
      </Router>

      {/* Site footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="row mb-3">
            <div className="col-sm-12 col-md-6">
              <h6>About Us</h6>
              <small>
                <p className="text-justify">
                  We are a group of dedicated volunteers who like to help people
                  by aggregating data from different sources and put it in{' '}
                  <a href="https://www.myhelpcovid19.info" target="_self">
                    <span>myhelpcovid19.info</span>
                  </a>{' '}
                  website. We are pulling stats from{' '}
                  <span>
                    <a
                      href="https://api.covid19india.org"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      api.covid19india.org
                    </a>
                  </span>
                  , Government Websites and verifiable resource. Special thanks
                  to all those involved in making{' '}
                  <span>
                    <a
                      href="https://api.covid19india.org"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      api.covid19india.org
                    </a>
                  </span>
                  . Logo from{' '}
                  <span>
                    <a
                      href="https://icons8.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://icons8.com/
                    </a>
                  </span>
                  .
                </p>
                <h6>Contact Us</h6>
                <a
                  href="https://www.facebook.com/myhelpcovid19/"
                  target=" _blank"
                >
                  Click here to contact us at{' '}
                  <FontAwesomeIcon icon={faFacebookSquare} />
                </a>
              </small>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>Government Websites</h6>
              <small>
                <ul className="footer-links">
                  <li>
                    <a
                      href="https://www.mygov.in/covid-19"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      India MyGov.in
                    </a>
                  </li>
                </ul>
                <h6>MyHelpCovid19 Social</h6>
                Like <FontAwesomeIcon icon={faThumbsUp} /> Us At
                <ul className="footer-links">
                  <li>
                    <button
                      className="btn btn-social-icon"
                      aria-label="Facebook Page"
                      onClick={() =>
                        window.open(
                          'https://www.facebook.com/myhelpcovid19/',
                          '_blank'
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
                    </button>
                    <span>
                      <button
                        className="btn btn-social-icon"
                        aria-label="Instagram Page"
                        onClick={() =>
                          window.open(
                            'https://www.instagram.com/myhelpcovid19',
                            '_blank'
                          )
                        }
                      >
                        <FontAwesomeIcon icon={faInstagramSquare} size="2x" />
                      </button>
                    </span>
                  </li>
                </ul>
              </small>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>Quick Links</h6>
              <small>
                <ul className="footer-links">
                  <li>
                    <a href="/IN/" className="pr-3">
                      Home Page
                    </a>
                  </li>
                  <li>
                    <a href="/allpatients/">Patients Data</a>
                  </li>
                  <li>
                    <a href="/livenewschannels/">Live News Channels</a>
                  </li>
                  <li>
                    <a href="/freecourses/">Free Courses</a>
                  </li>
                  <li>
                    <a href="/faqs/" className="pr-5">
                      FAQs
                    </a>
                  </li>
                </ul>
              </small>
            </div>
          </div>
        </div>

        <div className="container mb-3">
          <small>
            <div className="row">
              <div className="col-md-8 col-sm-6 col-xs-12">
                <p className="copyright-text font-weight-bold">
                  Lets all be responsible, stay at home and maintain social
                  distance to prevent Coronavirus.
                </p>
              </div>
            </div>
          </small>
        </div>
      </footer>
    </div>
  );
};

export default App;
