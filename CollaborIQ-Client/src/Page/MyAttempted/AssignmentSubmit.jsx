import { useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";

const AssignmentSubmit = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const assignment = location.state?.assignment;

  console.log(assignment);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const googleDocsLink = form.googleDocsLink.value;
    const quickNote = form.quickNote.value;

    const submissionData = {
      assignment_id: id,
      user_email: user?.email,
      googleDocsLink,
      quickNote,
      status: "Pending",
    };

    fetch("https://collabor-iq-server.vercel.app/submissions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(submissionData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Assignment submitted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/my-submissions");
        }
      });
  };

  return (
    <div className="card bg-base-100 w-full shadow-2xl">
      <h1 className="text-5xl font-bold text-center">Submit Your Assignment</h1>
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Google Docs Link</span>
          </label>
          <input
            type="url"
            name="googleDocsLink"
            placeholder="Google Docs Link"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Quick Note</span>
          </label>
          <textarea
            name="quickNote"
            placeholder="Add a quick note"
            className="textarea textarea-bordered"
            required
          ></textarea>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Submit Assignment</button>
        </div>
      </form>
    </div>
  );
};

export default AssignmentSubmit;
