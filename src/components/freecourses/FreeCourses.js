import React, { lazy, Suspense } from 'react';

const FromUdemy = lazy(() => import('./FromUdemy'));

const FreeCourses = () => {
  return (
    <div className="mt-3">
      <Suspense fallback={<div>Loading...</div>}>
        <FromUdemy />
      </Suspense>
    </div>
  );
};

export default FreeCourses;
