import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { MantineProvider } from '@mantine/core';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NotificationsProvider } from '@mantine/notifications';
import './index.css';
import Welcome from './components/welcome';
import { socket, WebsocketProvider } from './contexts/webSocketContext';
import HackSaw from './pages/hacksaw';
import Pragmatic from './pages/pragmatic';

const token = localStorage.getItem('token');

const httpLink = createHttpLink({
  uri: process.env.api
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      'content-type': 'application/json',
      'x-access-token': token,
      'authorization': `Bearer ${token}`
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
        <NotificationsProvider>
          <WebsocketProvider value={socket}>
            <BrowserRouter>
              <Routes>
                <Route path={'/*'} element={<App component={<Welcome />} />} />
                <Route path={'/hacksaw/:tab'} element={<App component={<HackSaw />} />} />
                <Route path={'/pragmatic/:tab'} element={<App component={<Pragmatic />} />} />
              </Routes>
            </BrowserRouter>
          </WebsocketProvider>
        </NotificationsProvider>
      </MantineProvider>
    </Provider>
  </React.StrictMode>
)
