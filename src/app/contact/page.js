import React from "react";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

export const metadata = {
  title: "Contact us",
};

const Contact = () => {
  return (
    <div className="row contactus ">
      <div className="col-md-6 ">
        <img
          src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="contactus"
          style={{ width: "100%" }}
        />
      </div>
      <div className="col-md-4">
        <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
        <p className="text-justify mt-2">
          any query and info about prodduct feel free to call anytime we 24X7
          vaialible
        </p>
        <p className="mt-3">
          <BiMailSend /> : www.help@ecommerceapp.com
        </p>
        <p className="mt-3">
          <BiPhoneCall /> : 012-3456789
        </p>
        <p className="mt-3">
          <BiSupport /> : 1800-0000-0000 (toll free)
        </p>
      </div>
    </div>
  );
};

export default Contact;
