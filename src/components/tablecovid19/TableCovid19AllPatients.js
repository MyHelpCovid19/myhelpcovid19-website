import React, { useState, useEffect } from 'react';
import axios from 'axios';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';

import './TableCovid19.scss';

const TableCovid19AllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (loading === false) {
      getData();
    }
  }, [loading]);

  const getData = async () => {
    try {
      const res = await axios.get('https://api.covid19india.org/raw_data.json');

      const validData = res.data.raw_data.filter(
        (list) => list.detectedstate !== ''
      );

      setPatients(validData);
      setLoading(true);
    } catch (err) {
      setError((error) => (error = err));
    }
  };

  const columns = [
    {
      dataField: 'patientnumber',
      text: '#',
    },
    {
      dataField: 'statepatientnumber',
      text: 'Patient #',
    },
    {
      dataField: 'agebracket',
      text: 'Age',
    },
    {
      dataField: 'dateannounced',
      text: 'Date Announced',
    },
    {
      dataField: 'detectedcity',
      text: 'City',
      sort: true,
    },
    {
      dataField: 'detecteddistrict',
      text: 'District',
      sort: true,
    },
    {
      dataField: 'detectedstate',
      text: 'State',
      sort: true,
    },
    {
      dataField: 'gender',
      text: 'Gender',
      sort: true,
    },
    {
      dataField: 'nationality',
      text: 'Nationality',
      sort: true,
    },
    {
      dataField: 'typeoftransmission',
      text: 'Transmission',
    },
    {
      dataField: 'source1',
      text: 'source1',
      formatter: sourceDF,
    },
    {
      dataField: 'source2',
      text: 'source2',
      formatter: sourceDF,
    },
    {
      dataField: 'source3',
      text: 'source3',
      formatter: sourceDF,
    },
  ];

  function sourceDF(cell) {
    return (
      <a href={cell} target="_blank" rel="noopener noreferrer">
        {cell !== '' ? 'source' : ''}
      </a>
    );
  }

  const MySearch = (props) => {
    let input;

    const handleClick = () => {
      props.onSearch(input.value);
    };

    return (
      <div>
        <input
          type="text"
          className="form-control form-control-sm shadow-none my-1"
          ref={(n) => (input = n)}
          placeholder="Search"
          onInput={handleClick}
        />
      </div>
    );
  };

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      {'    '}
      Showing {from} to {to} of {size} Results
    </span>
  );

  const options = {
    paginationSize: 4,
    pageStartIndex: 0,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: '10',
        value: 10,
      },
      {
        text: '20',
        value: 20,
      },
      {
        text: '50',
        value: 50,
      },
      {
        text: '100',
        value: 100,
      },
    ],
  };

  return (
    <div className="mb-4">
      <div className="text-muted my-2">
        <small>Covid-19 Patients List of India</small>
      </div>
      <div className="table-responsive">
        <small>
          <ToolkitProvider
            keyField="patientnumber"
            data={patients}
            columns={columns}
            search
          >
            {(props) => (
              <div>
                <MySearch {...props.searchProps} />
                <BootstrapTable
                  {...props.baseProps}
                  striped
                  condensed
                  noDataIndication="No data ..."
                  pagination={paginationFactory(options)}
                />
              </div>
            )}
          </ToolkitProvider>
        </small>
      </div>
    </div>
  );
};

export default TableCovid19AllPatients;
