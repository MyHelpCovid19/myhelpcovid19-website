import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import './StateGovtDetails.scss';

const StateGovtDetails = (props) => {
  const [details, setDetails] = useState('');

  useEffect(() => {
    setDetails(props.details);
  }, [props.details]);

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
            {_.map(details.websites, (item, idx) => {
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
            {_.map(details.healthBulletin, (item, idx) => {
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
            {_.map(details.covid19ReliefFund, (item, idx) => {
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
            {_.map(details.ePassRegistration, (item, idx) => {
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
            {_.map(details.volunteersRegistration, (item, idx) => {
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
    </div>
  );
};

export default StateGovtDetails;
