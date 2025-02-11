import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { Link } from "react-router-dom";

const Contact = () => {
  const form = useRef(); // Reference for the form
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        // process.env.REACT_APP_EMAILJS_SERVICE_ID,
        // process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        // form.current,
        // process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        "your_service_id", // Replace with your EmailJS service ID
        "your_template_id", // Replace with your EmailJS template ID
        form.current,
        "your_public_key"

      )
      .then(
        () => {
          setSuccessMessage("Your message has been sent successfully!");
          form.current.reset(); // Reset the form fields
        },
        (error) => {
          console.error("Failed to send message:", error);
        }
      );
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <header className="bg-primary text-white py-10 rounded-lg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-2 text-lg">
            We&apos;d love to hear from you! Reach out to us with any questions
            or feedback.
          </p>
        </div>
      </header>

      {/* Contact Form Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-6">
              Fill out the form below, and we&apos;ll get back to you as soon as
              possible.
            </p>
            <form ref={form} className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-primary"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-primary"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Your Message"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-primary"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition"
              >
                Send Message
              </button>
            </form>
            {successMessage && (
              <p className="mt-4 text-green-600 font-medium">
                {successMessage}
              </p>
            )}
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-600 mb-6">
              You can also reach us via email or phone. Our team is here to
              assist you!
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <IoCallOutline className="text-2xl text-primary" />
                <span className="text-gray-700">+1 (555) 987-6543</span>
              </li>
              <li className="flex items-center gap-4">
                <MdOutlineMarkEmailUnread className="text-2xl text-primary" />
                <span className="text-gray-700">support@crowd-nest.com</span>
              </li>
              <li className="flex items-center gap-4">
                <IoLocationOutline className="text-2xl text-primary" />
                <span className="text-gray-700">
                  456 Innovation Blvd, Dream City, Country
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-white py-10 rounded-lg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold">Join Us Today</h2>
          <p className="mt-2 text-lg">
            Become a part of the movement and make a difference.
          </p>
          <Link
            to="/campaigns"
            className="btn mt-4 px-6 py-3 bg-white text-primary rounded-lg shadow hover:bg-gray-100"
          >
            Explore Campaigns
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Contact;