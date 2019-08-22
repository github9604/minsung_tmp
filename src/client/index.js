import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../client/reducers';
import thunk from 'redux-thunk';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';

import {AllDirectory, SampleFeed, SideBar, Login, Register, MainPage, App, SearchPage, MyFeed, MyDirectory, UserDirectory, GroupDirectory } from '../client/containers';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route exact path="/" component={() => <Redirect to="/login" />} />
      <Route path="/" component={App} />
      <Route path="/sidebar" component={SideBar} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/MainPage" component={MainPage} />
      <Route path="/SearchPage" component={SearchPage} />
      {/* <Route path="/MyDirectory/:dir_name" component={MyDirectory} /> */}
      <Route path="/AllDirectory" component={AllDirectory} />
      <Route path="/UserDirectory/:dir_name" component={UserDirectory} />
      <Route exact path="/UserDirectory" component={UserDirectory} />
      <Route exact path="/MyDirectory/:dir_name" component={MyDirectory} />
      <Route exact path="/MyDirectory" component={MyDirectory} />
      <Route exact path="/GroupDirectory" component={GroupDirectory} />
      <Route path="/GroupDirectory/:dir_name" component={GroupDirectory} />
      {/* <Switch>
        <Route path="/MyFeed/:name" component={MyFeed} /> */}
      <Route path="/MyFeed" component={MyFeed} />
      <Route path="/SampleFeed" component={SampleFeed} />
      {/* </Switch> */}
    </Router>
  </Provider>,
  document.getElementById('root')
);

module.hot.accept();
