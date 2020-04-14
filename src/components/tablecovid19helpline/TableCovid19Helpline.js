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
      <div className="text-primary mb-2">
        <div>Central Helpline Number for corona-virus</div>

        <h3>+91-11-23978046, 1075</h3>
      </div>

      <div className="mb-2 clearfix">
        <small>
          <div className="text-success mb-1">
            Download Aarogya Setu App by Government of India
          </div>

          <div>
            <span className="app-btn-left">
              <a
                href="https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://www.mygov.in/sites/all/themes/mygov/images/gplay_icon.png"
                  alt="Aarogya Setu on Play Store"
                  width="100%"
                />
              </a>
            </span>

            <span className="app-btn-right">
              <a
                href="https://apps.apple.com/in/app/aarogyasetu/id1505825357 "
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://www.mygov.in/sites/all/themes/mygov/images/app_store_icon.png"
                  alt="Aarogya Setu on App Store"
                />
              </a>
            </span>
          </div>
        </small>
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
