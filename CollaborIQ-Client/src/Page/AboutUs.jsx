import { Link } from "react-router-dom";

const AboutUs = () => {
    return (
        <div className="min-h-screen">
            {/* Header Section */}
            <header className="bg-primary text-white py-10 rounded-lg">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold">About Us</h1>
                    <p className="mt-2 text-lg">
                        Learn more about CollaborIQ, a platform designed for interactive and engaging group study.
                    </p>
                </div>
            </header>

            {/* Mission Section */}
            <section className="container mx-auto px-4 py-10">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-1/2">
                        <img
                            src="https://i.ibb.co/WKSXyhn/davide-ragusa.webp"
                            alt="Our Mission"
                            className="object-cover object-center w-full md:h-[500px] rounded-2xl"
                        />
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                        <p className="text-gray-600">
                            At <span className="font-bold">CollaborIQ</span>, our mission is to foster an interactive and collaborative learning environment where students can connect, share knowledge, and grow together. We believe that education thrives when learners engage with one another, exchange ideas, and support each other’s academic progress.
                        </p>
                        <p className="mt-4 text-gray-600">
                            Our platform is designed to make group study more effective by providing a structured space for students to create assignments, submit their work, and evaluate their peers’ submissions. By enabling seamless collaboration, real-time feedback, and constructive assessments, CollaborIQ enhances the learning experience, encourages critical thinking, and helps students develop valuable skills for both academic and professional success. Whether you're working on a challenging project, preparing for an exam, or simply looking to improve your understanding of a subject, CollaborIQ empowers you to achieve your goals with the support of a like-minded community.
                        </p>
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="bg-gray-100 py-10">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Vision</h2>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                        To revolutionize online group study by providing a seamless, interactive, and structured platform for students worldwide.
                    </p>
                </div>
            </section>

            {/* Meet Our Team Section */}
            <section className="container mx-auto px-4 py-10">
                <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Meet Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                        <img
                            src="https://i.ibb.co/h25Mptp/abnahid.jpg"
                            alt="Team Member"
                            className="w-24 h-24 mx-auto rounded-full"
                        />
                        <h3 className="mt-4 text-lg font-semibold text-gray-800">Abdul Jabbar Al Nahid</h3>
                        <p className="text-gray-600">Founder & Lead Developer</p>
                    </div>
                    <div>
                        <img
                            src="https://i.ibb.co/nsgmKpH/team-member.jpg"
                            alt="Team Member"
                            className="w-24 h-24 mx-auto rounded-full"
                        />
                        <h3 className="mt-4 text-lg font-semibold text-gray-800">Sarah Lee</h3>
                        <p className="text-gray-600">Operations Manager</p>
                    </div>
                    <div>
                        <img
                            src="https://i.ibb.co/xLVb14x/team-member2.webp"
                            alt="Team Member"
                            className="w-24 h-24 mx-auto rounded-full"
                        />
                        <h3 className="mt-4 text-lg font-semibold text-gray-800">Alex Johnson</h3>
                        <p className="text-gray-600">Marketing Head</p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-primary text-white py-10 rounded-lg text-center">
                <h2 className="text-3xl font-semibold">Join CollaborIQ Today</h2>
                <p className="mt-2 text-lg">
                    Engage in collaborative learning and enhance your academic experience.
                </p>
                <Link
                    to="/assignments"
                    className="btn mt-4 px-6 py-3 bg-white text-primary rounded-lg shadow hover:bg-gray-100"
                >
                    Explore Assignments
                </Link>
            </section>
        </div>
    );
};

export default AboutUs;
