
import React from 'react';

import Submission from "../model/Submission";
import SimplePage from "../SimplePage";

import Account from '../model/Account';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from "react-bootstrap/ButtonGroup";

import ReactMarkdown from 'react-markdown'

import { Link } from 'react-router-dom';

import styles from "./Search.module.css";

const gfm = require('remark-gfm');

export function SearchComponent(props){

  let text = props.text;

  const [search_text, setSearchText] = React.useState(text);

  const search_bar = (
    <Row>
      <Col style={{marginTop:"10px",
                   maxWidth: "768px",
                   marginLeft: "auto", marginRight: "auto"}}>
        <input key="input" className={styles.searchBar} type="search"
               onChange={(e) => setSearchText(e.target.value)}
               placeholder="Search..." />
      </Col>
    </Row>
  );

  const divider = (
    <Row><Col>&nbsp;</Col></Row>
  );

  const view_all = (
    <Row>
      <Col style={{marginTop:"10px",
                   maxWidth: "768px",
                   marginLeft: "auto", marginRight: "auto"}}>
        <ButtonGroup vertical style={{width: "100%"}}>
          <Button variant="primary"
                  style={{borderRadius: "5px",
                          marginTop: "5px"}}
                  onClick={() => setSearchText("all")}>
            View all submissions
          </Button>
          <Button variant="secondary"
                  style={{borderRadius: "5px",
                  marginTop: "5px"}}
                  onClick={() => setSearchText("talks")}>
            View all talks
          </Button>
          <Button variant="primary"
                  style={{borderRadius: "5px",
                          marginTop: "5px"}}
                  onClick={() => setSearchText("walkthroughs")}>
            View all walkthroughs
          </Button>
          <Button variant="secondary"
                  style={{borderRadius: "5px",
                          marginTop: "5px"}}
                  onClick={() => setSearchText("posters")}>
            View all posters
          </Button>
          <Button variant="primary"
                  style={{borderRadius: "5px",
                          marginTop: "5px"}}
                  onClick={() => setSearchText("workshops")}>
            View all workshops
          </Button>
          <Button variant="secondary"
                  style={{borderRadius: "5px",
                          marginTop: "5px"}}
                  onClick={() => setSearchText("panels")}>
            View all panels
          </Button>
          <Button variant="primary"
                  style={{borderRadius: "5px",
                          marginTop: "5px"}}
                  onClick={() => setSearchText("discussions")}>
            View all discussions
          </Button>
          <Button variant="secondary"
                  style={{borderRadius: "5px",
                          marginTop: "5px"}}
                  onClick={() => setSearchText("keynotes")}>
            View all keynotes
          </Button>
          <Button variant="primary"
                  style={{borderRadius: "5px",
                          marginTop: "5px"}}
                  onClick={() => setSearchText("specials")}>
            View all Special events
          </Button>
          <Button variant="danger"
                  style={{borderRadius: "5px",
                          marginTop: "5px"}}
                  onClick={() => setSearchText(null)}>
            Clear
          </Button>
        </ButtonGroup>
      </Col>
    </Row>
  );

  if (search_text === "" || !search_text){
    return (
      <Container fluid>
        <h1 style={{textAlign: "center"}}>Search for an event</h1>
        {search_bar}
        {divider}
        {view_all}
      </Container>
    );
  }

  let results = Submission.search(search_text);

  if (results.length === 0){
    return (
      <Container fluid>
        <h1 style={{textAlign: "center"}}>Search for an event</h1>
        {search_bar}
        <Row>
          <Col style={{marginTop:"10px",
                       maxWidth: "768px",
                       marginLeft: "auto", marginRight: "auto"}}>
            <div className={styles.message}>
              No match.
            </div>
          </Col>
        </Row>
        {divider}
        {view_all}
      </Container>
    );
  }

  let formatted_results = [];

  let i = 0;

  for (let result in results){
    let r = results[result];

    let variant = "primary";

    if (i % 2 === 1){
      variant = "secondary";
    }

    i += 1;

    formatted_results.push(
      <Row key={r.getID()}>
        <Col style={{marginTop:"10px",
                     maxWidth: "768px",
                     marginLeft: "auto", marginRight: "auto"}}>
          <Card className="text-center"
                bg={variant}
                key={r.getID()}
                style={{borderRadius: "5px"}}>
            <Card.Header style={{color: "rgb(220,220,220)",
                         fontWeight: "bold"}}>
              <Link to={r.getLink()}>{r.getFormat()}: {r.getID()}</Link>
            </Card.Header>
            <Card.Body>
              <Card.Title style={{fontSize: "large"}}>
                {r.getTitle()}
              </Card.Title>
              <Card.Title style={{fontSize: "medium", fontWeight: "bold"}}>
                {r.getName()}
              </Card.Title>
              <Card.Title style={{fontSize: "medium", fontStyle: "italic"}}>
                {r.getInstitution()}
              </Card.Title>
              <div className={styles.markdown}>
                  <ReactMarkdown remarkPlugins={[gfm]}
                                children={r.getAbstract()} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }

  return (
    <Container fluid>
      <Row>
        <Col style={{marginTop:"10px",
                     maxWidth: "768px",
                     marginLeft: "auto", marginRight: "auto"}}>
          <h1 style={{textAlign: "center"}}>Search for an event</h1>
        </Col>
      </Row>

      {search_bar}
      {formatted_results}
      {divider}
      {view_all}
      {divider}
    </Container>
  );
}

export function Search(props){

  let [account, setAccount] = React.useState(Account.get_account());

  React.useEffect(() => {
    setAccount(Account.get_account());
  }, [account]);

  return (
    <SimplePage {...props} account={account} setAccount={setAccount}>
      <SearchComponent />
    </SimplePage>
  );
}
