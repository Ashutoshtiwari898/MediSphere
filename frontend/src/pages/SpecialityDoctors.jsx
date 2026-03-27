import React from "react";
import { useParams } from "react-router-dom";
import { specialityDoctors, specialityPageMeta } from "../data/specialityDoctorsData";

const SpecialityDoctors = () => {
  const { specialitySlug } = useParams();
  const pageMeta = specialityPageMeta[specialitySlug];
  const doctors = specialityDoctors[specialitySlug] || [];

  if (!pageMeta) {
    return (
      <div className="theme-card mx-auto max-w-4xl p-8 text-center">
        <h2 className="display-font text-3xl font-bold">Speciality Not Found</h2>
        <p className="mt-3 text-gray-600">Please choose a valid speciality from the menu.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-2 py-4 sm:px-4">
      <div className="theme-card p-6 sm:p-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary/80">MediSphere Specialists</p>
        <h1 className="display-font text-3xl font-bold sm:text-4xl">{pageMeta.title}</h1>
        <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">{pageMeta.description}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="theme-card overflow-hidden p-4">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="h-48 w-full rounded-xl border border-gray-100 bg-white/80 object-cover"
            />
            <div className="pt-4">
              <p className="display-font text-xl font-bold text-gray-900">{doctor.name}</p>
              <p className="mt-1 text-sm font-medium text-primary">{doctor.speciality}</p>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg border border-gray-200 bg-white/80 p-2">
                  <p className="text-[11px] uppercase tracking-wide text-gray-500">Experience</p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">{doctor.experience}</p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white/80 p-2">
                  <p className="text-[11px] uppercase tracking-wide text-gray-500">Cases</p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">{doctor.successfulCases}+</p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white/80 p-2">
                  <p className="text-[11px] uppercase tracking-wide text-gray-500">Fee</p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">Rs {doctor.fee}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialityDoctors;
