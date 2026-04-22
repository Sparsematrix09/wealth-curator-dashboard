import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-8" role="status" aria-label="Loading content">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;