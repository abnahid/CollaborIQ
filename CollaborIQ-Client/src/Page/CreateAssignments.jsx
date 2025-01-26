import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";
import "../index.css";

const CreateAssignments = () => {
  const { user } = useContext(AuthContext);
  const [dueDate, setDueDate] = useState(new Date());

  const handleCreateAssignments = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const title = form.get("title");
    const description = form.get("description");
    const marks = form.get("marks");
    const thumbnailUrl = form.get("thumbnailUrl");
    const difficulty = form.get("difficulty");
    const userEmail = form.get("userEmail");
    const userName = form.get("userName");

    const newAssignment = {
      title,
      description,
      marks: parseInt(marks, 100),
      thumbnailUrl,
      difficulty,
      dueDate,
      userEmail,
      userName,
    };

    fetch("https://collabor-iq-server.vercel.app/assignments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAssignment),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire({
            title: "Success!",
            text: "Assignment added successfully!",
            icon: "success",
            confirmButtonText: "Okay",
          });
          e.target.reset();
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-4xl bg-white dark:bg-neutral-800 shadow-lg rounded-lg overflow-hidden">
        <div className="bg-primary text-white py-6 px-8 text-center">
          <h1 className="text-3xl font-semibold">Create a New Assignment</h1>
          <p className="text-sm mt-2">
            Provide the details below to create an engaging assignment for your
            group.
          </p>
        </div>
        <div className="p-8">
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={handleCreateAssignments}
          >
            {/* Title */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter assignment title"
                className="input w-full bg-white border-gray-500  dark:bg-neutral-700 text-gray-700 dark:text-gray-300 placeholder-gray-400 "
              />
            </div>

            {/* Marks */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Marks
              </label>
              <input
                type="number"
                name="marks"
                placeholder="Enter total marks"
                className="input w-full bg-white border-gray-500  dark:bg-neutral-700 text-gray-700 dark:text-gray-300 placeholder-gray-400"
              />
            </div>

            {/* Assignment Difficulty Level */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Assignment Difficulty Level
              </label>
              <select
                name="difficulty"
                className="input w-full bg-white dark:bg-neutral-700 text-gray-700 dark:text-gray-300 border-gray-500"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            {/* Due Date */}
            <div className="col-span-1 md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Due Date
              </label>
              <DatePicker
                selected={dueDate}
                onChange={(date) => setDueDate(date)}
                className="input w-full bg-white border-gray-500 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 placeholder-gray-400"
              />
            </div>

            {/* Description */}
            <div className="col-span-1 md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Enter assignment description"
                className="input w-full bg-white border-gray-500  dark:bg-neutral-700 text-gray-700 dark:text-gray-300 placeholder-gray-400 px-3 py-2.5"
                rows="4"
              ></textarea>
            </div>

            {/* Thumbnail Image URL */}
            <div className="col-span-1 md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Thumbnail Image URL
              </label>
              <input
                type="text"
                name="thumbnailUrl"
                placeholder="Enter image URL"
                className="input border-gray-500 w-full bg-white dark:bg-neutral-700 text-gray-700 dark:text-gray-300 placeholder-gray-400"
              />
            </div>

            {/* User Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                User Email
              </label>
              <input
                type="email"
                name="userEmail"
                value={user?.email}
                readOnly
                className="input w-full bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300"
              />
            </div>

            {/* User Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                User Name
              </label>
              <input
                type="text"
                name="userName"
                value={user?.displayName}
                readOnly
                className="input w-full bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300"
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-1 md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-lg text-lg font-medium  transition-colors"
              >
                Create Assignment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignments;
