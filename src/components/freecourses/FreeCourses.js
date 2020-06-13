import React, { lazy, Suspense } from 'react';

const FromUdemy = lazy(() => import('./FromUdemy'));
const Covid19EssentialBar = lazy(() =>
  import('../essentials/Covid19EssentialBar')
);

const FreeCourses = () => {
  return (
    <div className="mt-3">
      <Suspense fallback={<div>Loading...</div>}>
        <Covid19EssentialBar />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <FromUdemy />
      </Suspense>
    </div>
  );
};

export default FreeCourses;
