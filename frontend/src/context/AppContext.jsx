import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { doctors as localDoctors } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = "$"
    const [doctors, setDoctors] = useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'
    const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");
    const [userData, setUserData] = useState(false)

    const normaliseDoctorList = (doctorList = []) => {
        return doctorList.map((doctor, index) => ({
            ...doctor,
            _id: doctor._id || `local-doc-${index + 1}`,
            available: typeof doctor.available === "boolean" ? doctor.available : true,
            fees: typeof doctor.fees === "number" ? doctor.fees : 50,
            slots_booked: doctor.slots_booked || {},
        }))
    }

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/doctor/list")
            const serverDoctors = Array.isArray(data?.doctors) ? data.doctors : []

            if (serverDoctors.length > 0) {
                setDoctors(normaliseDoctorList(serverDoctors))
                return
            }

            setDoctors(normaliseDoctorList(localDoctors))
        } catch (error) {
            console.log(error);
            setDoctors(normaliseDoctorList(localDoctors))
        }
    }

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/user/get-profile", { headers: { token } })

            if (data.success) {
                setUserData(data.userData)
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }


    

    useEffect(() => {
        getAllDoctors()
    }, [])

    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(false)
        }
    }, [])

    const value = { doctors, currencySymbol, token, setToken, backendUrl, userData, setUserData, loadUserProfileData,getAllDoctors}

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;