'use client'

import React, { useState, useEffect } from "react";
import UserMenu from "@/components/Layout/UserMenu";
import { useAuth } from "@/context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import "@/styles/userProfile.css"

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!auth?.user) return;
    const { email, name, phone, address } = auth.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.errro) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="c">
      <div className="main-userprofile">
        <div className="left-userprofile">
          <UserMenu />
        </div>
        <div className="right-userprofile">
          <h4 className="title">USER PROFILE</h4>
          <div className="form-userprofile">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-profile"
                  id="exampleInputEmail1"
                  placeholder="Enter Your Name"
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-profile"
                  id="exampleInputEmail1"
                  placeholder="Enter Your Email "
                  disabled
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-profile"
                  id="exampleInputPassword1"
                  placeholder="Enter Your Password"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-profile"
                  id="exampleInputEmail1"
                  placeholder="Enter Your Phone"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="input-profile"
                  id="exampleInputEmail1"
                  placeholder="Enter Your Address"
                />
              </div>

              <button type="submit" className="update-userprofile">
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
