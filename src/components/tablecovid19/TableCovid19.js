import React, { useState, useEffect } from 'react';
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
          deltaconfirmed: parseInt(subdata.deltaconfirmed),
          confirmed: parseInt(subdata.confirmed),
          active: parseInt(subdata.active),
          recovered: parseInt(subdata.recovered),
          deaths: parseInt(subdata.deaths),
        });
      } else {
        setTotal({
          state: subdata.state,
          deltaconfirmed: parseInt(subdata.deltaconfirmed),
          confirmed: parseInt(subdata.confirmed),
          active: parseInt(subdata.active),
          recovered: parseInt(subdata.recovered),
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
      footer: '',
      footerFormatter: stateFF,
    },
    {
      dataField: 'deltaconfirmed',
      text: 'New',
      sort: true,
      headerFormatter: newHF,
      footer: '',
      footerFormatter: newFF,
      formatter: newDF,
    },
    {
      dataField: 'confirmed',
      text: 'Confirmed',
      sort: true,
      headerFormatter: confirmedHF,
      footer: '',
      footerFormatter: confirmedFF,
    },
    {
      dataField: 'active',
      text: 'Active',
      sort: true,
      headerFormatter: activeHF,
      footer: '',
      footerFormatter: activeFF,
    },
    {
      dataField: 'recovered',
      text: 'Recovered',
      sort: true,
      headerFormatter: recoveredHF,
      footer: '',
      footerFormatter: recoveredFF,
    },
    {
      dataField: 'deaths',
      text: 'Deceased',
      sort: true,
      headerFormatter: deceasedHF,
      footer: '',
      footerFormatter: deceasedFF,
    },
  ];

  function idHidden() {
    return window.innerWidth <= 769 ? true : false;
  }

  function newDF(cell) {
    if (cell > 0) return <span className="text-danger">{cell}</span>;

    return cell;
  }

  function stateFF() {
    return total.state;
  }

  function newFF() {
    return <span className="text-danger">{total.deltaconfirmed}</span>;
  }

  function confirmedFF() {
    return total.confirmed;
  }

  function activeFF() {
    return total.active;
  }

  function recoveredFF() {
    return total.recovered;
  }

  function deceasedFF() {
    return total.deaths;
  }

  function newHF() {
    return (
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
    );
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
