import { Lock, MoveLeft, User } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postData } from "../../utils/ApiHandlers";
import toast from "react-hot-toast";

const AddMember = () => {
  const navigate = useNavigate();
  const [memberData, setMemberData] = useState({
    name: "",
    dob: "",
    gender: "",
    qualification: "",
    occupation: "",
    maritalStatus: "",
    workingCountry: "",
    workingState: "",
    mobileNumber: "",
    bloodGroup: "",
    aadharNumber: "",
    email: "",
    income: "",
  });
  const { houseId } = useParams();
  const [errors, setErrors] = useState({});

  const changeHandler = (e) => {
    setMemberData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      Object.keys(memberData).forEach((key) => {
        if (!memberData[key]) {
          setErrors((prev) => ({ ...prev, [key]: "Required" }));
          isValid = false;
        }
      });
      console.log({ errors });
      let payload = memberData;
      payload.houseId = Number(houseId);
      console.log({ isValid });
      if (isValid) {
        await postData("/add/member", payload);
        toast.success("New Member Added");
        navigate(`/members/${houseId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <div className="p-3 bg-light-gray flex items-center justify-between">
        <h1 className="font-bold text-18">Add Member</h1>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-soft-gold bg-deep-navy hover:bg-deep-navy/80 cursor-pointer py-2 px-3"
        >
          <MoveLeft /> Back
        </button>
      </div>
      <div className="mt-3 p-3">
        <form onSubmit={handleFormSubmit} className="mt-8 space-y-6">
          <div className="space-y-4 ">
            <div className="flex flex-col md:flex-row  gap-3">
              {/* Name Field */}
              <div className="relative flex-1">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    // value={adminData.userName}
                    // onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           placeholder-gray-400 text-gray-900"
                    placeholder="Enter your name"
                    aria-label="Username"
                    value={memberData.name}
                    onChange={changeHandler}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-red-500">{errors.name}</p>
                )}
              </div>
              {/* email Field */}
              <div className="relative flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           placeholder-gray-400 text-gray-900"
                    placeholder="Enter your name"
                    aria-label="Username"
                    value={memberData.email}
                    onChange={changeHandler}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row  gap-3">
              {/* Gender Field */}
              <div className="relative flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={memberData.gender}
                  onChange={changeHandler}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           placeholder-gray-400 text-gray-900"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500">{errors.gender}</p>
                )}
              </div>

              {/* dob Field */}
              <div className="relative flex-1">
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Date of birth
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    value={memberData.dob}
                    onChange={changeHandler}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           placeholder-gray-400 text-gray-900"
                    aria-label="Username"
                  />
                </div>
                {errors.dob && (
                  <p className="mt-1 text-red-500">{errors.dob}</p>
                )}
              </div>
            </div>

            {/* qualification occupation */}
            <div className="flex flex-col md:flex-row  gap-3">
              <div className="relative flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Qualification
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="qualification"
                    name="qualification"
                    type="text"
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           placeholder-gray-400 text-gray-900"
                    placeholder="Enter your qualification"
                    aria-label="Username"
                    value={memberData.qualification}
                    onChange={changeHandler}
                  />
                </div>
                {errors.qualification && (
                  <p className="mt-1 text-red-500">{errors.qualification}</p>
                )}
              </div>
              <div className="relative flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Occupation
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="occupation"
                    name="occupation"
                    type="text"
                    value={memberData.occupation}
                    onChange={changeHandler}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           placeholder-gray-400 text-gray-900"
                    aria-label="Username"
                    placeholder="occupation"
                  />
                </div>
                {errors.occupation && (
                  <p className="mt-1 text-red-500">{errors.occupation}</p>
                )}
              </div>
            </div>

            {/* marital status bloodGroup */}
            <div className="flex flex-col md:flex-row  gap-3">
              <div className="relative flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marital Status
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="maritalStatus"
                    value={memberData.maritalStatus}
                    onChange={changeHandler}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           placeholder-gray-400 text-gray-900"
                  >
                    <option value="">Select Marital Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </select>
                </div>
                {errors.maritalStatus && (
                  <p className="mt-1 text-red-500">{errors.maritalStatus}</p>
                )}
              </div>
              <div className="relative flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blood Group
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="bloodGroup"
                    value={memberData.bloodGroup}
                    onChange={changeHandler}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           placeholder-gray-400 text-gray-900"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
                {errors.maritalStatus && (
                  <p className="mt-1 text-red-500">{errors.maritalStatus}</p>
                )}
              </div>
            </div>

            {/* incom aadhar */}
            <div className="flex flex-col md:flex-row  gap-3">
              <div className="relative flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Income
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="income"
                    name="income"
                    type="text"
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           placeholder-gray-400 text-gray-900"
                    placeholder="Enter your income"
                    aria-label="Username"
                    value={memberData.income}
                    onChange={changeHandler}
                  />
                </div>
                {errors.income && (
                  <p className="mt-1 text-red-500">{errors.income}</p>
                )}
              </div>
              <div className="relative flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Aadhar
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="aadharNumber"
                    name="aadharNumber"
                    type="text"
                    value={memberData.aadharNumber}
                    onChange={changeHandler}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           placeholder-gray-400 text-gray-900"
                    aria-label="Username"
                    placeholder="aadharNumber"
                  />
                </div>
                {errors.aadharNumber && (
                  <p className="mt-1 text-red-500">{errors.aadharNumber}</p>
                )}
              </div>
            </div>

            {/* work satate and country  */}
            <div className="flex flex-col md:flex-row  gap-3">
              <div className="relative flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Working Country
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="workingCountry"
                    name="workingCountry"
                    type="text"
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           placeholder-gray-400 text-gray-900"
                    placeholder="Enter your workingCountry"
                    aria-label="Username"
                    value={memberData.workingCountry}
                    onChange={changeHandler}
                  />
                </div>
                {errors.workingCountry && (
                  <p className="mt-1 text-red-500">{errors.workingCountry}</p>
                )}
              </div>
              <div className="relative flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Working State
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="workingState"
                    name="workingState"
                    type="text"
                    value={memberData.workingState}
                    onChange={changeHandler}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           placeholder-gray-400 text-gray-900"
                    aria-label="Username"
                    placeholder="workingState"
                  />
                </div>
                {errors.workingState && (
                  <p className="mt-1 text-red-500">{errors.workingState}</p>
                )}
              </div>
            </div>

            {/* Mobile number  */}
            <div className="flex flex-col md:flex-row  gap-3">
              <div className="relative flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="text"
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           placeholder-gray-400 text-gray-900"
                    placeholder="Enter your mobileNumber"
                    aria-label="Username"
                    value={memberData.mobileNumber}
                    onChange={changeHandler}
                  />
                </div>
                {errors.mobileNumber && (
                  <p className="mt-1 text-red-500">{errors.mobileNumber}</p>
                )}
              </div>
              <div className="relative flex-1"></div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="w-30 py-2.5 bg-[#CECECE] hover:bg-[#CECECE]/90 text-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-30 py-2.5 bg-[#14213D] hover:bg-[#0D1A2D] text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMember;
