import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetter from "../components/NewsLetter";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Urban Couture is a fashion e-commerce platform designed to make
            online shopping effortless and stylish. It features an intuitive
            interface, secure payment options, and personalized recommendations,
            ensuring a premium shopping experience for fashion enthusiasts.
          </p>
          <p>
            Blending functionality with aesthetics, the platform offers advanced
            search filters, real-time inventory updates, and a wishlist system.
            Urban Couture also emphasizes eco-consciousness and inclusivity,
            catering to diverse needs while promoting sustainable fashion.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission at Urban Couture is to create stylish, sustainable, and
            affordable fashion that inspires confidence, celebrates
            individuality, and blends modern trends with timeless elegance.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5"> 
          <b>Quality Assurance:</b>
          <p className="text-gray-600">Ensuring impeccable standards, We focus on delivering excellence in every stitch, fabric, and design—because you deserve nothing less than perfection.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5"> 
          <b>Quality Convenience:</b>
          <p className="text-gray-600">We prioritize functionality without compromising on style, ensuring that every piece fits seamlessly into your lifestyle.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5"> 
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">We are dedicated to providing exceptional customer service. Our team goes above and beyond to ensure every experience is personalized, timely, and truly memorable.</p>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default About;
