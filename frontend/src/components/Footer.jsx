import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-6">
      <div className="mb-8 mt-24 grid gap-8 rounded-2xl border border-slate-200/80 bg-white/80 p-6 text-sm shadow-[0_12px_36px_rgba(16,47,79,0.09)] sm:grid-cols-[3fr_1fr_1fr]">
        {/*left section*/}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full leading-6 text-slate-600 md:w-2/3">
            MediSphere is dedicated to bridging healthcare gaps in
            underserved communities by providing access to essential health
            services at little to no cost. Through partnerships with local
            governments and NGOs, we address critical health issues, including
            maternal care, chronic illness management, and malnutrition. Our
            platform empowers communities by organizing health camps, mobile
            clinics, and vaccination drives, making healthcare more accessible
            and improving quality of life. By sponsoring these initiatives,
            Providence not only enhances public health but also fosters
            long-term relationships, building a foundation for a healthier
            future for all.
          </p>
        </div>
        {/*center section*/}
        <div>
          <p className="mb-4 text-lg font-semibold tracking-wide text-slate-800">COMPANY</p>
          <ul className="flex flex-col gap-2 text-slate-600">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        {/*right section*/}
        <div>
          <p className="mb-4 text-lg font-semibold tracking-wide text-slate-800">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-slate-600">
            <li>+0123456789</li>
            <li>TheVerse@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr className="border-t border-slate-300/60" />
        <p className="py-5 text-center text-sm text-slate-600">
          Copyright 2024@ MediSphere -All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
