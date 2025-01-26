import { CalendarDays } from "lucide-react";
import { Link, useLoaderData } from "react-router-dom";

const AssignmentDetails = () => {
  const assignment = useLoaderData();

  // Helper function to calculate remaining time
  const calculateRemainingTime = (dueDate) => {
    const deadlineDate = new Date(dueDate);
    const currentDate = new Date();
    const timeRemaining = deadlineDate - currentDate;
    const days = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} days remaining` : "Past Due Date";
  };

  return (
    <main className="w-11/12 mx-auto pt-5 grid md:grid-cols-12 gap-6">
      {/* Main Content */}
      <section className="col-span-8">
        <h1 className="text-4xl font-bold mb-4 dark:text-white">
          {assignment.title}
        </h1>
        <div className="flex justify-between items-center mb-6">
          <p className="font-medium text-gray-700 dark:text-gray-300">
            {assignment.userName}
          </p>
          <a
            href={`mailto:${assignment.userEmail}`}
            className="px-4 py-2 bg-primary text-white rounded-md transition"
          >
            Contact
          </a>
        </div>

        {/* Assignment Image */}
        <div className="mb-8">
          <img
            src={assignment.thumbnailUrl}
            alt={assignment.title}
            className="rounded-lg shadow-md w-full"
          />
        </div>

        {/* Description Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">
            Assignment Description
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            {assignment.description}
          </p>
        </div>
      </section>

      {/* Assignment Details */}
      <aside className="col-span-4 md:mt-28">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">
            Assignment Details
          </h2>
          <div className="mb-4">
            <p className="text-lg font-medium dark:text-gray-300">
              <span className="text-gray-700 dark:text-gray-400">Marks:</span>{" "}
              {assignment.marks}
            </p>
            <p className="text-lg font-medium dark:text-gray-300">
              <span className="text-gray-700 dark:text-gray-400">
                Difficulty:
              </span>{" "}
              {assignment.difficulty}
            </p>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex gap-2 items-center mb-4">
            <CalendarDays />
            {calculateRemainingTime(assignment.dueDate)}
          </p>
          {/* Submission Button */}
          <Link to={`/submit-assignment/${assignment._id}`}>
            <button className="w-full py-2 rounded-md transition bg-primary text-white hover:bg-primary-dark">
              Submit Assignment
            </button>
          </Link>
        </div>
      </aside>
    </main>
  );
};

export default AssignmentDetails;
