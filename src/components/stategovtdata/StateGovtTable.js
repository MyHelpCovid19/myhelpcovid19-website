import React, { useState, useEffect } from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import map from 'lodash/map';
import get from 'lodash/get';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

import './StateGovtTable.scss';

const StateGovtTable = (props) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState('');
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (fetched === false) {
      let totalFields = props.total;
      totalFields['helplinesource'] = props.helplinesource;
      setTotal(props.total);

      let districts = [];
      map(props.subdata, (district) => {
        const helpline = get(props.helplines, district.district);
        district['helpline'] = helpline !== undefined ? helpline : '';
        districts = [...districts, district];
      });

      setData(districts);

      setFetched(true);
    }
  }, [
    fetched,
    props.subdata,
    props.total,
    props.helplines,
    props.helplinesource,
  ]);

  const columns = [
    {
      dataField: 'id',
      text: '#',
      sort: true,
      footer: '',
      hidden: idHidden(),
    },
    {
      dataField: 'district',
      text: 'District',
      sort: true,
      footer: 'Total',
    },
    {
      dataField: 'confirmed',
      text: 'Confirmed',
      sort: true,
      headerFormatter: confirmedHF,
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
    {
      dataField: 'helpline',
      text: 'Helpline',
      headerFormatter: helplineHF,
      headerAlign: 'left',
      align: 'right',
      footer: '',
      footerAlign: 'right',
      footerFormatter: helplineFF,
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

  function helplineHF() {
    return (
      <abbr
        className={`${window.innerWidth <= 769 ? 'text-danger' : ''}`}
        title="Helpline"
      >
        {window.innerWidth <= 769
          ? window.innerWidth <= 375
            ? 'Help'
            : 'Help'
          : 'Helpline'}
      </abbr>
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

  function helplineFF() {
    return (
      <a href={total.helplinesource} target="_blank" rel="noopener noreferrer">
        {total.helplinesource !== '' ? 'Helplines Source' : ''}
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

  return (
    <div className="table-responsive">
      <small>
        <ToolkitProvider keyField="id" data={data} columns={columns} search>
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

export default StateGovtTable;
