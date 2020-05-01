import React, { useEffect, useState, Suspense } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import find from 'lodash/find';

import { formatDate, formatDateAbsolute } from '../../helpers/date-utils';
import { formatDistance } from 'date-fns';
import { STATE_CODES } from '../../constants/constants';
import { parseStateTimeseries } from '../../helpers/common-utils';

import * as API from '../../api/API';

import './StateGovtHome.scss';

const StateGovtTable = React.lazy(() => import('./StateGovtTable'));
const StateGovtDetails = React.lazy(() => import('./StateGovtDetails'));
const TotalCharts = React.lazy(() => import('../totalcharts/TotalCharts'));

const StateGovtHome = () => {
  const { stateCode } = useParams();

  const [fetched, setFetched] = useState(false);
  const [timeseries, setTimeseries] = useState([]);
  const [stateData, setStateData] = useState();
  const [testData, setTestData] = useState({});
  const [districtData, setDistrictData] = useState({});
  const [stateName] = useState(STATE_CODES[stateCode.toUpperCase()]);
  const [lastUpdated, setLastUpdated] = useState('');
  const [stateDetails, setStateDetails] = useState({});

  useEffect(() => {
    if (fetched === false) {
      getState(stateCode.toUpperCase());
      getStateDetails(stateCode.toUpperCase());
    }
  }, [fetched, stateCode]);

  const getState = async (code) => {
    try {
      const [
        { data: dataResponse },
        { data: stateDistrictWiseResponse },
        { data: statesDailyResponse },
        { data: stateTestResponse },
      ] = await Promise.all([
        axios.get('https://api.covid19india.org/data.json'),
        axios.get('https://api.covid19india.org/state_district_wise.json'),
        axios.get('https://api.covid19india.org/states_daily.json'),
        axios.get('https://api.covid19india.org/state_test_data.json'),
      ]);

      setStateData(find(dataResponse.statewise, { statecode: code }));

      const ts = parseStateTimeseries(statesDailyResponse)[code];
      setTimeseries(ts);

      const name = STATE_CODES[code];

      let districtData = [];
      let idx = 1;

      Object.entries(stateDistrictWiseResponse[name].districtData).forEach(
        ([key, value]) => {
          districtData.push({
            id: idx,
            district: key,
            confirmed: value.confirmed,
            deltaconfirmed: value.delta.confirmed,
          });
          idx = idx + 1;
        }
      );

      setDistrictData(districtData);
      setLastUpdated(
        find(dataResponse.statewise, { statecode: code }).lastupdatedtime
      );

      const statesTests = stateTestResponse.states_tested_data;
      setTestData(
        statesTests.filter(
          (obj) => obj.state === name && obj.totaltested !== ''
        )
      );

      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };

  const getStateDetails = async (code) => {
    try {
      const res = await API.getStateData(code);
      if (res.status === 200) {
        setStateDetails(res.data);
      } else {
        setStateDetails({});
      }
    } catch (err) {
      setStateDetails({});
    }
  };

  return (
    <div className="covid-state">
      <div className="state-left">
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <TotalCharts data={stateData} timeseries={timeseries} />
          </Suspense>
          <div className="text-muted">
            <span>
              <h3>{stateName}</h3>{' '}
              <span>
                <small>covid19 list updated</small>
              </span>
            </span>
            <small>
              <span>
                {isNaN(Date.parse(formatDate(lastUpdated)))
                  ? ''
                  : formatDistance(
                      new Date(formatDate(lastUpdated)),
                      new Date()
                    ) + ' ago,'}
              </span>
              <span>
                {isNaN(Date.parse(formatDate(lastUpdated)))
                  ? ''
                  : formatDateAbsolute(lastUpdated)}
              </span>
            </small>
          </div>

          {districtData.length > 0 &&
          stateDetails.districtHelpline !== undefined ? (
            <Suspense fallback={<div>Loading...</div>}>
              <StateGovtTable
                subdata={districtData}
                total={stateData}
                helplines={stateDetails.districtHelpline}
                helplinesource={stateDetails.districtHelplineSource}
              />
            </Suspense>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="state-right">
        <Suspense fallback={<div>Loading...</div>}>
          <StateGovtDetails details={stateDetails} testData={testData} />
        </Suspense>
        {/* <PdfViewer /> */}
      </div>
    </div>
  );
};

export default StateGovtHome;
