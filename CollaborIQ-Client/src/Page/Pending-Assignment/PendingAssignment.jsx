import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PendingAssignments = () => {
  const [pendingAssignments, setPendingAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [marks, setMarks] = useState("");
  const [feedback, setFeedback] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/submissions/pending")
      .then((response) => setPendingAssignments(response.data))
      .catch(() => toast.error("Failed to load pending assignments."));
  }, [axiosSecure]);

  const openModal = (assignment) => {
    setSelectedAssignment(assignment);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAssignment(null);
    setMarks("");
    setFeedback("");
    setModalOpen(false);
  };

  const handleSubmitMarks = () => {
    if (!marks || !feedback) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (marks < 0 || marks > 100) {
      toast.error("Marks must be between 0 and 100.");
      return;
    }

    axiosSecure
      .put(`/submissions/${selectedAssignment._id}`, {
        status: "Completed",
        marks,
        feedback,
      })
      .then(() => {
        toast.success("Marks submitted successfully!");
        closeModal();
        setPendingAssignments((prev) =>
          prev.filter((assignment) => assignment._id !== selectedAssignment._id)
        );
      })
      .catch(() => toast.error("Failed to submit marks."));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-center text-2xl md:text-3xl font-bold my-4">
        Pending Assignments
      </h1>
      {pendingAssignments.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No pending assignments available.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300">
                <th className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm sm:text-base">
                  #
                </th>
                <th className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm sm:text-base">
                  Examinee Email
                </th>
                <th className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm sm:text-base">
                  Quick Note
                </th>
                <th className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm sm:text-base">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {pendingAssignments.map((assignment, index) => (
                <tr
                  key={assignment._id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm sm:text-base text-center">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm sm:text-base text-center">
                    {assignment.user_email}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm sm:text-base">
                    {assignment.quickNote}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm sm:text-base text-center">
                    <button
                      className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg font-medium transition hover:bg-blue-600"
                      onClick={() => openModal(assignment)}
                    >
                      Evaluate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Marking Assignments */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="modal-box max-w-2xl w-full bg-white dark:bg-neutral-800 rounded-lg p-6">
            <h2 className="font-bold text-lg mb-4">Evaluate Assignment</h2>
            <div>
              <p className="mb-2">
                <strong>Google Docs Link:</strong>{" "}
                <a
                  href={selectedAssignment.googleDocsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Document
                </a>
              </p>
              <p className="mb-4">
                <strong>Quick Note:</strong> {selectedAssignment.quickNote}
              </p>
              <div className="form-group mb-4">
                <label
                  htmlFor="marks"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Marks:
                </label>
                <input
                  type="number"
                  id="marks"
                  className="input input-bordered w-full bg-white dark:bg-neutral-700 text-gray-700 dark:text-gray-300"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                />
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="feedback"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Feedback:
                </label>
                <textarea
                  id="feedback"
                  className="textarea textarea-bordered w-full bg-white dark:bg-neutral-700 text-gray-700 dark:text-gray-300"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button className="btn btn-success" onClick={handleSubmitMarks}>
                  Submit
                </button>
                <button className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingAssignments;
