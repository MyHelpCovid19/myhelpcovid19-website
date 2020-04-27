import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import './TableCovid19.scss';

const TableCovid19 = (props) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState('');

  useEffect(() => {
    let givenData = [];

    _.map(props.subdata, (subdata, idx) => {
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
          <span className="daily-data text-danger">
            <i className="fas fa-arrow-up fa-xs" />
            {row.deltaconfirmed}
          </span>
        ) : window.innerWidth <= 769 ? (
          <div>&nbsp;</div>
        ) : (
          ''
        )}
        {window.innerWidth <= 769 ? (
          <div>{cell}</div>
        ) : (
          <span>{'   ' + cell}</span>
        )}
      </span>
    );
  }

  function activeCF(cell, row) {
    return (
      <span>
        <span className="daily-data">&nbsp;</span>
        {window.innerWidth <= 769 ? <div> {cell}</div> : <span>{cell}</span>}
      </span>
    );
  }

  function recoveredCF(cell, row) {
    return (
      <span>
        {row.deltarecovered !== 0 ? (
          <span className="daily-data text-success">
            <i className="fas fa-arrow-up fa-xs" />
            {row.deltarecovered}
          </span>
        ) : window.innerWidth <= 769 ? (
          <div>&nbsp;</div>
        ) : (
          ''
        )}
        {window.innerWidth <= 769 ? (
          <div>{cell}</div>
        ) : (
          <span>{'   ' + cell}</span>
        )}
      </span>
    );
  }

  function deceasedCF(cell, row) {
    return (
      <span>
        {row.deltadeaths !== 0 ? (
          <span className="daily-data text-muted">
            <i className="fas fa-arrow-up fa-xs" />
            {row.deltadeaths}
          </span>
        ) : window.innerWidth <= 769 ? (
          <div>&nbsp;</div>
        ) : (
          ''
        )}
        {window.innerWidth <= 769 ? (
          <div>{cell}</div>
        ) : (
          <span>{'   ' + cell}</span>
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
        <span className="daily-data text-danger">
          <i className="fas fa-arrow-up fa-xs" />
          {total.deltaconfirmed}
        </span>
        {window.innerWidth <= 769 ? (
          <div> {total.confirmed}</div>
        ) : (
          <span>{'   ' + total.confirmed}</span>
        )}
      </span>
    );
  }

  function activeFF() {
    return (
      <span>
        {window.innerWidth <= 769 ? <div>&nbsp;</div> : ''}
        <span>{total.active}</span>
      </span>
    );
  }

  function recoveredFF() {
    return (
      <span>
        {total.deltarecovered !== 0 ? (
          <span className="daily-data text-success">
            <i className="fas fa-arrow-up fa-xs" />
            {total.deltarecovered}
          </span>
        ) : window.innerWidth <= 769 ? (
          <div>&nbsp;</div>
        ) : (
          ''
        )}
        {window.innerWidth <= 769 ? (
          <div> {total.recovered}</div>
        ) : (
          <span>{'   ' + total.recovered}</span>
        )}
      </span>
    );
  }

  function deceasedFF() {
    // return total.deaths;
    return (
      <span>
        <span className="daily-data text-muted">
          <i className="fas fa-arrow-up fa-xs" />
          {total.deltadeaths}
        </span>
        {window.innerWidth <= 769 ? (
          <div> {total.deaths}</div>
        ) : (
          <span>{' ' + total.deaths}</span>
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
