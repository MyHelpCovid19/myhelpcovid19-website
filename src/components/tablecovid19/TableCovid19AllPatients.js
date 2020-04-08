import React, { Component } from 'react';
import { Table } from 'reactstrap';
import PaginationTable from '../pagination/PaginationTable';
import _ from 'lodash';
import * as axios from 'axios';

import './TableCovid19.scss';

export default class TableCovid19AllPatients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      patients: [],
      loading: false,
      perPage: 15,
      currentPage: 1,
      totalData: '',
      currentPatients: [],
    };
  }

  async componentDidMount() {
    await axios
      .get('https://api.covid19india.org/raw_data.json')
      .then((res) => {
        const validData = res.data.raw_data.filter(
          (list) => list.detectedstate !== ''
        );

        this.setState(
          {
            patients: validData,
            loading: false,
            totalData: validData.length,
          },
          () => {
            this.formatData();
          }
        );
      })
      .catch((err) => console.log(err));
  }

  formatData() {
    const indexOfLastPost = this.state.currentPage * this.state.perPage;
    const indexOfFirstPage = indexOfLastPost - this.state.perPage;

    const currentPatients = this.state.patients.slice(
      indexOfFirstPage,
      indexOfLastPost
    );

    this.setState({ currentPatients });
  }

  handleClick = (number) => {
    this.setState(
      {
        currentPage: number,
      },
      () => {
        this.formatData();
      }
    );
  };

  render() {
    const { perPage, totalData, currentPage, currentPatients } = this.state;

    return (
      <div>
        <div className="text-muted my-2">
          <small>Covid-19 Patients List of India</small>
        </div>
        <Table bordered striped responsive className="covid-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Patient #</th>
              <th>Age</th>
              <th>Date Announced</th>
              <th>City</th>
              <th>District</th>
              <th>State</th>
              <th>Gender</th>
              <th>Nationality</th>
              <th>Transmission</th>
              <th>source1</th>
              <th>source2</th>
              <th>source3</th>
            </tr>
          </thead>
          <tbody>
            {_.map(currentPatients, (subdata, idx) => {
              if (subdata.dateannounced !== '') {
                return (
                  <tr key={idx}>
                    <td>{subdata.patientnumber}</td>
                    <td>{subdata.statepatientnumber}</td>
                    <td>{subdata.agebracket}</td>
                    <td>{subdata.dateannounced}</td>
                    <td>{subdata.detectedcity}</td>
                    <td>{subdata.detecteddistrict}</td>
                    <td>{subdata.detectedstate}</td>
                    <td>{subdata.gender}</td>
                    <td>{subdata.nationality}</td>
                    <td>{subdata.typeoftransmission}</td>
                    <td>
                      <a
                        href={subdata.source1}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {subdata.source1 !== '' ? 'source' : ''}
                      </a>
                    </td>
                    <td>
                      <a
                        href={subdata.source2}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {subdata.source2 !== '' ? 'source' : ''}
                      </a>
                    </td>
                    <td>
                      <a
                        href={subdata.source3}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {subdata.source3 !== '' ? 'source' : ''}
                      </a>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </Table>
        <div className="float-right">
          <PaginationTable
            per_page={perPage}
            current_page={currentPage}
            total_data={totalData}
            handleClick={this.handleClick}
          />
        </div>
      </div>
    );
  }
}
