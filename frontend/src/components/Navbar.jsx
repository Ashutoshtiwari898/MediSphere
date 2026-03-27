import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/75 px-4 py-3 text-sm shadow-[0_14px_30px_rgba(16,47,79,0.1)] backdrop-blur md:px-6">
      <img
        onClick={() => {
          navigate("/");
        }}
        className="w-40 cursor-pointer sm:w-44"
        src={assets.logo}
        alt=""
      />
      <ul className="hidden items-start gap-2 font-medium md:flex md:flex-wrap md:justify-end">
        <NavLink to={"/"}>
          <li className="rounded-full px-3 py-1.5 transition hover:bg-primary/10">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/doctors"}>
          <li className="rounded-full px-3 py-1.5 transition hover:bg-primary/10">DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/about"}>
          <li className="rounded-full px-3 py-1.5 transition hover:bg-primary/10">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/contact"}>
          <li className="rounded-full px-3 py-1.5 transition hover:bg-primary/10">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/curanet"}>
          <li className="rounded-full px-3 py-1.5 transition hover:bg-primary/10">CURANET</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/healtheducation"}>
          <li className="rounded-full px-3 py-1.5 transition hover:bg-primary/10">DOCS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/ehr"}>
          <li className="rounded-full px-3 py-1.5 transition hover:bg-primary/10">EHR</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/healthaccess"}>
          <li className="rounded-full px-3 py-1.5 transition hover:bg-primary/10">CARELINK</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/eyediseasedetection"}>
          <li className="rounded-full px-3 py-1.5 transition hover:bg-primary/10">EYE DISEASE</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <hr />
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={userData?.image} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base text-gray-600 z-10 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => {
                    navigate("/my-profile");
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate("/my-appointment");
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={() => {
                    logout();
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="hidden rounded-full bg-primary px-6 py-2.5 font-semibold tracking-wide text-white shadow-[0_10px_20px_rgba(14,93,149,0.34)] md:block"
          >
            Create account
          </button>
        )}
        <img
          onClick={() => {
            setShowMenu(true);
          }}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt=""
        />
        {/**mobile nav */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } right-0 bottom-0 top-0 z-20 overflow-hidden bg-[#edf4fb] transition-all md:hidden`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="" />
            <img
              className="w-7"
              onClick={() => {
                setShowMenu(false);
              }}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="mt-5 flex flex-col items-center gap-2 px-5 text-lg font-medium">
            <NavLink to={"/"}>
              <p
                className={`inline-block rounded-full px-4 py-2`}
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                HOME
              </p>
            </NavLink>
            <NavLink to={"/doctors"}>
              <p
                className={`inline-block rounded-full px-4 py-2`}
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                DOCTORS
              </p>
            </NavLink>
            <NavLink to={"/about"}>
              <p
                className={`inline-block rounded-full px-4 py-2`}
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                ABOUT
              </p>
            </NavLink>
            <NavLink to={"/contact"}>
              <p
                className={`inline-block rounded-full px-4 py-2`}
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                CONTACT
              </p>
            </NavLink>
            <NavLink to={"/curanet"}>
              <p
                className={`inline-block rounded-full px-4 py-2`}
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                CURANET
              </p>
            </NavLink>
            <NavLink to={"/healtheducation"}>
              <p
                className={`inline-block rounded-full px-4 py-2`}
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                DOCS
              </p>
            </NavLink>
            <NavLink to={"/ehr"}>
              <p
                className={`inline-block rounded-full px-4 py-2`}
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                EHR
              </p>
            </NavLink>
            <NavLink to={"/healthaccess"}>
              <p
                className={`inline-block rounded-full px-4 py-2`}
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                CARELINK
              </p>
            </NavLink>
            <NavLink to={"/sponsors"}>
              <p
                className={`inline-block rounded-full px-4 py-2`}
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                SPONSORS
              </p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
