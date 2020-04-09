import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

import * as FirestoreService from '../../services/firebase';

import './TableCovid19Helpline.scss';

const TableCovid19Helpline = (props) => {
  const [helplines, setHelplines] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    FirestoreService.getHelplineList()
      .then((doc) => {
        if (doc.exists) {
          let helplineData = [];
          let idx = 1;
          Object.entries(doc.data().numbers).forEach(([key, value]) => {
            helplineData.push({ id: idx, name: key, data: value });
            idx = idx + 1;
          });

          setHelplines(helplineData);
        }
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const columns = [
    {
      dataField: 'id',
      text: '#',
      footer: '',
    },
    {
      dataField: 'name',
      text: 'State/UT',
      footer: '',
      footerFormatter: nameFF,
    },
    {
      dataField: 'data',
      text: 'Helpline Numbers',
      footer: '',
      footerFormatter: helplineFF,
    },
  ];

  function helplineFF() {
    return (
      <a
        href="https://www.mohfw.gov.in/pdf/coronvavirushelplinenumber.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        Click Here
      </a>
    );
  }

  function nameFF() {
    return <small>Download PDF of Helplines</small>;
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

  const defaultSorted = [
    {
      dataField: 'name',
      order: 'desc',
    },
  ];

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

      <div className="table-responsive">
        <small>
          <ToolkitProvider
            keyField="name"
            data={helplines}
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
                  defaultSorted={defaultSorted}
                />
              </div>
            )}
          </ToolkitProvider>
        </small>
      </div>
    </div>
  );
};

export default TableCovid19Helpline;
