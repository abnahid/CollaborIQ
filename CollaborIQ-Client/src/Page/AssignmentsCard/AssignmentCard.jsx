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
    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4 shadow-md flex flex-col justify-between">
      {/* Image Section */}
      <div className="h-48 bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No Image
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-bold dark:text-white">{title}</h3>
        <div className="flex justify-between items-center text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            Marks: <span className="font-bold text-black dark:text-white">{marks}</span>
          </p>
          <p
            className={`px-3 py-1 text-white rounded-full text-xs ${difficulty === "Easy"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  justify-between gap-2 mt-2">
          <Link to={`/details/${_id}`} className="w-full md:w-auto">
            <button className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg font-medium transition hover:bg-blue-600 w-full">
              <Eye className="w-4 h-4 mr-2" />
              View
            </button>
          </Link>

          <Link to={`/update-campaign/${_id}`} className="w-full md:w-auto">
            <button className="flex items-center justify-center px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium transition hover:bg-yellow-600 w-full">
              <Edit className="w-4 h-4 mr-2" />
              Update
            </button>
          </Link>

          <button
            onClick={() => handleDelete(_id)}
            className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg font-medium transition hover:bg-red-600 w-full md:w-auto"
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
