import React, { useEffect, useState, lazy, Suspense } from 'react';
import * as axios from 'axios';

import { formatDate, formatDateAbsolute } from '../../helpers/date-utils';
import { formatDistance } from 'date-fns';

import './Home.scss';

const TableCovid19 = lazy(() => import('../tablecovid19/TableCovid19'));
const TotalCharts = lazy(() => import('../totalcharts/TotalCharts'));
const TableCovid19Helpline = lazy(() =>
  import('../tablecovid19helpline/TableCovid19Helpline')
);
const Covid19EssentialBar = lazy(() =>
  import('../essentials/Covid19EssentialBar')
);

const Home = () => {
  const [states, setStates] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');
  const [timeseries, setTimeseries] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    if (fetched === false) {
      getStates();
    }
  }, [fetched]);

  const getStates = async () => {
    try {
      const response = await axios.get(
        'https://api.covid19india.org/data.json'
      );

      setStates(response.data.statewise);
      setTimeseries(response.data.cases_time_series);
      setLastUpdated(response.data.statewise[0].lastupdatedtime);
      setFetched(true);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Covid19EssentialBar />
      </Suspense>
      <div className="covid-home">
        <div className="home-left">
          <div>
            <Suspense fallback={<div>Loading...</div>}>
              <TotalCharts data={states[0]} timeseries={timeseries} />
            </Suspense>
            <div className="text-muted">
              <small>
                <h3>India</h3>
                <span>Covid19 list updated </span>
                <span>
                  {isNaN(Date.parse(formatDate(lastUpdated)))
                    ? ''
                    : formatDistance(
                        new Date(formatDate(lastUpdated)),
                        new Date()
                      ) + ' ago, '}
                </span>
                <span>
                  {isNaN(Date.parse(formatDate(lastUpdated)))
                    ? ''
                    : formatDateAbsolute(lastUpdated)}
                </span>
              </small>
            </div>
            {states.length > 0 ? (
              <Suspense fallback={<div>Loading...</div>}>
                <TableCovid19 subdata={states} />
              </Suspense>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="home-right">
          <Suspense fallback={<div>Loading...</div>}>
            <TableCovid19Helpline />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Home;
