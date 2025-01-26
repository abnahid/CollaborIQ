import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import AssignmentCard from "./AssignmentsCard/AssignmentCard";

const Assignments = () => {
  const assignment = useLoaderData();

  const [assignments, setAssignments] = useState(assignment);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("title");

  // Handle Deletion
  const handleDelete = (id) => {
    setAssignments(assignments.filter((ass) => ass._id !== id));
  };

  // Filter and Sort Assignments
  const filteredAndSortedAssignments = assignments
    .filter((ass) => ass?.title?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "difficulty") {
        const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      }
      return 0;
    });

  return (
    <div>
      {/* Search and Sort Section */}
      <div className="flex flex-wrap justify-between gap-4 m-4 my-8">
        {/* Search Bar */}
        <div className="w-[400px]">
          <label htmlFor="search" className="sr-only">
            Search Assignments
          </label>
          <input
            id="search"
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            name="search"
            placeholder="Search assignments"
            className="input input-bordered w-full bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-300 placeholder-gray-400 border border-gray-300 dark:border-gray-600"
          />
        </div>

        {/* Sorting Dropdown */}
        <div className="w-[200px]">
          <label htmlFor="sort" className="sr-only">
            Sort Assignments
          </label>
          <select
            id="sort"
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}
            className="select select-bordered w-full bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-600 border border-gray-300 dark:border-gray-600"
          >
            <option value="title">Sort by Title</option>
            <option value="difficulty">Sort by Difficulty</option>
          </select>
        </div>
      </div>

      {/* Assignment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredAndSortedAssignments.map((assignment) => (
          <AssignmentCard
            key={assignment._id}
            assignment={assignment}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Assignments;
