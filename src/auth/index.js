import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

const withAuth = (WrappedComponent) =>
  // eslint-disable-next-line react/display-name
  ({ ...props }) => {
    const [isClient, setIsClient] = useState(false);
    const Router = useRouter();
    useEffect(() => {
      if (typeof window !== "undefined") {
        setIsClient(true);
      }
    }, []);
    if (isClient) {
      const accessToken = JSON.parse(localStorage.getItem("authToken"));

      // If there is no access token we redirect to "/" page.
      if (!accessToken) {
        Router.push("/login");
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }
    // If we are on server, return null
    return null;
  };

export default withAuth;
