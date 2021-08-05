
import React from 'react';

import SimplePage from "./SimplePage";

import Account from './model/Account';

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


function Home(props){

  let [account, setAccount] = React.useState(Account.get_account());

  React.useEffect(() => {
    setAccount(Account.get_account());
  }, [account]);

  let admin_links = null;

  if (account && account.isAdmin()){
    admin_links = (
      <Row>
        <Col style={{marginTop:"10px",
                     maxWidth: "768px",
                     marginLeft: "auto", marginRight: "auto"}}>
          <ButtonGroup vertical style={{width: "100%"}}>
            <Button onClick={() => props.history.push("/interstitial")}
                    variant="danger"
                    style={{borderRadius: "5px", marginTop: "5px"}}>
              Conference interstitial page
            </Button>
            <Button onClick={() => props.history.push("/generate")}
                    variant="danger"
                    style={{borderRadius: "5px", marginTop: "5px"}}>
              Generate tickets.json file
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    );
  }

  return (
    <SimplePage account={account} setAccount={setAccount}>
      <Container fluid>
        <Row>
          <Col>
            <h1 style={{textAlign: "center"}}>SeptembRSE</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 style={{textAlign: "center"}}>Conference Information System</h2>
          </Col>
        </Row>
        <Row>
          <Col style={{marginTop:"10px",
                       maxWidth: "768px",
                       marginLeft: "auto", marginRight: "auto"}}>
            <ButtonGroup vertical style={{width: "100%"}}>
              <Button onClick={() => props.history.push("/venue")}
                      variant="primary"
                      style={{borderRadius: "5px", marginTop: "5px"}}>
                Conference venue guide (gather.town)
              </Button>
              <Button onClick={() => props.history.push("/today")}
                      variant="secondary"
                      style={{borderRadius: "5px", marginTop: "5px"}}>
                What's happening today?
              </Button>
              <Button onClick={() => props.history.push("/timetable")}
                      variant="info"
                      style={{borderRadius: "5px", marginTop: "5px"}}>
                View the conference timetable
              </Button>
              <Button onClick={() => props.history.push("/search")}
                      variant="secondary"
                      style={{borderRadius: "5px", marginTop: "5px"}}>
                Search for a presentation or event
              </Button>
              <Button onClick={() => props.history.push("/ticket")}
                      variant="info"
                      style={{borderRadius: "5px", marginTop: "5px"}}>
                View your conference ticket
              </Button>
              <Button href="https://septembrse.society-rse.org"
                      variant="primary"
                      style={{borderRadius: "5px", marginTop: "5px"}}>
                Go to the conference website
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        {admin_links}
      </Container>
    </SimplePage>
  );
};

export default Home;
