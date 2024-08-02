import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { authState } from "../../pages/_app";
import { useContext } from "react";
import { useEffect } from "react";
import { Slide, toast } from "react-toastify";

const schema = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required(),
  })
  .required();

function Login() {
  const router = useRouter();
  const t = useContext(authState);
  const { auth, setAuth } = t;
  const [authToken, setAuthToken] = useState(null);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      let response = await axios.post("http://localhost:9000/login", data);

      if (response) {
        toast.success("Login Successfull", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
          transition: Slide,
        });
        router.push("/dashboard");
        setAuth(true);
      }

      setAuthToken(response.data);
      localStorage.setItem("authToken", JSON.stringify(response.data));
    } catch (error) {
      toast.error("Invalid Credentials", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
        transition: Slide,
      });
    }
  };
  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem("authToken"));
    if (accessToken) {
      router.push("/dashboard");
    }
  }, []);
  return (
    <div
      className=" bg-center h-screen"
      style={{ backgroundImage: 'url("Group 1.svg")' }}
    >
      <nav className="flex justify-around pt-10">
        <span className="text-white text-lg font-bold tracking-normal sm:text-2xl md:text-3xl xl:text-4xl font-cornerstone">
          SLEND.IT
        </span>
        <button className="bg-customButtonColor1 text-white px-3 py-2 rounded-xl md:px-6 md:py-4">
          Support Project
        </button>
      </nav>
      <div className="flex justify-center text-white mt-16 md:mt-20 xl:mt-24">
        <div className="flex flex-col">
          <p className="text-4xl  font-bold md:text-5xl md:font-bold lg:text-5xl xl:text-5xl">
            <span className="text-customSpanColor"> Log in </span> and start
            sharing
          </p>
          <p className="text-4xl  flex justify-center py-3 md:text-5xl lg:text-6xl xl:text-xl">
            Don&apos;t have an account? &nbsp;<Link href={"/signup"}>Sign up </Link>
          </p>
          {/* <p className="text-lg flex justify-center xl:text-2xl">
              Create powerful and recognizable short links
            </p> */}
        </div>
      </div>
      <div className="  flex justify-center pt-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg"
        >
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 "
              htmlFor="password"
            >
              Email
            </label>
            <input
              className={`shadow appearance-none border ${
                errors.email && "border-red-500"
              } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              id="email"
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email?.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`shadow appearance-none border ${
                errors.password && "border-red-500"
              } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              id="password"
              type="password"
              placeholder="******************"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password?.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Log in
            </button>
            {/* <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a> */}
          </div>
        </form>
        {/* <p className="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p> */}
      </div>
    </div>
  );
}

export default Login;
