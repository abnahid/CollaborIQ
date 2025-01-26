import {
  CheckSquare,
  FilePlus,
  LayoutDashboard,
  Smartphone,
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <FilePlus className="w-8 h-8 text-blue-500" />,
      title: "Easy Submission",
      description: "Submit assignments in just a few clicks.",
    },
    {
      icon: <CheckSquare className="w-8 h-8 text-green-500" />,
      title: "Review System",
      description: "Grade assignments with accurate feedback.",
    },
    {
      icon: <LayoutDashboard className="w-8 h-8 text-yellow-500" />,
      title: "Organized Dashboard",
      description: "Manage assignments efficiently.",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-purple-500" />,
      title: "Accessible Anytime",
      description: "Works seamlessly across all devices.",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="max-w-xl mx-auto text-center xl:max-w-2xl mb-8">
          <h2 className="font-bold text-center text-gray-800 dark:text-gray-100 sm:text-4xl xl:text-3xl mb-6">
            Streamline Your Assignment Management
          </h2>
          <p className="mb-4">
            Our platform is designed to make assignment management faster,
            smarter, and more efficient—whether you&apos;re a student or an
            educator.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
