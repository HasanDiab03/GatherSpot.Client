import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

const Home = () => {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          GatherSpot
        </Header>
        <Header as="h2" inverted content="Welcome To GatherSpot" />
        <Button as={Link} to="/activities" size="huge" inverted>
          Take me to the Activities!
        </Button>
      </Container>
    </Segment>
  );
};

export default Home;
