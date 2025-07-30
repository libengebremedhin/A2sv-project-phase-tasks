import type { Job } from "../pages/JobListing";
import { CiCirclePlus, CiLocationOn, CiCircleCheck } from "react-icons/ci";
import { FaFire } from "react-icons/fa";
import { LuCalendarCheck, LuCalendarArrowUp } from "react-icons/lu";

const JobDetails = ({ job }: { job: Job }) => {
  const colorVariants = [
    {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      border: "border-yellow-400",
    },
    { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-400" },
    {
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-400",
    },
    {
      bg: "bg-purple-100",
      text: "text-purple-800",
      border: "border-purple-400",
    },
    { bg: "bg-pink-100", text: "text-pink-800", border: "border-pink-400" },
    { bg: "bg-red-100", text: "text-red-800", border: "border-red-400" },
  ];
  const ageLabels: Record<string, string> = {
  "18-24": "Young",
  "25-34": "Adult",
  "35-44": "Middle-aged",
  "45-54": "Experienced",
};


  return (
    <div className="grid grid-cols-4 bg-white rounded-lg shadow-md p-8 border border-gray-200 gap-12">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Description</h1>
        <p className="text-gray-700 mb-6">{job.description}</p>

        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Responsibilities
        </h2>
        <ul className="mb-6">
          {job.responsibilities.map((item, index) => (
            <li key={index} className="flex mb-2 items-center">
              <span className="mr-2">
                <CiCircleCheck className="text-green-700 text-2xl" />
              </span>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Ideal Candidate
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li className="font-semibold">
              {`${ageLabels[job.ideal_candidate.age]} (${
                job.ideal_candidate.age
              } year old)`}{" "}
              {job.ideal_candidate.gender}
            </li>
            {job.ideal_candidate.traits.map((trait, index) => (
              <li key={index} className="text-gray-700">
                {trait.includes(":") ? (
                  <>
                    <span className="font-semibold">
                      {trait.split(":")[0]}:
                    </span>{" "}
                    {trait.split(":").slice(1).join(":").trim()}
                  </>
                ) : (
                  trait
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">When & Where</h2>
          <p className="text-gray-700 flex gap-3">
            {" "}
            <CiLocationOn className="text-5xl text-blue-500 hover:text-blue-700 border-2 border-gray-300 rounded-full p-2" />{" "}
            {job.when_where}
          </p>
        </div>
      </div>
      <div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">About</h1>
          <ul className="flex flex-col gap-5">
            <li className="flex gap-2">
              <CiCirclePlus className="text-5xl text-blue-500 hover:text-blue-700 border-2 border-gray-300 rounded-full p-2" />
              <span className="text-center">
                <h3>Posted On</h3>
                <h2 className="font-semibold font-sans">
                  {job.about.posted_on}
                </h2>
              </span>
            </li>
            <li className="flex gap-2">
              <FaFire className="text-5xl text-blue-500 hover:text-blue-700 border-2 border-gray-300 rounded-full p-2" />
              <span className="text-center">
                <h3>Deadline</h3>
                <h2 className="font-semibold font-sans">
                  {job.about.deadline}
                </h2>
              </span>
            </li>
            <li className="flex gap-2">
              <CiLocationOn className="text-5xl text-blue-500 hover:text-blue-700 border-2 border-gray-300 rounded-full p-2" />
              <span className="text-center">
                <h3>Location</h3>
                <h2 className="font-semibold font-sans">
                  {job.about.location}
                </h2>
              </span>
            </li>
            <li className="flex gap-2">
              <LuCalendarArrowUp className="text-5xl text-blue-500 hover:text-blue-700 border-2 border-gray-300 rounded-full p-2" />
              <span className="text-center">
                <h3>Start Date</h3>
                <h2 className="font-semibold font-sans">
                  {job.about.start_date}
                </h2>
              </span>
            </li>
            <li className="flex gap-2">
              <LuCalendarCheck className="text-5xl text-blue-500 hover:text-blue-700 border-2 border-gray-300 rounded-full p-2" />
              <span className="text-center">
                <h3>End Date</h3>
                <h2 className="font-semibold font-sans">
                  {job.about.end_date}
                </h2>
              </span>
            </li>
          </ul>
        </div>
        <hr className="border-t-1 border-gray-400 my-5" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Categories</h1>
          <ul className="flex flex-wrap gap-3">
            {job.about.categories.map((category, index) => {
              const color = colorVariants[index % colorVariants.length];
              return (
                <li
                  key={index}
                  className={`${color.bg} ${color.text} ${color.border} text-xs px-3 py-1 rounded-full border`}
                >
                  {category}
                </li>
              );
            })}
          </ul>
        </div>
        <hr className="border-t-1 border-gray-400 my-5" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Required Skills
          </h1>
          <ul className="flex flex-wrap gap-3">
            {job.about.required_skills.map((skill, index) => (
              <li key={index} className="text-blue-700 tracking-tight">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
