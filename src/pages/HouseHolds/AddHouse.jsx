import { Lock, MoveLeft, User } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../../utils/ApiHandlers";
import toast from "react-hot-toast";

const AddHouse = () => {
  const navigate = useNavigate();
  const [houseData, setHouseData] = useState({
    mahalluNo: "",
    houseNo: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const changeHandler = (e) => {
    setHouseData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => {
      const updatedError = { ...prev };
      delete updatedError[e.target.name];
      return updatedError;
    });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let isValid = true;
      if (!houseData.mahalluNo) {
        console.log("no mahall number")
        setErrors((prev) => ({ ...prev, mahalluNo: "Required" }));
        isValid = false;
      }
      if (!houseData.houseNo) {
        setErrors((prev) => ({ ...prev, houseNo: "Required" }));
        isValid = false;
      }
      if (!houseData.address) {
        setErrors((prev) => ({ ...prev, address: "Required" }));
        isValid = false;
      }

      console.log(Object.entries(errors).length, "length");
      if (isValid) {
        const res = await postData("/add/house", houseData);
        toast.success("New Admin Creates");
        navigate("/houses");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  console.log({errors})
  return (
    <div>
      <div className="p-3 bg-light-gray flex items-center justify-between">
        <h1 className="font-bold text-18">Add Admin</h1>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-soft-gold bg-deep-navy hover:bg-deep-navy/80 cursor-pointer py-2 px-3"
        >
          <MoveLeft />
          Back
        </button>
      </div>
      <div className="mt-3 p-3">
        <form onSubmit={handleFormSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row  gap-3">
              {/* mahallu no Field */}
              <div className="relative flex-1">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mahallu Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="mahalluNo"
                    name="mahalluNo"
                    type="text"
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           placeholder-gray-400 text-gray-900"
                    placeholder="Enter your mahalluNo"
                    aria-label="Username"
                    value={houseData.mahalluNo}
                    onChange={changeHandler}
                  />
                </div>
                {errors.mahalluNo && (
                  <p className="mt-1 text-red-500">{errors.mahalluNo}</p>
                )}
              </div>
              {/* house no Field */}
              <div className="relative flex-1">
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  House Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="houseNo"
                    name="houseNo"
                    type="text"
                    value={houseData.houseNo}
                    onChange={changeHandler}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           placeholder-gray-400 text-gray-900"
                    placeholder="Enter your houseNo"
                    aria-label="houseNo"
                  />
                </div>
                {errors.houseNo && (
                  <p className="mt-1 text-red-500">{errors.houseNo}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row  gap-3">
              {/* address Field */}
              <div className="relative flex-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <div className="relative">
                  
                  <textarea
                    id="address"
                    name="address"
                    type="text"
                    value={houseData.address}
                    onChange={changeHandler}
                    className="appearance-none block w-full pl-3 pr-3 py-2 border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           placeholder-gray-400 text-gray-900"
                    placeholder="Enter your address"
                    aria-label="address"
                  />
                </div>
                {errors.address && (
                  <p className="mt-1 text-red-500">{errors.address}</p>
                )}
              </div>
            
            </div>
          </div>
          <div className="flex  items-center justify-end gap-3 ">
            {/* Submit Button */}
            <button
              onClick={() => navigate(-1)}
              type="button"
              className={`group relative w-30 flex justify-center py-2.5  border border-transparent
                     text-sm font-medium  text-black bg-[#CECECE] hover:bg-[#CECECE]/90 cursor-pointer
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                     transition duration-150 ease-in-out 
                    
                       `}
            >
              Cancel
            </button>
            <button
              type="submit"
              // disabled={loading}

              className={`cursor-pointer w-30 group relative flex justify-center py-2.5 px-4 border border-transparent
                     text-sm font-medium  text-white bg-[#14213D] hover:bg-[#0D1A2D]
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                     transition duration-150 ease-in-out 
                    
                       `}
            >
              {/* {loading ? "Signing in..." : "Sign in"} */}
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHouse;
