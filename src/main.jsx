import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import axios from 'axios';

import App from './app';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL
 
axios.interceptors.request.use( (config) => {
  config.headers['X-ApiKey'] = import.meta.env.VITE_APP_API_KEY;
  return config;
});

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
        <App />
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
