import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { MdLogout, MdAccountCircle, MdNotifications } from "react-icons/md";
import Modal from "react-modal";
import { Slide, toast } from "react-toastify";
import ModalComponent from "./ModalComponent";



function Dashboard() {
  const router = useRouter();
  const [shortUrls, setShortUrls] = useState([]);
  const [longUrl, setLongUrl] = useState("");
  const [userName, setuserName] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [isOpen,setIsOpen]=useState(false)
  const [obj,setObj]=useState(null)

 
  const getUrls = async () => {
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    const token = authToken?.access?.token;
    let response = await axios.get(
      "http://localhost:9000/auth/getAll-short-url",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setShortUrls(response.data);
  };
  
  const shortenUrl = async () => {
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    const token = authToken?.access?.token;
    let response = await axios.post(
      "http://localhost:9000/auth/short-url",
      {
        weburl: longUrl,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response) {
      setLongUrl("");
      getUrls();
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    toast.success("Logged Out", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1000,
      transition: Slide,
    });
    router.push("/login");
  };
  const handleClicks = async (id) => {
    console.log(id);
    let response = await axios.post(`http://localhost:9000/${id}`);
    if (response) {
      getUrls();
    }
  };
  const onSubmit = async (data) => {
    console.log(data)
    console.log(obj._id)
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    const token = authToken?.access?.token;

    let response = await axios.put(
      `http://localhost:9000/auth/edit-short-url`,
      {
        id: data.id,
        weburl: data.url,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response) {
      getUrls()
        
    }
  };

  useEffect(() => {
    getUrls();
    const accessToken = JSON.parse(localStorage.getItem("authToken"));
    setuserName(accessToken?.user);
  }, []);

  return (
    <>
      <div>
       
          <nav className=" bg-white py-4 flex justify-around space-x-4   rounded-t-2xl sm:px-20 sm:py-4 sm:flex sm:justify-between">
            <span className="flex pl-4 sm:px-0 items-center text-gray-500 tracking-widest font-cornerstone font-extrabold text-sm sm:text-xl">
              SLEND.IT
            </span>
            <div className="flex">
              <span className="flex items-center mr-2 sm:mx-4">
                <i className="fa-solid fa-search text-iconColor sm:text-xl"></i>
              </span>

              <input
                type="text"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                className="w-full h-7 md:h-9 lg:w-96 xl:w-[40rem] bg-customGray1 xl:h-12 rounded-lg placeholder:text-center px-2"
                // className="bg-customGray1   flex h-7 w-full sm:h-8 sm:w-full  sm:px-0 md:w-96 lg:h-9   xl:w-11/12 xl:px-52 xl:h-12 lg:w-4/5 lg:px-48  rounded-lg placeholder:text-center "
                placeholder="Search or Paste URL"
              />

              <span className="flex items-center ml-2 sm:mx-4">
                <i
                  onClick={shortenUrl}
                  className="fa-solid fa-add text-iconColor sm:text-xl cursor-pointer"
                ></i>
              </span>
            </div>

            <span className="flex pr-4 sm:px-0 items-center space-x-5">
              {/* <i className="fa-solid fa-bell text-iconColor text-2xl"></i> */}
              <button>
                <MdNotifications className=" text-xl xl:text-3xl text-iconColor" />
              </button>
              <button>
                <MdAccountCircle
                  onClick={() => setDropdown(!dropdown)}
                  className=" text-iconColor text-xl xl:text-3xl hover:bg-slate-100 "
                />
              </button>
            </span>
            {dropdown && (
              <>
                {/* <div class="border-solid border-b-black border-b-8 border-x-transparent border-x-8 border-t-0"> */}

                <div className=" absolute right-20 top-14 bg-slate-50 shadow-xl w-40 rounded-md px-5 py-2 transition duration-150 ease-in-out">
                  <ul className="text-lg">
                    <li className="p-2 font-poppins">{userName}</li>
                    <hr />
                    <li
                      onClick={logout}
                      className="py-2 mt-2 hover:bg-slate-200 hover:cursor-pointer"
                    >
                      <div className="flex font-poppins  rounded-md items-center ">
                        <MdLogout className="mx-1" />
                        Logout{" "}
                      </div>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </nav>
          <main className="bg-customGray h-full rounded-b-2xl  ">
            <div className=" flex pt-5 justify-around sm:flex sm:justify-around sm:pt-10  ">
              <span className="text-gray-500 tracking-widest font-bold">
                STATS
              </span>
              <span className="text-customBlue tracking-wider">See All</span>
            </div>
            <div>
              <ul className=" hidden text-lg sm:flex sm:justify-center sm:space-x-14 md:space-x-24 xl:pt-5 xl:text-3xl sm:font-extrabold text-customBlack font-poppins pb-5  ">
                <li className="flex ">
                  <span className="flex items-start sm:mr-1 xl:mr-4">
                    <i className="fa-solid fa-link text-iconColor text-xl"></i>
                  </span>
                  <div className="flex flex-col">
                    <span className="flex justify-center">71</span>
                    <span className=" text-iconColor text-sm">Links</span>
                  </div>
                </li>
                <li className="flex">
                  <span className="flex items-start sm:mr-1 xl:mr-4">
                    <i className="fa-solid fa-eye text-iconColor text-xl"></i>
                  </span>
                  <div className="flex flex-col">
                    <span className="flex justify-center">29</span>
                    <span className=" text-iconColor text-sm">Views</span>
                  </div>
                </li>
                <li className="flex ">
                  <span className="flex items-start sm:mr-1 xl:mr-4">
                    <i className="fa-solid fa-hand-pointer text-iconColor text-xl"></i>
                  </span>
                  <div className="flex flex-col">
                    <span className="flex justify-center">53</span>
                    {/* 53 */}
                    <span className=" text-iconColor text-sm">Clicks</span>
                  </div>
                </li>
                <li className="flex">
                  <span className="flex items-start sm:mr-1 xl:mr-4">
                    <i className="fa-solid fa-chart-line text-iconColor text-xl"></i>
                  </span>
                  <div className="flex flex-col">
                    <span className="flex justify-center">21%</span>
                    <span className=" text-iconColor text-sm">Avg.CTR</span>
                  </div>
                </li>
                <li className="flex">
                  <span className="flex items-start sm:mr-1 xl:mr-4">
                    <i className="fa-solid fa-clock text-iconColor text-xl"></i>
                  </span>
                  <div className="flex flex-col">
                    <span className="flex justify-center">6.43s</span>
                    <span className=" text-iconColor text-sm">Avg.Time</span>
                  </div>
                </li>
              </ul>

              {/* small screen less than 640px */}
              <div className="sm:hidden">
                <ul className=" flex p-2 justify-around  text-lg   text-customBlack">
                  <li className="flex items-center ">
                    <span className="flex items-center mr-1">
                      <i className="fa-solid fa-link text-iconColor text-lg"></i>
                    </span>
                    <div className="flex flex-col">
                      <span>500</span>
                      <span className="  text-sm text-iconColor">Links</span>
                    </div>
                  </li>
                  <li className="flex justify-center">
                    <span className="flex items-center mr-1">
                      <i className="fa-solid fa-eye text-iconColor text-lg"></i>
                    </span>
                    <div className="flex flex-col">
                      <span>249</span>
                      <span className="text-sm text-iconColor">Views</span>
                    </div>
                  </li>
                </ul>
                <ul className=" flex pb-2 justify-around  text-lg   text-customBlack">
                  <li className="flex justify-center">
                    <span className="flex items-center mr-1">
                      <i className="fa-solid fa-hand-pointer text-iconColor text-lg"></i>
                    </span>
                    <div className="flex flex-col">
                      <span>500</span>
                      <span className="  text-sm text-iconColor">Clicks</span>
                    </div>
                  </li>
                  <li className="flex justify-center">
                    <span className="flex items-center mr-1">
                      <i className="fa-solid fa-chart-line text-iconColor text-lg"></i>
                    </span>
                    <div className="flex flex-col">
                      <span>21%</span>
                      <span className="text-sm text-iconColor">Avg.CTR</span>
                    </div>
                  </li>
                </ul>
                <ul className=" flex  justify-around  text-lg   text-customBlack">
                  <li className="flex justify-center">
                    <span className="flex items-center mr-1">
                      <i className="fa-solid fa-clock text-iconColor text-lg"></i>
                    </span>
                    <div className="flex flex-col">
                      <span>6.37s</span>
                      <span className="  text-sm text-iconColor">Avg.Time</span>
                    </div>
                  </li>
                  <li className="flex justify-center">
                    <span className="flex items-center mr-1">
                      <i className="fa-solid fa-clock text-iconColor text-lg"></i>
                    </span>
                    <div className="flex flex-col">
                      <span>6.37s</span>
                      <span className="  text-sm">Avg.Time</span>
                    </div>
                  </li>
                </ul>
              </div>

            

              <div className="pt-4 sm:px-14 md:px-5 lg:px-40 xl:px-96 2xl:96">
                <hr className="xl:w-full" />
              </div>
            </div>

            <div className="flex justify-around py-5">
              <ul className="flex space-x-5">
                <li className="flex items-center">
                  <button className="bg-customButtonColor p-2 text-customLinkColor">
                    <i className="fa-solid fa-house mr-2"></i>Home
                  </button>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-signal text-iconColor"></i>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-trash-can text-iconColor"></i>
                </li>
              </ul>
              <ul className="flex space-x-5">
                <li className="flex items-center">
                  <i className="fa-solid fa-sort text-iconColor"></i>
                </li>
                <li className="flex items-center">
                  <button className="bg-customButtonColor p-2 text-iconColor">
                    <i className="fa-solid fa-filter mr-2"></i>Filters
                  </button>
                </li>
              </ul>
            </div>
            

            {/* ----------------------------------------------------------------------------------------------------------------------------- */}
            {/* <main className="relative bg-customGray h-screen "> */}
            {shortUrls
              .filter((item) => {
                return item.weburl
                  .toLowerCase()
                  .includes(longUrl.toLowerCase());
              })
              .map((item) => {
                return (
                  <div
                    key={item._id}
                    className="px-10 my-3 lg:px-52 xl:px-64 xl:my-5  "
                  >
                    <div className="lg:flex lg:justify-between box-border p-2 lg:p-5 xl:p-5 bg-white ">
                      <div className="flex flex-grow ">
                        <span className="flex items-center text-iconColor">
                          <i className="fa-solid fa-ellipsis-vertical text-3xl mr-3"></i>
                        </span>

                        <div className="flex flex-col  pt-2 ">
                          <p
                            title={item.weburl}
                            className=" text-sm xl:text-lg font-poppins justify-self-center "
                          >
                            {item.weburl.length > 75
                              ? `${item.weburl.slice(0, 60)}.....`
                              : item.weburl}
                          </p>

                          <p
                            onClick={() => {
                              handleClicks(item._id);
                              window.open(item.weburl);
                            }}
                            className="text-blue-500 font-poppins cursor-pointer"
                          >
                            {item.shortenedUrl}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between p-4 lg:space-x-16 xl:hidden">
                        <span className="flex items-center text-iconColor">
                          {item.clicks}{" "}
                          <i className="fa-solid fa-chart-column mx-1"></i>
                        </span>
                        <ul className="flex space-x-5 text-lg">
                          <li className="flex items-center">
                            <button>
                              <i
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    item.shortenedUrl
                                  );
                                  toast.info("Copied", {
                                    position: toast.POSITION.BOTTOM_RIGHT,
                                  });
                                }}
                                className="fa-solid fa-clone  text-iconColor"
                              ></i>
                            </button>
                          </li>
                          <li className="flex items-center">
                            <i onClick={()=>{setIsOpen(true);setObj(item)}} className="fa-solid fa-pen-to-square  text-iconColor"></i>
                          </li>
                          <li className="flex items-center">
                            <i className="fa-solid fa-trash-can text-iconColor cursor-pointer "></i>
                          </li>
                        </ul>
                      </div>

                      <div className="hidden xl:flex xl:space-x-20 2xl:space-x-48">
                        <span className=" flex items-center  text-iconColor">
                          {item.clicks}{" "}
                          <i className="fa-solid fa-chart-column mx-1"></i>
                        </span>
                        <ul className=" flex space-x-5 text-lg">
                          <li className="flex items-center">
                            <button>
                              <i
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    item.shortenedUrl
                                  );
                                  toast.info("Copied to clipboard", {
                                    position: toast.POSITION.TOP_RIGHT,
                                    autoClose: 500,
                                    hideProgressBar: true,
                                    transition: Slide,
                                  });
                                }}
                                className="fa-solid fa-clone  text-iconColor"
                              ></i>
                            </button>
                          </li>
                          <li className="flex items-center">
                            <i onClick={()=>{setIsOpen(true);setObj(item)}} className="fa-solid fa-pen-to-square  text-iconColor cursor-pointer"></i>
                          </li>
                          <li className="flex items-center">
                            <i className="fa-solid fa-trash-can text-iconColor cursor-pointer "></i>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
          </main>
          <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen} obj={obj} onSubmit={onSubmit} />
        
      </div>
    </>
  );
}

export default Dashboard;
