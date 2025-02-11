import { createBrowserRouter } from "react-router-dom";
import Contact from "../components/Contact";
import AboutUs from "../Page/AboutUs";
import Assignments from "../Page/Assignments";
import AssignmentDetails from "../Page/AssignmentsCard/AssignmentDetails";
import CreateAssignments from "../Page/CreateAssignments";
import FeedbackForm from "../Page/FeedbackForm/FeedbackForm";
import Home from "../Page/Home";
import Login from "../Page/Login";
import MyAssignment from "../Page/MyAssignment/MyAssignment";
import AssignmentSubmit from "../Page/MyAttempted/AssignmentSubmit";
import MySubmissions from "../Page/MyAttempted/MySubmissions";
import PendingAssignment from "../Page/Pending-Assignment/PendingAssignment";
import Register from "../Page/Register";
import UpdateAssignments from "../Page/UpdateAssignments";
import MainLayout from "./../layouts/MainLayout";
import ErrorPage from "./../Page/ErrorPage";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
          loader: () =>
            fetch("https://collabor-iq-server.vercel.app/testimonial"),
        },
        {
          path: "/assignments",
          element: <Assignments></Assignments>,
          loader: () =>
            fetch("https://collabor-iq-server.vercel.app/assignments"),
        },
        {
          path: "/my-assignments",
          element: <MyAssignment></MyAssignment>,
          loader: () =>
            fetch("https://collabor-iq-server.vercel.app/assignments"),
        },
        {
          path: "/contact",
          element: <Contact></Contact>,

        },
        {
          path: "/about-us",
          element: <AboutUs></AboutUs>,

        },
        {
          path: "/Details/:id",
          element: (
            <PrivateRoute>
              <AssignmentDetails></AssignmentDetails>
            </PrivateRoute>
          ),
          loader: ({ params }) =>
            fetch(
              `https://collabor-iq-server.vercel.app/assignments/${params.id}`
            ),
        },
        {
          path: "/submit-assignment/:id",
          element: (
            <PrivateRoute>
              <AssignmentSubmit></AssignmentSubmit>
            </PrivateRoute>
          ),
        },
        {
          path: "/create-assignments",
          element: (
            <PrivateRoute>
              <CreateAssignments></CreateAssignments>
            </PrivateRoute>
          ),
        },
        {
          path: "/my-submissions",
          element: (
            <PrivateRoute>
              <MySubmissions></MySubmissions>
            </PrivateRoute>
          ),
        },
        {
          path: "/feed-back-form",
          element: (
            <PrivateRoute>
              <FeedbackForm></FeedbackForm>
            </PrivateRoute>
          ),
        },
        {
          path: "/pending-assignment",
          element: <PendingAssignment></PendingAssignment>,
          loader: () =>
            fetch("https://collabor-iq-server.vercel.app/submissions"),
        },
        {
          path: "update-campaign/:id",
          element: (
            <PrivateRoute>
              <UpdateAssignments></UpdateAssignments>
            </PrivateRoute>
          ),
          loader: ({ params }) =>
            fetch(
              `https://collabor-iq-server.vercel.app/assignments/${params.id}`
            ),
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/register",
          element: <Register></Register>,
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
