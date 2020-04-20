import React from 'react';

import AdSense from '../ads/index';
import './FreeCourses.scss';

const FromOthers = () => {
  return (
    <div className="course-list">
      {/* TODO: Add slot ID as well*/}
      <AdSense.Google
        client={process.env.REACT_APP_GOOGLE_ADSENSE_DATA_AD_CLIENT}
        slot="Ad slot Id"
        style={{ display: 'block' }}
        format="auto"
        responsive="true"
      />

      <small>From Others</small>
    </div>
  );
};

export default FromOthers;
