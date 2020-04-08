import React from 'react';
import _ from 'lodash';

import './TableCovid19.scss';
import * as Icon from 'react-feather';
import { Table } from 'reactstrap';

const TableCovid19Test = (props) => {
  const { subdata } = props;

  return (
    <div className="covid19-main">
      <small>
        <Table striped responsive bordered className="table">
          <thead>
            <tr>
              <th>
                <div>
                  <abbr title="State">State/UT</abbr>
                </div>
              </th>
              <th>
                {' '}
                <div>
                  <abbr
                    className={`${
                      window.innerWidth <= 769 ? 'text-danger' : ''
                    }`}
                    title="Confirmed"
                  >
                    {window.innerWidth <= 769
                      ? window.innerWidth <= 375
                        ? 'C'
                        : 'Cnfmd'
                      : 'Confirmed'}
                  </abbr>
                </div>
              </th>
              <th>
                <div>
                  <abbr
                    className={`${
                      window.innerWidth <= 769 ? 'text-primary' : ''
                    }`}
                    title="Active"
                  >
                    {window.innerWidth <= 769
                      ? window.innerWidth <= 375
                        ? 'A'
                        : 'Actv'
                      : 'Active'}
                  </abbr>
                </div>
              </th>
              <th>
                <div>
                  <abbr
                    className={`${
                      window.innerWidth <= 769 ? 'text-success' : ''
                    }`}
                    title="Recovered"
                  >
                    {window.innerWidth <= 769
                      ? window.innerWidth <= 375
                        ? 'R'
                        : 'Rcvrd'
                      : 'Recovered'}
                  </abbr>
                </div>
              </th>
              <th>
                <div>
                  <abbr
                    className={`${
                      window.innerWidth <= 769 ? 'text-muted' : ''
                    }`}
                    title="Deaths"
                  >
                    {window.innerWidth <= 769
                      ? window.innerWidth <= 375
                        ? 'D'
                        : 'Dcsd'
                      : 'Deceased'}
                  </abbr>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {_.map(subdata, (subdata, idx) => {
              if (idx > 0) {
                return (
                  <tr key={idx}>
                    <td className="d-flex align-content-start">
                      {subdata.state}
                    </td>
                    <td>
                      <span className="text-danger">
                        {subdata.deltaconfirmed > 0 ? (
                          <span>
                            {subdata.deltaconfirmed}
                            <Icon.ArrowUp />
                          </span>
                        ) : (
                          ''
                        )}
                      </span>
                      <span>{subdata.confirmed}</span>
                    </td>
                    <td>{subdata.active}</td>
                    <td>{subdata.recovered}</td>
                    <td>{subdata.deaths}</td>
                  </tr>
                );
              }
            })}
            {_.map(subdata, (subdata, idx) => {
              if (idx === 0) {
                return (
                  <tr key={idx}>
                    <td>{subdata.state}</td>
                    <td>
                      <span>{subdata.deltaconfirmed}</span>
                      {subdata.confirmed}
                    </td>
                    <td>{subdata.active}</td>
                    <td>{subdata.recovered}</td>
                    <td>{subdata.deaths}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </Table>
      </small>
    </div>
  );
};

export default TableCovid19Test;
