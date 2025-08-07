import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchusers,
  updateuser,
  resetFlags,
  deleteUser,
} from "../features/userDetailSlice";
import { toast } from "react-toastify";
const AllPosts = () => {
  const dispatch = useDispatch();
  const { users, loading, error, userAdded, userUpdated } = useSelector(
    (state) => state.app
  );
  const [isModel, setISModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    gender: "",
    age: "",
  });

  useEffect(() => {
    dispatch(fetchusers());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleModal = (data) => {
    setFormData(data);
    setISModal(true);
  };

  const deleteCurrentUser = (id) => {
    dispatch(deleteUser( id));
    toast.success("User deleted successfully!");
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(
        updateuser({ id: formData.id, userData: formData })
      ).unwrap();

      toast.success("User updated successfully!");
      setISModal(false);
      dispatch(resetFlags());
      console.log("result", result);
    } catch (error) {
      toast.error("User updation failed. Please try again.");
    }
  };

  return (
    <>
      {users.map((user) => (
        <div
          key={user.id}
          className="mt-8 w-full max-w-3xl mx-auto bg-red-200 p-6 rounded shadow"
        >
          <div className="mb-4 relative flex justify-center items-center">
            <h1 className="text-xl font-semibold">{user.name}</h1>

            <div className="absolute right-0">
              <button
                className="mr-2 rounded bg-black text-white px-2 "
                onClick={() => {
                  handleModal(user);
                }}
              >
                Edit
              </button>
              <button
                onClick={()=>deleteCurrentUser(user.id)}
                className=" rounded bg-black text-white px-2 "
              >
                Delete
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <h2 className="text-lg">Email: {user.email} </h2>
            <p className="text-base">Age: {user.age}</p>
            <p className="text-base">Gender: {user.gender} </p>
          </div>
        </div>
      ))}

      {isModel && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 z-10 ">
          <form
            onSubmit={handlePostSubmit}
            className="bg-gray-300 rounded border  w-100 h-80 flex flex-col items-center gap-4"
          >
            <div className="mt-8">
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
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                />{" "}
                Female
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
              onClick={() => setISModal(false)}
              className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AllPosts;
