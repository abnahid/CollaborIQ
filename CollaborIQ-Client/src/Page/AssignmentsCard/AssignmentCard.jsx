/* eslint-disable react/prop-types */
import { Edit, Eye, Trash2 } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";

const AssignmentCard = ({ assignment, onDelete }) => {
  const { user } = useContext(AuthContext);
  const { thumbnailUrl, title, marks, difficulty, _id, userEmail } = assignment;

  const handleDelete = (_id) => {
    // Ensure the logged-in user matches the creator's email
    if (userEmail !== user.email) {
      Swal.fire({
        title: "Unauthorized",
        text: "You can only delete assignments that you created.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this assignment? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://collabor-iq-server.vercel.app/assignments/${_id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email }), // Pass logged-in user's email
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              Swal.fire({
                title: "Deleted!",
                text: "The assignment has been deleted successfully.",
                icon: "success",
              });
              onDelete(_id); // Notify parent component to update UI
            } else {
              Swal.fire({
                title: "Error!",
                text: data.error || "Failed to delete the assignment.",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting assignment:", error);
            Swal.fire({
              title: "Error!",
              text: "An error occurred while deleting the assignment.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4 shadow-md">
      {/* Image Section */}
      <div className="bg-gray-100 dark:bg-gray-700 h-48 rounded-lg mb-4">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="flex items-center justify-center h-full skeleton">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div>
        <h3 className="text-lg font-bold dark:text-white">{title}</h3>
        <div className="flex justify-between my-3">
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Marks:{" "}
            <span className="font-bold text-black dark:text-white">
              {marks}
            </span>
          </p>

          <p
            className={`text-sm font-medium mt-2 rounded-full py-1 px-4 text-white ${
              difficulty === "Easy"
                ? "bg-green-500"
                : difficulty === "Medium"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          >
            {difficulty}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-4 space-x-2">
          {/* View Assignment */}
          <Link to={`/details/${_id}`}>
            <button
              className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg font-medium transition hover:bg-blue-600"
              title="View Assignment"
            >
              <Eye className="w-4 h-4 mr-2" />
              View
            </button>
          </Link>

          {/* Update Assignment */}
          <Link to={`/update-campaign/${_id}`}>
            <button
              className="flex items-center justify-center px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium transition hover:bg-yellow-600"
              title="Update Assignment"
            >
              <Edit className="w-4 h-4 mr-2" />
              Update
            </button>
          </Link>

          {/* Delete Assignment */}
          <button
            onClick={() => handleDelete(_id)}
            className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg font-medium transition hover:bg-red-600"
            title="Delete Assignment"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
