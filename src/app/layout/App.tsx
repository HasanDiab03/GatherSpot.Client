import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import Home from "../../features/home/Home";
import { ToastContainer } from "react-toastify";

const App = () => {
  const location = useLocation();
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      {location.pathname === "/" ? (
        <Home />
      ) : (
        <>
          <Navbar />
          <Container style={{ marginTop: "7em" }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
};

export default observer(App);
