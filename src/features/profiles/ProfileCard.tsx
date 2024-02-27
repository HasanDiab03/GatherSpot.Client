import { Card, Icon, Image } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { Link } from "react-router-dom";

interface Props {
  profile: Profile;
}

const ProfileCard = ({ profile }: Props) => {
  return (
    <Card as={Link} to={`/profile/${profile.username}`}>
      <Image src={profile.image || "/assets/user.png"} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
        {profile.bio && (
          <Card.Description>
            {profile.bio.length > 40
              ? profile.bio?.slice(0, 37) + "..."
              : profile.bio}
          </Card.Description>
        )}
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />
        20 followers
      </Card.Content>
    </Card>
  );
};

export default ProfileCard;
