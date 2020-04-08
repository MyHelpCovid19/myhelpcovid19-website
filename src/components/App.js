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
import iconForWeb from '../assets/images/logo512.png';

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
                  path="/IN/:id"
                  render={(props) => <Home {...props} />}
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
              </Switch>
            </div>
          )}
        />
      </Router>
      {/* Site footer */}
      <footer class="site-footer">
        <small>
          <div class="container">
            <div class="row">
              <div class="col-sm-12 col-md-6">
                <h6>About</h6>
                <p class="text-justify">
                  We are a group of dedicated volunteers who like to help people
                  by aggregating data from different sources and put it in{' '}
                  <a href="myhelpcovid19.in">
                    <i>myhelpcovid19.in</i>
                  </a>{' '}
                  website. We are pulling the stats from api.covid19india.org
                  and through Government Websites. Special thanks to all those
                  involved in making the api.covid19india.org.
                </p>
              </div>

              <div class="col-xs-6 col-md-3">
                <h6>Government Websites</h6>
                <ul class="footer-links">
                  <li>
                    <a href="https://www.mygov.in/covid-19">India</a>
                  </li>
                </ul>
              </div>

              <div class="col-xs-6 col-md-3">
                <h6>Quick Links</h6>
                <ul class="footer-links">
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
            <hr />
          </div>
          <div class="container">
            <div class="row">
              <div class="col-md-8 col-sm-6 col-xs-12">
                <p class="copyright-text">
                  Lets all be resposible, stay at home and maintain social
                  distance to prevent Coronavirus. With love myhelpcovid19.in{' '}
                  <img height="35" src={iconForWeb} alt="" />
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
