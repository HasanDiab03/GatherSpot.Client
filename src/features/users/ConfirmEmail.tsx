import { useEffect, useState } from "react";
import { useStore } from "../../app/stores/store";
import useQuery from "../../app/utils/hooks";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import LoginForm from "./LoginForm";

const ConfirmEmail = () => {
  const { modalStore } = useStore();
  const email = useQuery().get("email") as string;
  const token = useQuery().get("token") as string;
  const Status = {
    Verifying: "Verifying",
    Failed: "Failed",
    Success: "Success",
  };

  const [status, setStatus] = useState(Status.Verifying);

  const handleConfirmEmailResend = () => {
    agent.Account.resendEmailConfirm(email)
      .then(() => {
        toast.success("Verification Email resent - please check your email");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    agent.Account.verifyEmail(token, email)
      .then(() => {
        setStatus(Status.Success);
      })
      .catch(() => setStatus(Status.Failed));
  }, [token, email, Status.Failed, Status.Success]);

  const getBody = () => {
    switch (status) {
      case Status.Verifying:
        return <p>Verifying...</p>;
      case Status.Failed:
        return (
          <div>
            <p>
              Verification Failed. You can try resending the verify link to your
              email
            </p>
            <Button
              primary
              onClick={handleConfirmEmailResend}
              size="huge"
              content="Resend Email"
            />
          </div>
        );
      case Status.Success:
        return (
          <div>
            <p>Email has been verified - you can now login</p>
            <Button
              onClick={() => modalStore.openModal(<LoginForm />)}
              size="huge"
              content="Login"
            />
          </div>
        );
    }
  };

  return (
    <Segment placeholder textAlign="center">
      <Header icon>
        <Icon name="envelope" />
        Email Verification
      </Header>
      <Segment.Inline>{getBody()}</Segment.Inline>
    </Segment>
  );
};

export default ConfirmEmail;
