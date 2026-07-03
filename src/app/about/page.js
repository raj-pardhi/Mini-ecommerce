import React from 'react'

// Ye page pure Server Component hai (koi hook/interactivity nahi),
// isliye per-page metadata seedha export kar sakte hain - Helmet ki zaroorat nahi!
export const metadata = {
  title: "About us - Ecommerce App",
};

const About = () => {
  return (
    <div className="row contactus ">
      <div className="col-md-6 ">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="contactus"
          style={{ width: "100%" }}
        />
      </div>
      <div className="col-md-4">
        <p className="text-justify mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
          officiis obcaecati esse tempore unde ratione, eveniet mollitia,
          perferendis eius temporibus dicta blanditiis doloremque explicabo
          quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
          accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
          commodi illum quidem neque tempora nam.
        </p>
      </div>
    </div>
  )
}

export default About
