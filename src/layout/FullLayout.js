import { useRouter } from "next/router";

export default function FullLayout({ children }) {
  const router = useRouter();
  

  if (typeof window !== "undefined") {
      console.log('win')
      const authToken=JSON.parse(localStorage.getItem('authToken'))
    if (!authToken) {
      router.push("/login");
      return null;
    }
    return null
  }

  return (
    <>
      {children}
    </>
  );
}
