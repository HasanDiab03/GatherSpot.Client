import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/Activities/dashboard/ActivityDashboard";
import Loading from "./Loading";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";

const App = () => {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivites();
  }, [activityStore]);

  if (activityStore.loadingInitial) {
    return <Loading content="Loading app" />;
  }

  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </>
  );
};

export default observer(App);
