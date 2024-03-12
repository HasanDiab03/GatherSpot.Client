/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Header,
  Image,
  Segment,
} from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";
import FacebookLogin from "@greatsumini/react-facebook-login";

const Home = () => {
  const { userStore, modalStore } = useStore();
  const { isLoggedIn } = userStore;
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
        {isLoggedIn ? (
          <>
            <Header as="h2" inverted content="Welcome To GatherSpot" />
            <Button as={Link} to="/activities" size="huge" inverted>
              Go To Activities!
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => modalStore.openModal(<LoginForm />)}
              size="huge"
              inverted
            >
              Login
            </Button>
            <Button
              onClick={() => modalStore.openModal(<RegisterForm />)}
              size="huge"
              inverted
            >
              Register
            </Button>
            <Divider horizontal inverted>
              Or
            </Divider>
            <Button
              as={FacebookLogin}
              appId="1048017146300117"
              size="huge"
              inverted
              color="facebook"
              content="Login With Facebook"
              loading={userStore.fbLoading}
              onSuccess={(resp: any) =>
                userStore.facebookLogin(resp.accessToken)
              }
              onFail={(resp: any) => console.log(resp)}
            />
          </>
        )}
      </Container>
    </Segment>
  );
};

export default observer(Home);
