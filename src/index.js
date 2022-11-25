import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
const oauthClientId = process.env.REACT_APP_OAUTH_CLIENT_ID

root.render(
  <React.StrictMode>
    <Router>
      <GoogleOAuthProvider clientId={oauthClientId}>
        <App />
      </GoogleOAuthProvider>
    </Router>
  </React.StrictMode>
)
