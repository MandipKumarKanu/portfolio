import React from 'react';

const DevOnly = ({ children, fallback = null }) => {
  if (import.meta.env.DEV) {
    return children;
  }
  
  return fallback;
};

export default DevOnly;
