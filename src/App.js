import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import {
  Redirect, Route, BrowserRouter as Router, Switch,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { CssBaseline } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import ko from 'dayjs/locale/ko';
import { StylesProvider, ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { Layout, PrivateRoute, PublicRoute } from './components/base';
import { Loader } from './components/common';
import {
  Home, Location, NotFound, Profile, Reserve, SignIn, ReservationDetails,
} from './pages';
import configureStore from './store';
import { GlobalStyle, theme } from './styles';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DayjsUtils} locale={ko}>
          <StylesProvider injectFirst>
            <GlobalStyle />
            <CssBaseline />
            <Router>
              <Suspense fallback={<Loader />}>
                <Switch>
                  <Route exact path={['/', '/location', '/profile', '/reserve', '/reservation-details']}>
                    <Layout>
                      <Switch>
                        <PrivateRoute exact path="/" component={Home} />
                        <PrivateRoute exact path="/location" component={Location} />
                        <PrivateRoute exact path="/profile" component={Profile} />
                        <PrivateRoute exact path="/reserve" component={Reserve} />
                        <PrivateRoute exact path="/reservation-details" component={ReservationDetails} />
                        <Redirect to="/not-found" />
                      </Switch>
                    </Layout>
                  </Route>
                  <PublicRoute exact path="/sign-in" component={SignIn} />
                  <Route exact path="/not-found" component={NotFound} />
                  <Redirect to="/not-found" />
                </Switch>
              </Suspense>
            </Router>
          </StylesProvider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </ThemeProvider>
  </Provider>
);

export default App;
