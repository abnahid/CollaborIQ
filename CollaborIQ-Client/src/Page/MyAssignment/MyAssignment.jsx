import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import AssignmentCard from "../AssignmentsCard/AssignmentCard";

const MyAssignment = () => {
    const allAssignments = useLoaderData(); // Load all assignments
    const { user } = useContext(AuthContext); // Get logged-in user info

    // Filter assignments where the logged-in user's email matches assignment email
    const userAssignments = allAssignments.filter(
        (assignment) => assignment.userEmail === user?.email
    );

    const [assignments, setAssignments] = useState(userAssignments);

    // Handle Deletion
    const handleDelete = (id) => {
        setAssignments(assignments.filter((ass) => ass._id !== id));
    };

    return (
        <div>
            {assignments.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {assignments.map((assignment) => (
                        <AssignmentCard
                            key={assignment._id}
                            assignment={assignment}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-4">
                    No assignments found for your account.
                </p>
            )}
        </div>
    );
};

export default MyAssignment;
