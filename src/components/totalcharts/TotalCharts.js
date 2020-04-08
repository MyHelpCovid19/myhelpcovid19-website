import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col } from 'reactstrap';

import { Line, LineChart } from 'recharts';
import _ from 'lodash';

import './TotalCharts.scss';

const TotalCharts = (props) => {
  const [data, setData] = useState(props.data);
  const [timeseries, setTimeseries] = useState(props.timeseries);
  const [confirmed, setConfirmed] = useState(0);
  const [active, setActive] = useState(0);
  const [recoveries, setRecoveries] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [deltas, setDeltas] = useState(0);
  const [dailyConfirmed, setDailyConfirmed] = useState([]);
  const [dailyActive, setDailyActive] = useState([]);
  const [dailyRecovered, setDailyRecovered] = useState([]);
  const [dailyDeceased, setDailyDeceased] = useState([]);

  useEffect(() => {
    setData(props.data);

    if (props.timeseries.length > 1) {
      setTimeseries(props.timeseries.slice(props.timeseries.length - 30));
    }
  }, [props.data, props.timeseries]);

  useEffect(() => {
    const parseData = () => {
      let confirmed = 0;
      let active = 0;
      let recoveries = 0;
      let deaths = 0;
      let deltas = {};

      data.forEach((state, index) => {
        if (index !== 0) {
          confirmed += parseInt(state.confirmed);
          active += parseInt(state.active);
          recoveries += parseInt(state.recovered);
          deaths += parseInt(state.deaths);
        } else {
          deltas = {
            confirmed: parseInt(state.deltaconfirmed),
            deaths: parseInt(state.deltadeaths),
            recovered: parseInt(state.deltarecovered),
          };
        }
      });

      setConfirmed(confirmed);
      setActive(active);
      setRecoveries(recoveries);
      setDeaths(deaths);
      setDeltas(deltas);
    };
    parseData();
  }, [data]);

  const graphData = useCallback((timeseries) => {
    if (timeseries.length <= 1) return 0;
    const dConfirmed = [];
    const dActive = [];
    const dRecovered = [];
    const dDeceased = [];

    _.map(timeseries, (subdata, idx) => {
      dConfirmed.push({
        date: subdata.date,
        value: isNaN(parseInt(subdata.dailyconfirmed))
          ? 0
          : parseInt(subdata.dailyconfirmed),
      });
    });

    _.map(timeseries, (subdata, idx) => {
      dRecovered.push({
        date: subdata.date,
        value: isNaN(parseInt(subdata.dailyrecovered))
          ? 0
          : parseInt(subdata.dailyrecovered),
      });
    });

    _.map(timeseries, (subdata, idx) => {
      dDeceased.push({
        date: subdata.date,
        value: isNaN(parseInt(subdata.dailydeceased))
          ? 0
          : parseInt(subdata.dailydeceased),
      });
    });

    _.map(timeseries, (subdata, idx) => {
      dActive.push({
        date: subdata.date,
        value:
          dConfirmed[idx].value - dRecovered[idx].value - dDeceased[idx].value,
      });
    });

    setDailyConfirmed(dConfirmed);
    setDailyRecovered(dRecovered);
    setDailyDeceased(dDeceased);
    setDailyActive(dActive);
  }, []);

  useEffect(() => {
    graphData(timeseries);
  }, [timeseries, graphData]);

  return (
    <div>
      <small>
        <div className="animated fadeIn">
          <Row className="my-4">
            <Col xs="3" sm="3" lg="3" className="text-danger">
              <div>Confirmed</div>
              <h6>
                <small>
                  [
                  {deltas
                    ? deltas.confirmed >= 0
                      ? '+' + deltas.confirmed
                      : '+0'
                    : ''}
                  ]
                </small>
              </h6>
              <h3>{confirmed}</h3>
              <div>
                <LineChart
                  width={60}
                  height={50}
                  data={dailyConfirmed}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <Line
                    type={'monotone'}
                    dataKey="value"
                    stroke={'#de2727'}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </div>
            </Col>

            <Col xs="3" sm="3" lg="3" className="text-primary">
              <div>Active</div>
              <h6>
                <small>&nbsp;</small>
              </h6>
              <h3>{active}</h3>
              <div>
                <LineChart
                  width={60}
                  height={50}
                  data={dailyActive}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <Line
                    type={'monotone'}
                    dataKey="value"
                    stroke={'#0080ff'}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </div>
            </Col>

            <Col xs="3" sm="3" lg="3" className="text-success">
              {console.log(dailyActive)}
              {console.log(dailyConfirmed)}
              <div>Recovered</div>
              <h6>
                <small>
                  [
                  {deltas
                    ? deltas.recovered >= 0
                      ? '+' + deltas.recovered
                      : '+0'
                    : ''}
                  ]
                </small>
              </h6>
              <h3>{recoveries}</h3>
              <div>
                <LineChart
                  width={60}
                  height={50}
                  data={dailyRecovered}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <Line
                    type={'monotone'}
                    dataKey="value"
                    stroke={'#248f48'}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </div>
            </Col>

            <Col xs="3" sm="3" lg="3" className="text-muted">
              <div>Deceased</div>
              <h6>
                <small>
                  [
                  {deltas
                    ? deltas.deceased >= 0
                      ? '+' + deltas.deceased
                      : '+0'
                    : ''}
                  ]
                </small>
              </h6>
              <h3>{deaths}</h3>
              <div>
                <LineChart
                  width={60}
                  height={50}
                  data={dailyDeceased}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <Line
                    type={'monotone'}
                    dataKey="value"
                    stroke={'#636f83'}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </div>
            </Col>
          </Row>
        </div>
      </small>
    </div>
  );
};

export default TotalCharts;
