import { Grid } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import Loading from "../../app/layout/Loading";

const ProfilePage = () => {
  const { username } = useParams();
  const { profileStore } = useStore();
  const { profile, loadingProfile, loadProfile, setActiveTab } = profileStore;

  useEffect(() => {
    if (username) loadProfile(username);
    return () => setActiveTab(0);
  }, [loadProfile, username, setActiveTab]);
  if (loadingProfile) return <Loading content="Loading Profile..." />;
  return (
    <Grid>
      <Grid.Column width={16}>
        {profile && (
          <>
            <ProfileHeader profile={profile} />
            <ProfileContent profile={profile} />
          </>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProfilePage);
