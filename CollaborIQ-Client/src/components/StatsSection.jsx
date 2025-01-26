import { useEffect, useState } from "react";

const StatsSection = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch assignments data from the API
    const fetchAssignments = async () => {
      try {
        const response = await fetch(
          "https://collabor-iq-server.vercel.app/assignments"
        );
        const data = await response.json();
        setAssignments(data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const totalAssignments = assignments.length;
  const easyAssignments = assignments.filter(
    (assignment) => assignment.difficulty === "Easy"
  ).length;
  const completedAssignments = assignments.filter(
    (assignment) => assignment.marks === 100
  ).length;

  return (
    <div className="container mx-auto py-14">
      <div className="stats shadow w-full flex flex-wrap md:flex-nowrap justify-center md:justify-between gap-4">
        {/* Total Assignments */}
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Assignments</div>
          <div className="stat-value">{totalAssignments}</div>
          <div className="stat-desc">Assignments added to the platform</div>
        </div>

        {/* Easy Assignments */}
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Easy Assignments</div>
          <div className="stat-value">{easyAssignments}</div>
          <div className="stat-desc">Assignments marked as Easy</div>
        </div>

        {/* Completed Assignments */}
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Completed Assignments</div>
          <div className="stat-value">{completedAssignments}</div>
          <div className="stat-desc">Assignments with full marks</div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
