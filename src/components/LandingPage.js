import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

function LandingPage() {
  const router = useRouter();
  const [longUrl, setLongUrl] = useState("");
  const [toggle, setToggle] = useState(false);
  const [shortUrl,setShortUrl]=useState(null)

  const shortenUrl = async () => {
    
    let response = await axios.post("http://localhost:9000/short-url", {
      weburl: longUrl,
    });
    console.log(response.data.shortenedUrl);
    setShortUrl(response.data.shortenedUrl)
  };
  useEffect(() => {
    if (toggle) {
      setTimeout(() => {
        setToggle(false);
      }, 1000);
    }
  }, [toggle]);
  return (
    <div
      className="h-screen bg-center relative"
      style={{ backgroundImage: 'url("Group 1.svg")' }}
    >
      <nav className="flex justify-around pt-10">
        <span className="text-white text-lg font-bold tracking-normal sm:text-2xl md:text-3xl xl:text-4xl font-cornerstone">
          SLEND.IT
        </span>
        <div>
          <button
            onClick={() => router.push("/login")}
            className=" text-white px-3 py-2 rounded-xl md:px-6 border mx-3  "
          >
            Log in
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="bg-customButtonColor1 text-white px-3 py-2 rounded-xl md:px-6   "
          >
            Sign up
          </button>
        </div>
      </nav>
      <main>
        <div className="flex justify-center text-white mt-16 md:mt-20 xl:mt-24">
          <div className="flex flex-col">
            <p className="text-4xl text-center  font-bold md:text-5xl md:font-bold lg:text-6xl xl:text-6xl">
              Got<span className="text-customSpanColor"> Ugly </span>Looking
            </p>
            <p className="text-4xl font-bold flex justify-center py-3 md:text-5xl lg:text-6xl xl:text-6xl">
              Long Url
            </p>
            <p className="text-sm sm:text-lg text-center flex justify-center xl:text-2xl">
              Create powerful and recognizable short links
            </p>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            shortenUrl();
          }}
        >
          <div className="flex justify-center space-x-6 mt-10 sm:mt-28">
            <input
              className="px-3 w-72 rounded-xl h-10 placeholder:px-2 bg-customTextBoxColor sm:h-14 xl:w-2/6"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="Paste Your Link"
              type={"url"}
              required
            />
            <button
              type="submit"
              className="sm:block hidden bg-customSpanColor px-4 py-3 rounded-xl font-cornerstone text-white text-2xl"
            >
              SLEND
            </button>
          </div>
          <div className="flex justify-center mt-5">
            <button className="sm:hidden bg-customSpanColor px-4 py-2 rounded-xl font-cornerstone text-white font-4">
              SLEND
            </button>
          </div>
        </form>
        {shortUrl && (
          <div className=" flex justify-center pt-5 ">
            <div className=" flex  py-2.5 px-4 space-x-5 sm:space-x-24  xl:space-x-96 font-poppins rounded-2xl text-white bg-customBgColor border">
              <p className="font-semibold">{shortUrl}</p>

              <button
                className="font-extrabold  w-16    "
                onClick={() => {
                  setToggle(true);
                  navigator.clipboard.writeText(
                   shortUrl
                  );
                }}
              >
                {toggle ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}

        {/* <div className="flex justify-center pt-52 xl:pt-56 2xl:pt-80 "> */}
        <div className=" flex absolute bottom-4 left-1/2 -translate-x-1/2">
          <span>
            <i className="fa-solid fa-hand-spock text-handSpackColor mr-2"></i>
          </span>
          <p className="text-white">
            Project By{" "}
            <span className="text-customTextColor1">MR</span>
          </p>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
