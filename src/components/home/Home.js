import React, { useEffect, useState } from 'react';
import * as axios from 'axios';

import { formatDate, formatDateAbsolute } from '../../helpers/date-utils';
import { formatDistance } from 'date-fns';
import TableCovid19 from '../tablecovid19/TableCovid19';
import TotalCharts from '../totalcharts/TotalCharts';
import TableCovid19Helpline from '../tablecovid19helpline/TableCovid19Helpline';

import './Home.scss';

const Home = (props) => {
  const [states, setStates] = useState([]);
  // const [stateDistrictWiseData, setStateDistrictWiseData] = useState({});
  const [fetched, setFetched] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');
  const [timeseries, setTimeseries] = useState([]);

  useEffect(() => {
    if (fetched === false) {
      getStates();
    }
  }, [fetched]);

  const getStates = async () => {
    try {
      const [response] = await Promise.all([
        axios.get('https://api.covid19india.org/data.json'),

        // Segregate for showing only district data
        axios.get('https://api.covid19india.org/state_district_wise.json'),
      ]);

      setStates(response.data.statewise);
      setTimeseries(response.data.cases_time_series);
      setLastUpdated(response.data.statewise[0].lastupdatedtime);
      // setStateDistrictWiseData(stateDistrictWiseResponse.data);
      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="covid-home">
      <div className="home-left">
        <div>
          <TotalCharts data={states} timeseries={timeseries} />

          {/* Last Updated Date */}
          <div>
            <small className="text-muted">
              <span>Last Updated: </span>
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
          <TableCovid19
            subdata={states}
            timeseries={timeseries}
            tablename={'State/UT'}
          />
        </div>
      </div>
      <div className="home-right">
        <TableCovid19Helpline />
        {/* <PdfViewer /> */}
      </div>
    </div>
  );
};

export default Home;
