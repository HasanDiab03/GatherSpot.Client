import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Image,
  Button,
} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import Loading from "../../../app/layout/Loading";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

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
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <CardContent>
        <CardHeader>{activity.title}</CardHeader>
        <CardMeta>
          <span>{activity.date}</span>
        </CardMeta>
        <CardDescription>{activity.description}</CardDescription>
      </CardContent>
      <CardContent extra>
        <Button.Group widths="2">
          <Button
            basic
            color="blue"
            content="Edit"
            as={Link}
            to={`/manage/${id} `}
          />
          <Button
            basic
            color="grey"
            content="cancel"
            as={Link}
            to="/activities"
          />
        </Button.Group>
      </CardContent>
    </Card>
  );
};

export default observer(ActivityDetails);
