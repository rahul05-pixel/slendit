import { useRouter } from "next/router";
import { useEffect } from "react";
import LandingPage from "../src/components/LandingPage";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem("authToken"));

    if (accessToken) {
      router.push("/dashboard");
    }
  }, []);
  return <LandingPage />;
}
