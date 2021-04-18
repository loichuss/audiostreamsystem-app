import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useParams,
  NavLink
} from "react-router-dom";
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faBroadcastTower, faHdd } from '@fortawesome/free-solid-svg-icons';

import 'bulma/css/bulma.min.css';
import './App.css';

//country: "pl"
//description: "AAC"
//id: 1
//name: "Nowy Świat"
//path: "https://de1.api.radio-browser.info/pls/url/429ed05b-6dae-4027-a9be-7fda436a89fe"
//type: "stream"`;

function StreamItem(props) {
  const {id, country, description, name, path, type} = props.data;

  return (
    <div className="card card__stream">
      <div className="card-content">
        <p className="title is-4">
        
          { name }
        </p>
        <p className="subtitle">
          { description }
        </p>
      </div>
      <footer className="card-footer">
        <span>{ country }</span>
        <span>{ type }</span>
  </footer>
    </div>
  );
}

function StreamItems(props) {
  const { data } = props;
  const arr = _.map(
    _.groupBy(data, 'country'), (elts, key) => {
      const list = _.map(elts, (elt) => <StreamItem key={ elt.id } data={ elt }/>);
      return (
        <section className="section section_stream" key={ key }>
          <h1 class="title">{ _.capitalize(key) }</h1>
          <hr />
          <div className="body__items">
            { list }
          </div>
        </section>
      );
    }
  );
  return (<>{ arr }</>);
}

function Stream() {
  const [Items, setItems] = useState(null);

  useEffect(() => {
    const url = "http://127.0.0.1:8000/ass-service/v1/items";

    /*const options = {
      headers: {
        Authorization: "Bearer "
      }
    };*/
    fetch(url)
    .then(res => res.json())
    .then(items => setItems(items));
  }, []);

  if (Items === null)
    return <progress className="progress is-medium is-dark" max="100"></progress>;

  return <StreamItems data={ Items } />;
}

function File() {
  return (<div>file</div>)
}

/********
  Layout
*********/
function Head(props) {
  return (
    <nav className="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item">
          Audio Streaming System
        </a>

        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
        <NavLink exact={true} className="navbar-item" activeClassName='is-active' to='/stream'>
          <FontAwesomeIcon icon={faBroadcastTower} /> Stream
        </NavLink>
        <NavLink exact={true} className="navbar-item" activeClassName='is-active' to='/storage'>
          <FontAwesomeIcon icon={faHdd} /> Storage
        </NavLink>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary">
                <strong>Add</strong>
              </a>
              <a className="button is-light">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Body() {
  return (
    <Switch>
      <Route path="/stream">
        <Stream />
      </Route>
      <Route path="/storage">
        <File />
      </Route>
      <Route path="/">
        <div />
      </Route>
    </Switch>
  );
}

function Foot(props) {
  return (
    <nav className="navbar is-black is-fixed-bottom" role="navigation" aria-label="main navigation">
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">

        <button exact={true} className="navbar-item">
          <FontAwesomeIcon icon={faPlay} /> 
        </button>


        </div>
      </div>
    </nav>
  );
}

function Main() {
  return (
    <>
      <Head />
      <Body />
      <Foot />
    </>
  );
}

function App() {
  return (
    <Router>
      <Main />
    </Router>);
}

export default App;