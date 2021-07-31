
import React from "react";

import SimplePage from "../SimplePage";

import Account from '../model/Account';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export function LogoutComponent(props) {

  let [account, setAccount] = React.useState(null);

  React.useEffect(() => {
      console.log("useEffect");
      setAccount(Account.get_account());
  }, [account]);

  function logout(){
    if (account && account.isLoggedIn()){
      account.logout();
      setAccount(null);
    }
  }

  if (account && account.isLoggedIn()){
    return (
      <Card style={{width: "80%", margin: "10px"}}>
        <Card.Body>
          <div style={{width: "100%",
                       textAlign: "center",
                       marginBottom: "10px"}}>
            Are you sure you want to log out?
          </div>
          <Button
            style={{width: "100%"}}
            onClick={() => logout()}>
              Yes - log out!
          </Button>
        </Card.Body>
      </Card>
    );
  } else {
    return (
      <Card style={{width: "80%", margin: "10px"}}>
        <Card.Body>
          <div style={{width: "100%",
                       textAlign: "center",
                       marginBottom: "10px"}}>
            You are now logged out.
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export function Logout(props){
  return (
    <SimplePage>
      <LogoutComponent />
    </SimplePage>
  );
}
