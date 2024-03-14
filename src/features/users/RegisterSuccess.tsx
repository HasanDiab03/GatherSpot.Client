import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import useQuery from "../../app/utils/hooks";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

const RegisterSuccess = () => {
  const email = useQuery().get("email") as string;

  const handleConfirmEmailResend = () => {
    agent.Account.resendEmailConfirm(email)
      .then(() => {
        toast.success("Verification Email resent - please check your email");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Segment placeholder textAlign="center">
      <Header icon color="green">
        <Icon name="check" />
        Successfully Registered
      </Header>
      <p>
        Please Check your email (including junk email) for the verification
        email
      </p>
      {email && (
        <>
          <p>Didn't receive the email? Click the below button to resend</p>
          <Button
            primary
            onClick={handleConfirmEmailResend}
            content="Resend Email"
            size="huge"
          />
        </>
      )}
    </Segment>
  );
};

export default RegisterSuccess;
