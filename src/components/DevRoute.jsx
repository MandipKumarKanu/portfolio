import React from 'react';

const DevRoute = ({ children }) => {
  if (!import.meta.env.DEV) {
    return (
      <div style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        color: 'var(--font-color)',
        background: 'var(--primary-color)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--secondary-color)' }}>
          404
        </h1>
        <h2 style={{ marginBottom: '1rem' }}>
          Page Not Found
        </h2>
        <p style={{ color: 'var(--grey-color)', maxWidth: '500px', lineHeight: '1.5' }}>
          The page you're looking for is only available in development mode. 
          This helps keep administrative features secure in production.
        </p>
        <a 
          href="/" 
          style={{
            marginTop: '2rem',
            padding: '12px 24px',
            background: 'var(--secondary-color)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            transition: 'background 0.3s ease'
          }}
        >
          Go Home
        </a>
      </div>
    );
  }

  return children;
};

export default DevRoute;
