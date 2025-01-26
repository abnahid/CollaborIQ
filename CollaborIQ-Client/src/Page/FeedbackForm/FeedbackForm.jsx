import axios from "axios";
import { useEffect, useState } from "react";
import defaultProfile from "../../assets/defaultProfilePicture.jpg";

const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [institution, setInstitution] = useState("");
  const [photo, setPhoto] = useState(null);
  const [feedbackList, setFeedbackList] = useState([]);

  const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

  // Fetch feedback list on page load
  useEffect(() => {
    axios
      .get("http://localhost:5000/testimonial")
      .then((response) => setFeedbackList(response.data))
      .catch((error) => console.error("Error fetching testimonials:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let photoURL = defaultProfile; // Default profile picture

    if (photo) {
      const formData = new FormData();
      formData.append("image", photo);

      try {
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to upload image to ImgBB");
        }

        const data = await response.json();
        photoURL = data.data.url;
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    const feedbackData = {
      name,
      age,
      review,
      rating: parseFloat(rating),
      institution,
      img: photoURL,
    };

    // Submit the feedback to the API
    axios
      .post("http://localhost:5000/testimonial", feedbackData)
      .then((response) => {
        console.log("Feedback submitted:", response.data);
        setFeedbackList((prev) => [...prev, feedbackData]);
        // Clear form fields
        setName("");
        setAge("");
        setReview("");
        setRating("");
        setInstitution("");
        setPhoto(null);
      })
      .catch((error) => console.error("Error submitting feedback:", error));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Feedback Form */}
      <form
        className="max-w-md mx-auto p-6 bg-white border rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6">Feedback Form</h2>
        <div className="mb-4">
          <label
            htmlFor="profilePhoto"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Photo (optional):
          </label>
          <input
            type="file"
            id="profilePhoto"
            name="profilePhoto"
            accept="image/*"
            className="file-input file-input-bordered file-input-sm w-full mt-1"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="age">
            Age:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            id="age"
            type="text"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="institution"
          >
            Institution:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            id="institution"
            type="text"
            placeholder="Enter your institution name"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="review"
          >
            Feedback:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            id="review"
            rows="4"
            placeholder="Enter your feedback"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="rating"
          >
            Rating:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            id="rating"
            type="number"
            placeholder="Enter your rating (1-5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            step="0.1"
            min="1"
            max="5"
            required
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </form>

      {/* Feedback List */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Feedback List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {feedbackList.map((feedback) => (
            <div
              key={feedback._id}
              className="p-4 bg-gray-100 border rounded-lg shadow-md"
            >
              <img
                src={feedback.img}
                alt={feedback.name}
                className="w-16 h-16 rounded-full mx-auto"
              />
              <h3 className="text-lg font-bold mt-4 text-center">
                {feedback.name}
              </h3>
              <p className="text-sm text-gray-600 text-center">
                {feedback.institution}
              </p>
              <p className="text-sm mt-4">{feedback.review}</p>
              <p className="text-sm mt-2 font-bold text-yellow-500">
                Rating: {feedback.rating}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
