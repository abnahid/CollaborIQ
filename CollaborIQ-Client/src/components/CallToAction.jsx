import { Link } from "react-router-dom";
const CallToAction = () => {
  const featuresColumnOne = [
    { id: 1, title: "Effortless Assignment Submission" },
    { id: 2, title: "Comprehensive Review System" },
    { id: 3, title: "Organized Dashboard" },
  ];

  const featuresColumnTwo = [
    { id: 1, title: "Cross-Device Accessibility" },
    { id: 2, title: "Real-time Notifications" },
    { id: 3, title: "Secure API Integration" },
  ];

  return (
    <div className="relative overflow-hidden bg-primary rounded-2xl shadow-lg">
      <div className="px-8 py-6 sm:px-8 lg:px-12 lg:py-10">
        <div className="md:flex md:items-center md:space-x-12 lg:space-x-24">
          {/* Features Columns */}
          <div className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 gap-x-12 xl:gap-x-24">
            {/* Column One */}
            <div>
              <ul className="space-y-3 text-base font-medium text-white">
                {featuresColumnOne.map((feature) => (
                  <li key={feature.id} className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-green-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature.title}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column Two */}
            <div>
              <ul className="space-y-3 text-base font-medium text-white">
                {featuresColumnTwo.map((feature) => (
                  <li key={feature.id} className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-green-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-10 md:mt-0">
            <Link
              to="/signup"
              title="Get started now"
              className="inline-flex items-center justify-center px-9 py-3.5 text-base font-bold text-gray-900 transition-all duration-200 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white hover:bg-opacity-90 rounded-xl"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
