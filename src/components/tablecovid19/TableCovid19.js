import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import map from 'lodash/map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import './TableCovid19.scss';

const TableCovid19 = (props) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState('');

  useEffect(() => {
    let givenData = [];

    map(props.subdata, (subdata, idx) => {
      if (idx > 0) {
        givenData.push({
          id: idx,
          state: subdata.state,
          stateCode: subdata.statecode,
          deltaconfirmed: parseInt(subdata.deltaconfirmed),
          confirmed: parseInt(subdata.confirmed),
          active: parseInt(subdata.active),
          deltarecovered: parseInt(subdata.deltarecovered),
          recovered: parseInt(subdata.recovered),
          deltadeaths: parseInt(subdata.deltadeaths),
          deaths: parseInt(subdata.deaths),
        });
      } else {
        setTotal({
          state: subdata.state,
          deltaconfirmed: parseInt(subdata.deltaconfirmed),
          confirmed: parseInt(subdata.confirmed),
          active: parseInt(subdata.active),
          deltarecovered: parseInt(subdata.deltarecovered),
          recovered: parseInt(subdata.recovered),
          deltadeaths: parseInt(subdata.deltadeaths),
          deaths: parseInt(subdata.deaths),
        });
      }
    });

    setData(givenData);
  }, [props.subdata]);

  const columns = [
    {
      dataField: 'id',
      text: '#',
      sort: true,
      footer: '',
      hidden: idHidden(),
    },
    {
      dataField: 'state',
      text: 'State/UT',
      sort: true,
      footer: 'India',
      footerFormatter: stateFF,
      formatter: stateCF,
    },
    {
      dataField: 'confirmed',
      text: 'Confirmed',
      sort: true,
      headerFormatter: confirmedHF,
      headerAlign: 'right',
      formatter: confirmedCF,
      footer: '',
      footerFormatter: confirmedFF,
      align: 'right',
      footerAlign: 'right',
    },
    {
      dataField: 'active',
      text: 'Active',
      sort: true,
      headerFormatter: activeHF,
      headerAlign: 'right',
      formatter: activeCF,
      footer: '',
      footerFormatter: activeFF,
      align: 'right',
      footerAlign: 'right',
    },
    {
      dataField: 'recovered',
      text: 'Recovered',
      sort: true,
      headerFormatter: recoveredHF,
      headerAlign: 'right',
      formatter: recoveredCF,
      footer: '',
      footerFormatter: recoveredFF,
      align: 'right',
      footerAlign: 'right',
    },
    {
      dataField: 'deaths',
      text: 'Deceased',
      sort: true,
      headerFormatter: deceasedHF,
      headerAlign: 'right',
      formatter: deceasedCF,
      footer: '',
      footerFormatter: deceasedFF,
      align: 'right',
      footerAlign: 'right',
    },
  ];

  function idHidden() {
    return window.innerWidth <= 769 ? true : false;
  }

  function confirmedHF() {
    return (
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
    );
  }

  function activeHF() {
    return (
      <abbr
        className={`${window.innerWidth <= 769 ? 'text-primary' : ''}`}
        title="Active"
      >
        {window.innerWidth <= 769
          ? window.innerWidth <= 375
            ? 'A'
            : 'Actv'
          : 'Active'}
      </abbr>
    );
  }

  function recoveredHF() {
    return (
      <abbr
        className={`${window.innerWidth <= 769 ? 'text-success' : ''}`}
        title="Recovered"
      >
        {window.innerWidth <= 769
          ? window.innerWidth <= 375
            ? 'R'
            : 'Rcvrd'
          : 'Recovered'}
      </abbr>
    );
  }

  function deceasedHF() {
    return (
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
    );
  }

  function stateCF(cell, row) {
    return (
      <span className="align-items-center">
        <Link to={`/IN/${row.stateCode}`}>{cell}</Link>
      </span>
    );
  }

  function confirmedCF(cell, row) {
    return (
      <span>
        {row.deltaconfirmed !== 0 ? (
          window.innerWidth <= 769 ? (
            <div>
              {cell}
              <div className="daily-data text-danger font-weight-bold">
                <FontAwesomeIcon icon={faArrowUp} size="xs" />
                {row.deltaconfirmed}
              </div>
            </div>
          ) : (
            <div>
              <span className="daily-data text-danger font-weight-bold">
                <FontAwesomeIcon icon={faArrowUp} size="xs" />
                {row.deltaconfirmed}
              </span>
              <span> {cell}</span>
            </div>
          )
        ) : (
          <div>
            <span>{cell}</span>
          </div>
        )}
      </span>
    );
  }

  function activeCF(cell) {
    return <span>{cell}</span>;
  }

  function recoveredCF(cell, row) {
    return (
      <span>
        {row.deltarecovered !== 0 ? (
          window.innerWidth <= 769 ? (
            <div>
              {cell}
              <div className="daily-data text-success font-weight-bold">
                <FontAwesomeIcon icon={faArrowUp} size="xs" />
                {row.deltarecovered}
              </div>
            </div>
          ) : (
            <div>
              <span className="daily-data text-success font-weight-bold">
                <FontAwesomeIcon icon={faArrowUp} size="xs" />
                {row.deltarecovered}
              </span>
              <span> {cell}</span>
            </div>
          )
        ) : (
          <div>
            <span>{cell}</span>
          </div>
        )}
      </span>
    );
  }

  function deceasedCF(cell, row) {
    return (
      <span>
        {row.deltadeaths !== 0 ? (
          window.innerWidth <= 769 ? (
            <div>
              {cell}
              <div className="daily-data text-muted font-weight-bold">
                <FontAwesomeIcon icon={faArrowUp} size="xs" />
                {row.deltadeaths}
              </div>
            </div>
          ) : (
            <div>
              <span className="daily-data text-muted font-weight-bold">
                <FontAwesomeIcon icon={faArrowUp} size="xs" />
                {row.deltadeaths}
              </span>
              <span> {cell}</span>
            </div>
          )
        ) : (
          <div>
            <span>{cell}</span>
          </div>
        )}
      </span>
    );
  }

  function stateFF() {
    return total.state;
  }

  function confirmedFF() {
    return (
      <span>
        {window.innerWidth <= 769 ? (
          <span>
            {total.confirmed}{' '}
            <div className="daily-data text-danger">
              <FontAwesomeIcon icon={faArrowUp} size="xs" />
              {total.deltaconfirmed}
            </div>
          </span>
        ) : (
          <div>
            <span className="daily-data text-danger">
              <FontAwesomeIcon icon={faArrowUp} size="xs" />
              {total.deltaconfirmed}
            </span>
            {'   ' + total.confirmed}
          </div>
        )}
      </span>
    );
  }

  function activeFF() {
    return <span>{total.active}</span>;
  }

  function recoveredFF() {
    return (
      <span>
        {window.innerWidth <= 769 ? (
          <span>
            {total.recovered}{' '}
            <div className="daily-data text-success">
              <FontAwesomeIcon icon={faArrowUp} size="xs" />
              {total.deltarecovered}
            </div>
          </span>
        ) : (
          <div>
            <span className="daily-data text-success">
              <FontAwesomeIcon icon={faArrowUp} size="xs" />
              {total.deltarecovered}
            </span>
            {'   ' + total.recovered}
          </div>
        )}
      </span>
    );
  }

  function deceasedFF() {
    return (
      <span>
        {window.innerWidth <= 769 ? (
          <span>
            {total.deaths}{' '}
            <div className="daily-data text-mute">
              <FontAwesomeIcon icon={faArrowUp} size="xs" />
              {total.deltadeaths}
            </div>
          </span>
        ) : (
          <div>
            <span className="daily-data text-mute">
              <FontAwesomeIcon icon={faArrowUp} size="xs" />
              {total.deltadeaths}
            </span>
            {'   ' + total.deaths}
          </div>
        )}
      </span>
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
          name="Search Table"
        />
      </div>
    );
  };

  return (
    <div className="table-responsive">
      <small>
        <ToolkitProvider keyField="state" data={data} columns={columns} search>
          {(props) => (
            <div>
              <MySearch {...props.searchProps} />
              <BootstrapTable
                {...props.baseProps}
                striped
                condensed
                noDataIndication="No data ..."
              />
            </div>
          )}
        </ToolkitProvider>
      </small>
    </div>
  );
};

export default TableCovid19;
