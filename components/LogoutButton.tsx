import { Button, type ButtonProps } from "@chakra-ui/react";
import { useConnect, useDisconnect } from "@thirdweb-dev/react";
import { memo } from "react";

type LogoutButtonProps = ButtonProps;

export default memo(function LogoutButton(props: LogoutButtonProps) {
  const [{ data: connection }] = useConnect();
  const disconnect = useDisconnect();

  if (!connection.connected) {
    return null;
  }

  return (
    <Button variant="outline" color="gray.400" {...props} onClick={disconnect}>
      Logout
    </Button>
  );
});
