import React from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import _ from 'lodash';

import './TableCovid19.scss';

const TableCovid19 = (props) => {
  const { subdata, tablename } = props;

  return (
    <div className="table-responsive">
      <small>
        <Table bordered responsive striped className="table">
          <thead>
            <tr>
              {window.innerWidth <= 375 ? '' : <th>#</th>}
              <th>
                <abbr title="State">State/UT</abbr>
              </th>
              <th>
                <abbr
                  title="New"
                  className={`${window.innerWidth <= 769 ? 'text-danger' : ''}`}
                >
                  {window.innerWidth <= 769
                    ? window.innerWidth <= 375
                      ? 'N'
                      : 'New'
                    : 'New'}
                </abbr>
              </th>

              <th>
                <abbr
                  className={`${window.innerWidth <= 769 ? 'text-danger' : ''}`}
                  title="Confirmed"
                >
                  {window.innerWidth <= 769
                    ? window.innerWidth <= 375
                      ? 'C'
                      : 'Cnfmd'
                    : 'Confirmed'}
                </abbr>
              </th>
              <th>
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
              </th>
              <th>
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
              </th>
              <th>
                <abbr
                  className={`${window.innerWidth <= 769 ? 'text-muted' : ''}`}
                  title="Deaths"
                >
                  {window.innerWidth <= 769
                    ? window.innerWidth <= 375
                      ? 'D'
                      : 'Dcsd'
                    : 'Deceased'}
                </abbr>
              </th>
            </tr>
          </thead>
          <tbody>
            {_.map(subdata, (subdata, idx) => {
              if (idx > 0) {
                return (
                  <tr key={idx}>
                    {window.innerWidth <= 375 ? '' : <th scope="row">{idx}</th>}
                    <td>
                      <Link to={`/IN/${subdata.state}`}>{subdata.state}</Link>
                    </td>
                    <td>
                      {subdata.deltaconfirmed > 0 ? (
                        <span className="text-danger">
                          {subdata.deltaconfirmed}
                        </span>
                      ) : (
                        0
                      )}
                    </td>
                    <td>{subdata.confirmed}</td>
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
                    {window.innerWidth <= 375 ? '' : <th scope="row"></th>}

                    <td>{subdata.state}</td>
                    <td>{subdata.deltaconfirmed}</td>
                    <td>{subdata.confirmed}</td>
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

export default TableCovid19;
