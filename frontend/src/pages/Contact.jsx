import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetter from "../components/newsLetter";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-4">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500"> Urban Couture <br /> 567 Fashion Ave, <br/> Suite 101, New York, USA </p>
          <p className="text-gray-500">Tel: (212) 555-8346 <br /> Email: contact@urbancouture.com</p>
          <p className="font-semibold text-xl text-gray-600">Careers at Urban Couture</p>
          <p className="text-gray-500"> Learn more about our teams and job openings.  </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">Explore Jobs</button>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default Contact;
