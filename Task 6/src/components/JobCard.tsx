import type { Job } from "../pages/JobListing";

const JobCard = ({ job, onClick }: { job: Job; onClick: () => void }) => {
  const colorVariants = [
    {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      border: "border-yellow-400",
    },
    { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-400" },
    { bg: "bg-green-100", text: "text-green-800", border: "border-green-400" },
    {
      bg: "bg-purple-100",
      text: "text-purple-800",
      border: "border-purple-400",
    },
    { bg: "bg-pink-100", text: "text-pink-800", border: "border-pink-400" },
    { bg: "bg-red-100", text: "text-red-800", border: "border-red-400" },
  ];

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-start mb-4">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
        <div className="ml-4">
          <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
          <p className="text-gray-500">
            {job.company} • {job.about.location}
          </p>
        </div>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

      <div className="flex flex-wrap gap-2">
        {job.about.categories.map((category, index) => {
          const color = colorVariants[index % colorVariants.length];
          return (
            <span
              key={index}
              className={`${color.bg} ${color.text} ${color.border} text-xs px-3 py-1 rounded-full border`}
            >
              {category}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default JobCard;
