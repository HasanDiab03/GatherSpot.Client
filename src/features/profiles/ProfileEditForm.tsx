import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";

interface Props {
  setUpdateMode: (vlaue: boolean) => void;
}

const ProfileEditForm = ({ setUpdateMode }: Props) => {
  const {
    profileStore: { profile },
  } = useStore();
  const initialValues: Partial<Profile> = {
    displayName: profile?.displayName,
    bio: profile?.bio,
  } || {
    bio: "",
    displayName: "",
  };

  const validaitionSchema = Yup.object({
    displayName: Yup.string().required("The displayName is required"),
  });
  const {
    profileStore: { updateProfile, updating },
  } = useStore();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) =>
        updateProfile(values).then(() => setUpdateMode(false))
      }
      validationSchema={validaitionSchema}
    >
      {({ handleSubmit, isValid, isSubmitting, dirty }) => (
        <Form onSubmit={handleSubmit} className="ui form">
          <MyTextInput name="displayName" placeholder="Display Name" />
          <MyTextArea rows={4} name="bio" placeholder="Bio" />
          <Button
            loading={updating}
            content="Update"
            disabled={!isValid || !dirty || isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
};

export default observer(ProfileEditForm);
