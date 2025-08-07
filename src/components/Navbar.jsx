import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between px-6 mt-6 bg-zinc-300 py-4 ">
        <div className="flex justify-start gap-x-12 items-center ">
          <Link to={"/"} className="text-4xl text-red-400">
            {" "}
            RTK
          </Link>
        </div>

        <div className="flex justify-between gap-x-4">
          <div>
            <Link to={"/"}>
              <button className="mr-4 rounded  bg-zinc-600 px-4 py-2 text-white hover:bg-zinc-800 ">
                All Posts
              </button>
            </Link>
            <Link   to={"/createpost"}>
              <button
              
                className="rounded bg-zinc-600 px-4 py-2 text-white hover:bg-zinc-800"
              >
                Create Post
              </button>
            </Link>
          </div>
          <div>
            <input
              className=" bg-white rounded  border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none text-black px-20 leading-10 transition-colors duration-200 ease-in-out"
              type="text"
              placeholder="Search Post"
            ></input>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
