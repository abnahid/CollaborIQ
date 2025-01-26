/* eslint-disable no-unused-vars */
import Lottie from "lottie-react";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import singIn from "../assets/lottie/Animation - 1733417495925.json";
import { AuthContext } from "./../context/AuthProvider";

const PASSWORD_REQUIREMENTS = [
  { regex: /.{6,}/, text: "At least 6 characters" },
  { regex: /[0-9]/, text: "At least 1 number" },
  { regex: /[a-z]/, text: "At least 1 lowercase letter" },
  { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
];

const STRENGTH_CONFIG = {
  colors: {
    0: "bg-border",
    1: "bg-red-500",
    2: "bg-orange-500",
    3: "bg-amber-500",
    4: "bg-amber-700",
  },
  texts: {
    0: "Enter a password",
    1: "Weak password",
    2: "Medium password!",
    3: "Strong password!!",
    4: "Very Strong password!!!",
  },
};

const Register = () => {
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const [type, setType] = useState("password");
  const { createUser, updateUserProfile, setUser, googleLogin, gitHubLogin } =
    useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const calculateStrength = useMemo(() => {
    const requirements = PASSWORD_REQUIREMENTS.map((req) => ({
      met: req.regex.test(password),
      text: req.text,
    }));
    return {
      score: requirements.filter((req) => req.met).length,
      requirements,
    };
  }, [password]);

  const handleGitHub = () => {
    gitHubLogin()
      .then(() => {
        navigate(location?.state?.from || "/");
      })
      .catch((error) => toast.error(`GitHub Login Failed: ${error.message}`));
  };

  const handleGoogle = () => {
    googleLogin().then((result) => {
      navigate(location?.state?.from || "/");
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const photoUrl = form.get("photoUrl");
    const email = form.get("email");
    const password = form.get("password");

    console.log("Name:", name);
    console.log("Photo URL:", photoUrl);
    console.log("Email:", email);
    console.log("Password:", password);

    if (name.length < 5) {
      setError({ ...error, name: "Name should be more than 5 characters" });
      return;
    }

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    if (calculateStrength.score < 4) {
      toast.error("Password does not meet complexity requirements");
      return;
    }

    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("User created successfully!");
        setUser(user);

        return updateUserProfile({
          displayName: name,
          photoURL: photoUrl,
        });
      })
      .then(() => {
        navigate(location?.state?.from || "/");
      })
      .catch((err) => {
        console.error(err);
        toast.error(`Error: ${err.message}`);
      });
  };

  return (
    <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
      <div className="max-w-md w-full">
        <div className="p-8 rounded-2xl bg-white shadow">
          <h2 className="text-gray-800 text-center text-2xl font-bold my-3">
            Sign up
          </h2>
          <div>
            <button
              className="w-full font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow"
              onClick={handleGoogle}
            >
              <div className="bg-white p-2 rounded-full">
                <svg className="w-4" viewBox="0 0 533.5 544.3">
                  <path
                    d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                    fill="#4285f4"
                  />
                  <path
                    d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                    fill="#34a853"
                  />
                  <path
                    d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                    fill="#fbbc04"
                  />
                  <path
                    d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                    fill="#ea4335"
                  />
                </svg>
              </div>
              <span className="ml-4">Sign Up with Google</span>
            </button>
            <button
              className="w-full font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow mt-5"
              onClick={handleGitHub}
            >
              <div className="bg-white p-1 rounded-full">
                <svg className="w-6" viewBox="0 0 32 32">
                  <path
                    fillRule="evenodd"
                    d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z"
                  />
                </svg>
              </div>
              <span className="ml-4">Sign Up with GitHub</span>
            </button>

            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              <a
                href="#"
                className="text-xs text-center text-gray-500 uppercase"
              >
                or Sign up with email
              </a>
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>
          </div>
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                User name
              </label>
              <div className="relative flex items-center">
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-primary"
                  placeholder="Enter user name"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-4 h-4 absolute right-4"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path
                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                    data-original="#000000"
                  ></path>
                </svg>
                {error.name && (
                  <label className="label text-sm text-red-500">
                    {error.name}
                  </label>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-gray-800 text-sm mb-2 block">
                Photo URL
              </label>
              <input
                type="url"
                name="photoUrl"
                className="w-full pr-10 text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-primary"
                placeholder="Enter photo URL"
              />
            </div>

            <div className="mb-4">
              <label className="text-gray-800 text-sm mb-2 block">Email</label>
              <input
                type="email"
                name="email"
                className="w-full pr-10 text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-primary"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={isVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  aria-invalid={calculateStrength.score < 4}
                  aria-describedby="password-strength"
                  className="w-full p-2 border-2 rounded-md bg-background outline-none focus-within:border-secondary transition"
                />
                <button
                  type="button"
                  onClick={() => setIsVisible((prev) => !prev)}
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 outline-none flex items-center justify-center w-9 text-muted-foreground/80 hover:text-foreground"
                >
                  {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="flex gap-2 w-full justify-between mt-2">
                <span
                  className={`${
                    calculateStrength.score >= 1 ? "bg-green-200" : "bg-border"
                  } p-1 rounded-full w-full`}
                ></span>
                <span
                  className={`${
                    calculateStrength.score >= 2 ? "bg-green-300" : "bg-border"
                  } p-1 rounded-full w-full`}
                ></span>
                <span
                  className={`${
                    calculateStrength.score >= 3 ? "bg-green-400" : "bg-border"
                  } p-1 rounded-full w-full`}
                ></span>
                <span
                  className={`${
                    calculateStrength.score >= 4 ? "bg-green-500" : "bg-border"
                  } p-1 rounded-full w-full`}
                ></span>
              </div>

              <p
                id="password-strength"
                className="my-2 text-sm font-medium flex justify-between"
              >
                <span>Must contain:</span>
                <span>
                  {STRENGTH_CONFIG.texts[Math.min(calculateStrength.score, 4)]}
                </span>
              </p>

              <ul className="space-y-1.5" aria-label="Password requirements">
                {calculateStrength.requirements.map((req, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    {req.met ? (
                      <Check size={16} className="text-emerald-500" />
                    ) : (
                      <X size={16} className="text-muted-foreground/80" />
                    )}
                    <span
                      className={`text-xs ${
                        req.met ? "text-emerald-600" : "text-muted-foreground"
                      }`}
                    >
                      {req.text}
                      <span className="sr-only">
                        {req.met
                          ? " - Requirement met"
                          : " - Requirement not met"}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="acceptTerms"
                required
                className="h-4 w-4 shrink-0 text-primary focus:ring-btnHover border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-3 block text-sm text-gray-800"
              >
                Accept{" "}
                <a href="#" className="text-neutral-500 font-semibold">
                  Terms & Conditions
                </a>
              </label>
            </div>

            <div className="!mt-8">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-primary  focus:outline-none"
              >
                Sign up
              </button>
            </div>

            <p className="text-gray-800 text-sm !mt-8 text-center">
              Already Have An Account?{" "}
              <Link
                to="/login"
                className="text-primary hover:underline ml-1 whitespace-nowrap font-semibold"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="flex-1 bg-indigo-100 text-center hidden lg:flex items-center">
        <div className="m-12 xl:m-16 w-full">
          <Lottie animationData={singIn} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default Register;
