
import React from 'react';

import SimplePage from "../SimplePage";

import Account from '../model/Account';
import Session from '../model/Session';
import Submission from "../model/Submission";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";

import { Link, useParams } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';


export function DayTimetableComponent(props){
  let day = props.day;
  let variant = props.variant;

  if (!variant){
    variant = "primary";
  }

  if (day){
    let day_string = Session.getDayString(day);

    return (
      <Row key={day_string}>
        <Col style={{marginTop:"10px",
                     maxWidth: "768px",
                     marginLeft: "auto", marginRight: "auto"}}>
          <Card bg={variant} border={variant} text={variant}
                style={{borderRadius: "5px"}}>
            <Card.Header style={{textAlign: "center", fontSize: "larger",
                                 fontWeight: "bold"}}>
              {day_string}
            </Card.Header>
            <Card.Body style={{align_items:"center"}}>
              {props.children}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  } else {
    return null;
  }
}

export function SessionTimetableComponent(props){
  let session = props.session;

  let variant = props.variant;

  if (!variant){
    variant = "secondary";
  }

  if (session){
    let event_ids = session.getEventIDs();

    let events = [];

    for (let i in event_ids){
      let event = Submission.getSubmission(event_ids[i]);

      if (event){
        events.push(
          <li key={event.getID()}><Link to={event.getLink()}>{event.getFormat()}: {event.getTitle()}</Link></li>
        );
      }
    }

    if (events.length === 0){
      events.push(
        <ul key={session.getID()}>
          <li>More details about this event will be available soon!</li>
        </ul>
      )
    } else {
      events = (
        <ul key={session.getID()}>
          {events}
        </ul>
      );
    }

    return (
      <Card bg={variant} border={variant} text={variant}
            style={{borderRadius: "5px", marginBottom:"10px"}}>
        <Card.Header style={{textAlign: "center"}}>
          {session.getDurationString()} : <Link to={session.getLink()}>Session {session.getID()}</Link>
        </Card.Header>
        <Card.Body style={{align_items:"center"}}>
          <Card.Title style={{fontWeight: "bold"}}>{session.getTitle()}</Card.Title>
          {events}
        </Card.Body>
      </Card>
    );
  } else {
    return null;
  }
}


function is_same_day(d0, d1){
  return d0.getYear() === d1.getYear() &&
         d0.getMonth() === d1.getMonth() &&
         d0.getDate() === d1.getDate();
}


function day_not_in(day, days){
  day = new Date(day);

  for (let i in days){
    if (is_same_day(day, days[i])){
      return false;
    }
  }

  return true;
}


export function TimetableComponent(props){

  let days = Session.getConferenceDays();

  let day_views = [];

  let day_or_week = props.day_or_week;
  let view_days = null;

  let dw_text = null;

  if (day_or_week === "week1"){
    view_days = [new Date("2021-09-06"),
                 new Date("2021-09-07"),
                 new Date("2021-09-08"),
                 new Date("2021-09-09"),
                 new Date("2021-09-10")];
    dw_text = "Week 1";
  } else if (day_or_week === "week2"){
    view_days = [new Date("2021-09-13"),
                 new Date("2021-09-14"),
                 new Date("2021-09-15"),
                 new Date("2021-09-16"),
                 new Date("2021-09-17")];
    dw_text = "Week 2";
  } else if (day_or_week === "week3"){
    view_days = [new Date("2021-09-20"),
                 new Date("2021-09-21"),
                 new Date("2021-09-22"),
                 new Date("2021-09-23"),
                 new Date("2021-09-24")];
    dw_text = "Week 3";
  } else if (day_or_week === "week4"){
    view_days = [new Date("2021-09-27"),
                 new Date("2021-09-28"),
                 new Date("2021-09-29"),
                 new Date("2021-09-30")];
    dw_text = "Week 4";
  } else if (day_or_week === "today"){
    view_days = [Account.getNow()];
    dw_text = "Today";
  } else {
    dw_text = "Complete Program";
  }

  if (days){
    for (let i in days){

      if (view_days){
        if (day_not_in(days[i], view_days)){
          continue;
        }
      }

      let sessions = Session.getSessionsOnDay(days[i]);

      let session_parts = [];

      for (let j in sessions){
        let session = sessions[j];

        if (session){
          session_parts.push(
            <SessionTimetableComponent account={props.account}
                                      session={session}
                                      key={session.getID()} />
          );
        }
      }

      day_views.push(
        <DayTimetableComponent account={props.account}
                                  day={days[i]}
                                  key={i}>
          {session_parts}
        </DayTimetableComponent>
      )
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col style={{marginTop:"10px",
                     maxWidth: "768px",
                     marginLeft: "auto", marginRight: "auto"}}>
          <Dropdown>
            <Dropdown.Toggle variant="dark" border="warning" text="warning"
                             id="dropdown-basic"
                             style={{width: "100%"}}>
              {dw_text}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{width: "100%", textAlign: "center"}}>
              <LinkContainer to="/timetable/today">
                <Dropdown.Item href="#">Today</Dropdown.Item>
              </LinkContainer>
              <LinkContainer to="/timetable/week1">
                <Dropdown.Item href="#">Week 1</Dropdown.Item>
              </LinkContainer>
              <LinkContainer to="/timetable/week2">
                <Dropdown.Item href="#">Week 2</Dropdown.Item>
              </LinkContainer>
              <LinkContainer to="/timetable/week3">
                <Dropdown.Item href="#">Week 3</Dropdown.Item>
              </LinkContainer>
              <LinkContainer to="/timetable/week4">
                <Dropdown.Item href="#">Week 4</Dropdown.Item>
              </LinkContainer>
              <LinkContainer to="/timetable/all">
                <Dropdown.Item href="#">Complete program</Dropdown.Item>
              </LinkContainer>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      {day_views}
    </Container>
  );
}

export function Timetable(props){

  let [account, setAccount] = React.useState(Account.get_account());

  React.useEffect(() => {
    setAccount(Account.get_account());
  }, [account]);

  let params = useParams();

  let day_or_week = params.day_or_week;

  return (
    <SimplePage account={account} setAccount={setAccount}>
      <TimetableComponent account={account}
                          setAccount={setAccount}
                          day_or_week={day_or_week} />
    </SimplePage>
  );
}
