import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Fundlify from './components/primary/Fundlify';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDMZPu49GqRfiQhplxSr9aLKvyDq0uz5mA",
  authDomain: "fundlify-4417f.firebaseapp.com",
  projectId: "fundlify-4417f",
  storageBucket: "fundlify-4417f.appspot.com",
  messagingSenderId: "940995844194",
  appId: "1:940995844194:web:5ebf42cdbf006af9c8d93b",
  measurementId: "G-CZ76LDCWXS",
  storageBucket: "gs://fundlify-4417f.appspot.com"
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Fundlify app={app} />
  </React.StrictMode>
);
