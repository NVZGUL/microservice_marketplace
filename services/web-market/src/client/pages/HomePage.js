import React from 'react';
import { Helmet } from 'react-helmet';

const Head = () => {
  return (
    <Helmet>
      <title>Welcome</title>
      <meta property="og:title" content="Users App" />
    </Helmet>
  );
}

const Home = () => {
  return (
    <div>
      <Head />
      <div className="center-align" style={{ marginTop: '200px' }}>
        <h3>Welcome</h3>
      </div>
    </div>
  );
};

export default {
  component: Home
};
