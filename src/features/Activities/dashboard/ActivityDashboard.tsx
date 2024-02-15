import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import Loading from "../../../app/layout/Loading";
import ActivityFilters from "./ActivityFilters";

const ActivityDashboard = () => {
  const { activityStore } = useStore();
  const { loadActivites, loadingInitial, activityRegistry } = activityStore;

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivites();
  }, [loadActivites, activityRegistry.size]);

  if (loadingInitial) return <Loading content="Loading App..." />;

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
