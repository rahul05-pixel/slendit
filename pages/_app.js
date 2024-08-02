import Head from "next/head";
import { createContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../styles/globals.css";
export const authState = createContext({
  auth: null,
  setAuth: () => {},
});
function MyApp({ Component, pageProps }) {
  
  

  return (
    <>
      <ToastContainer />
        <Component {...pageProps} />
      
    </>
  );
}

export default MyApp;
