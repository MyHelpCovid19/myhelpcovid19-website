import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Header from './layouts/Header';
import Home from './home/Home';
import Faqs from './faqs/Faqs';

import './App.scss';
import TableCovid19AllPatients from './tablecovid19/TableCovid19AllPatients';
import LiveNewsChannels from './livenewschannels/LiveNewsChannels';
import FreeCourses from './freecourses/FreeCourses';
import StateGovtHome from './stategovtdata/StateGovtHome';

const history = require('history').createBrowserHistory;

const App = () => {
  return (
    <div className="App">
      <Router history={history}>
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
        <small>
          <div className="container">
            <div className="row mb-3">
              <div className="col-sm-12 col-md-6">
                <h6>About Us</h6>
                <p className="text-justify">
                  We are a group of dedicated volunteers who like to help people
                  by aggregating data from different sources and put it in{' '}
                  <a href="https://www.myhelpcovid19.info" target="_self">
                    <i>myhelpcovid19.info</i>
                  </a>{' '}
                  website. We are pulling stats from{' '}
                  <i>
                    <a
                      href="https://api.covid19india.org"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      api.covid19india.org
                    </a>
                  </i>
                  , Government Websites and verifiable resource. Special thanks
                  to all those involved in making{' '}
                  <i>
                    <a
                      href="https://api.covid19india.org"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      api.covid19india.org
                    </a>
                  </i>
                  . Logo from{' '}
                  <i>
                    <a
                      href="https://icons8.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://icons8.com/
                    </a>
                  </i>
                  .
                </p>
                <h6>Contact Us</h6>
                <a
                  href="https://www.facebook.com/myhelpcovid19/"
                  target=" _blank"
                >
                  Contact us at <i className="fab fa-facebook-square fa-lg"></i>
                </a>
              </div>

              <div className="col-xs-6 col-md-3">
                <h6>Government Websites</h6>
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
                <ul className="footer-links">
                  <li>
                    <h1>
                      <a
                        href="https://www.facebook.com/myhelpcovid19/"
                        target=" _blank"
                      >
                        <i className="fab fa-facebook-square"></i>
                      </a>
                      <span>
                        <a
                          href="https://www.instagram.com/myhelpcovid19"
                          target=" _blank"
                        >
                          <i className="fab fa-instagram ml-3"></i>
                        </a>
                      </span>
                    </h1>
                  </li>
                </ul>
              </div>

              <div className="col-xs-6 col-md-3">
                <h6>Quick Links</h6>
                <ul className="footer-links">
                  <li>
                    <a href="/IN/">Home</a>
                  </li>
                  <li>
                    <a href="/allpatients/">Patients Data</a>
                  </li>
                  <li>
                    <a href="/livenewschannels/">Live News Channels</a>
                  </li>
                  <li>
                    <a href="/freecourses/">Free Educational Resources</a>
                  </li>
                  <li>
                    <a href="/faqs/">FAQs</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="container mb-3">
            <div className="row">
              <div className="col-md-8 col-sm-6 col-xs-12">
                <p className="copyright-text font-weight-bold">
                  Lets all be responsible, stay at home and maintain social
                  distance to prevent Coronavirus.
                </p>
              </div>
            </div>
          </div>
        </small>
      </footer>
    </div>
  );
};

export default App;
