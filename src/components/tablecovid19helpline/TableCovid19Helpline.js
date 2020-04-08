import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import _ from 'lodash';

import * as FirestoreService from '../../services/firebase';

import './TableCovid19Helpline.scss';

const TableCovid19Helpline = (props) => {
  const [helplines, setHelplines] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    FirestoreService.getHelplineList()
      .then((doc) => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          let helplineData = [];
          Object.entries(doc.data().numbers).forEach(([key, value]) =>
            helplineData.push({ name: key, data: value })
          );

          setHelplines(helplineData);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setError(err);
      });
  }, []);

  return (
    <div className="covid-table-helpline">
      <div className="text-primary mb-4">
        <div>Central Helpline Number for corona-virus</div>
        <h6>&nbsp;</h6>
        <h3>+91-11-23978046</h3>
      </div>
      <div className="text-muted">
        <small>Indian Helpline Numbers for covid-19</small>
      </div>
      <Table bordered striped responsive className="covid-table">
        <thead>
          <tr>
            {window.innerWidth <= 375 ? '' : <th>#</th>}
            <th>State/UT</th>
            <th>Helpline Numbers</th>
          </tr>
        </thead>
        <tbody>
          {_.map(helplines, (subdata, idx) => {
            return (
              <tr key={idx + 1}>
                {window.innerWidth <= 375 ? '' : <td>{idx + 1}</td>}
                <td>{subdata.name}</td>
                <td>{subdata.data}</td>
              </tr>
            );
          })}
          <tr key={0}>
            {window.innerWidth <= 375 ? '' : <td></td>}
            <td>Download PDF of Helplines</td>
            <td>
              <a
                href="https://www.mohfw.gov.in/pdf/coronvavirushelplinenumber.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Click Here
              </a>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TableCovid19Helpline;
