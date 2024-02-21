import { Button, Header, Segment } from "semantic-ui-react";
import { ActivityFormValues } from "../../../app/models/activity";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../../app/layout/Loading";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";

const ActivityForm = () => {
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loadActivity, loadingInitial } =
    activityStore;
  const [activity, setActivity] = useState<ActivityFormValues>(
    new ActivityFormValues()
  );

  const { id } = useParams();
  const navigate = useNavigate();

  const validaitionSchema = Yup.object({
    title: Yup.string().required("The activity title is required"),
    description: Yup.string().required("The activity description is required"),
    category: Yup.string().required(),
    date: Yup.string().required("date is required"),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  });
  useEffect(() => {
    if (id)
      loadActivity(id).then((act) => setActivity(new ActivityFormValues(act)));
  }, [id, loadActivity]);

  const handleFormSubmit = (activity: ActivityFormValues) => {
    if (!activity.id) {
      activity.id = uuid();
      createActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    }
  };

  if (loadingInitial) {
    return <Loading content="Loading Activity..." />;
  }
  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik
        validationSchema={validaitionSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="title" placeholder="Title" />
            <MyTextArea rows={3} placeholder="Description" name="description" />
            <MySelectInput
              options={categoryOptions}
              placeholder="Category"
              name="category"
            />
            <MyDateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyy h:mm aa"
            />
            <Header content="Location Details" sub color="teal" />
            <MyTextInput placeholder="City" name="city" />
            <MyTextInput placeholder="Venue" name="venue" />
            <Button
              floated="right"
              positive
              type="submit"
              content="Submit"
              loading={isSubmitting}
              disabled={isSubmitting || !isValid || !dirty}
            />
            <Button
              floated="right"
              type="button"
              content="Cancel"
              as={Link}
              to="/activities"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default observer(ActivityForm);
