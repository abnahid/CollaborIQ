import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MySubmissions = () => {
  const { user } = useContext(AuthContext);
  const [submissions, setSubmissions] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      // Fetch submissions only if user is logged in
      axiosSecure
        .get("/submissions")
        .then((data) => {
          const filteredSubmissions = data.data.filter(
            (submission) => submission.user_email === user.email
          );
          setSubmissions(filteredSubmissions);
        })
        .catch((error) => {
          console.error("Failed to load submissions:", error.message);
        });
    }
  }, [axiosSecure, user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
        My Submitted Assignments
      </h1>
      {user ? (
        submissions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-700">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300">
                  <th className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm sm:text-base">
                    #
                  </th>
                  <th className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm sm:text-base">
                    Google Docs Link
                  </th>
                  <th className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm sm:text-base">
                    Quick Note
                  </th>
                  <th className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm sm:text-base">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission, index) => (
                  <tr
                    key={submission._id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm sm:text-base text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm sm:text-base">
                      <a
                        href={submission.googleDocsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View Document
                      </a>
                    </td>
                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm sm:text-base">
                      {submission.quickNote?.slice(0, 80)}...
                    </td>
                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm sm:text-base text-center">
                      <span
                        className={`badge ${
                          submission.status === "Pending"
                            ? "badge-warning"
                            : "badge-success"
                        }`}
                      >
                        {submission.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No submissions found.
          </p>
        )
      ) : (
        <p className="text-center text-red-500 font-bold">
          You must be logged in to view submissions.
        </p>
      )}
    </div>
  );
};

export default MySubmissions;
