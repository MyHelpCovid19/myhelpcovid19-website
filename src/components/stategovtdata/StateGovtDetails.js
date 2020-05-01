import React, { useState, useEffect } from 'react';
import map from 'lodash';

import gplay_icon from '../../assets/images/gplay_icon.png';
import app_store_icon from '../../assets/images/app_store_icon.png';

import { format, parse } from 'date-fns';

import './StateGovtDetails.scss';

const StateGovtDetails = (props) => {
  const [details, setDetails] = useState('');
  const [testData, setTestData] = useState([]);

  useEffect(() => {
    setDetails(props.details);
    setTestData(props.testData);
  }, [props.details, props.testData]);

  return (
    <div className="covid-table-helpline">
      <div className="text-primary mb-2">
        <div>{details.state} Helpline Number for corona-virus</div>

        <h3>{details.stateHelpline}</h3>
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
                <img src={gplay_icon} alt="Aarogya Setu on Play Store" />
              </a>
            </span>

            <span className="app-btn-right ml-1">
              <a
                href="https://apps.apple.com/in/app/aarogyasetu/id1505825357 "
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={app_store_icon} alt="Aarogya Setu on App Store" />
              </a>
            </span>
          </div>{' '}
        </small>
      </div>

      <div>
        <h3 className="text-muted">Government Links for Covid-19</h3>{' '}
        <span className="text-muted">
          <small>NOTE: Details will be updated regularly</small>
        </span>
      </div>

      <div className="card w-100">
        <div className="card-body">
          <h6>Covid-19 Websites</h6>
          <small>
            {map.map(details.websites, (item, idx) => {
              return (
                <span key={idx + 1}>
                  <a
                    href={item}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-link"
                  >
                    Link{idx + 1} &nbsp; &nbsp;
                  </a>
                </span>
              );
            })}
          </small>

          <h6 className="mt-4">Health Bulletin</h6>
          <small>
            {map.map(details.healthBulletin, (item, idx) => {
              return (
                <span key={idx + 1}>
                  <a
                    href={item}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-link"
                  >
                    Link{idx + 1} &nbsp; &nbsp;
                  </a>
                </span>
              );
            })}
          </small>

          <h6 className="mt-4">Covid-19 Relief Fund</h6>
          <small>
            {map.map(details.covid19ReliefFund, (item, idx) => {
              return (
                <span key={idx + 1}>
                  <a
                    href={item}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-link"
                  >
                    Link{idx + 1} &nbsp; &nbsp;
                  </a>
                </span>
              );
            })}
          </small>

          <h6 className="mt-4">E Pass Registration</h6>
          <small>
            {map.map(details.ePassRegistration, (item, idx) => {
              return (
                <span key={idx + 1}>
                  <a
                    href={item}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-link"
                  >
                    Link{idx + 1} &nbsp; &nbsp;
                  </a>
                </span>
              );
            })}
          </small>

          <h6 className="mt-4">Volunteers Registration</h6>
          <small>
            {map.map(details.volunteersRegistration, (item, idx) => {
              return (
                <span key={idx + 1}>
                  <a
                    href={item}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-link"
                  >
                    Link{idx + 1} &nbsp; &nbsp;
                  </a>
                </span>
              );
            })}
          </small>
        </div>
      </div>

      {testData.length > 0 ? (
        <div className="card w-100">
          <div className="card-body">
            <h6>Test Details</h6>
            <small>
              Total Tested: &nbsp;
              <span className="text-info">
                <h5>{testData[testData.length - 1].totaltested}</h5>
              </span>
              <div>
                {console.log(testData[testData.length - 1].updatedon)}
                <span>
                  {!isNaN(
                    parse(
                      testData[testData.length - 1].updatedon,
                      'dd/MM/yyyy',
                      new Date()
                    )
                  )
                    ? `Last updated on ${format(
                        parse(
                          testData[testData.length - 1].updatedon,
                          'dd/MM/yyyy',
                          new Date()
                        ),
                        'dd MMM yyyy'
                      )}`
                    : ''}
                  <div>
                    according to{' '}
                    <a
                      href={testData[testData.length - 1].source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-link"
                    >
                      Source
                    </a>
                  </div>
                </span>
              </div>
            </small>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default StateGovtDetails;
