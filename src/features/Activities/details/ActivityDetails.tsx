import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import Loading from "../../../app/layout/Loading";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";

const ActivityDetails = () => {
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    loadingInitial,
    loadActivity,
  } = activityStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      loadActivity(id);
    }
  }, [loadActivity, id]);

  if (!activity || loadingInitial) return <Loading />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailsHeader activity={activity} />
        <ActivityDetailsInfo activity={activity} />
        <ActivityDetailsChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailsSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
