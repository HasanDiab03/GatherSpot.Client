import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import Home from "../../features/home/Home";

const App = () => {
  const location = useLocation();
  return location.pathname === "/" ? (
    <Home />
  ) : (
    <>
      <Navbar />
      <Container style={{ marginTop: "7em" }}>
        <Outlet />
      </Container>
    </>
  );
};

export default observer(App);
