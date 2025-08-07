import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createuser } from "../features/userDetailSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const CreatePost = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error} = useSelector((state)=> state.app);

 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
  });

if (loading) {
    return <p className="text-center mt-4">Loading...</p>;
  }
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
      try {
    const res = await dispatch(createuser(formData)).unwrap();
    toast.success("User created successfully!");
    navigate('/');
  } catch (error) {
    toast.error("User creation failed. Please try again.");
    console.error(error);
  }

   
  };

  return (
    <>
      <div className="mt-4">
        <form onSubmit={handlePostSubmit} className="flex flex-col items-center gap-4">
          <div>
            <label className="mr-2">Name:</label>
            <input
              className="text-black rounded border border-gray-500 px-2"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mr-2">Email:</label>
            <input
              className="text-black rounded border border-gray-500 px-2"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mr-2">Gender:</label>
            <label className="mr-2">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              /> Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              /> Female
            </label>
          </div>

          <div>
            <label className="mr-2">Age:</label>
            <input
              className="text-black rounded border border-gray-500 px-2"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
