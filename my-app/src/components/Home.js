import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import { Header } from "./Header";
import StaffPage from "./StaffPage";
import { Redirect } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const login = () =>
    oktaAuth.signInWithRedirect({ originalUri: "/StaffPage" });

  if (!authState) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else if (!authState.isAuthenticated) {
    return (
      <div>
        <Header></Header>
        <div className="loginbg">
          <button onClick={login} className="loginbutton">
            Login
          </button>
        </div>
      </div>
    );
  } else {
    return <Redirect to="/StaffPage" />;
  }
};
export default Home;
