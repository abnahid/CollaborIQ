
# CollaborIQ

## Purpose:
This project is designed as part of a job assessment for BJET Inc., focusing on developing a web application for online group study. The platform allows users to create assignments, complete them, and grade their friends' assignments. It demonstrates proficiency in the MERN stack and key web development skills.

## Live URL:
[Live Site Link](#)

## Key Features:
- **User Authentication**: Email/password and social login (Google or GitHub).
- **Assignment Management**:
  - Create assignments with title, description, marks, and difficulty level.
  - View all assignments in a public listing.
  - Update and delete assignments (with permissions).
- **Submission and Evaluation**:
  - Submit assignments with a Google Docs link and notes.
  - Evaluate pending assignments and provide marks and feedback.
- **Dashboard**:
  - View submitted assignments with their status, marks, and feedback.
  - Track pending assignments awaiting evaluation.
- **Search and Filter**:
  - Search assignments by title.
  - Filter assignments by difficulty level.
- **Theme Toggle**: Switch between dark and light modes.
- **Validation**: Forms are validated to ensure proper data entry.
- **Responsive Design**: Optimized for mobile, tablet, and desktop.

## NPM Packages Used:
- `react-router-dom`: For navigation.
- `react-datepicker`: For date selection.
- `react-toastify`: For success/error messages.
- `dotenv`: For environment variable management.
- `jsonwebtoken (JWT)`: For authentication and route protection.
- `mongoose`: For MongoDB object modeling.
- `express`: Backend framework.
- `cors`: To handle cross-origin requests.
- `bcrypt`: For password hashing.
- `axios`: For API calls.

## Deployment:
- Client: Hosted on Firebase/Netlify.
- Server: Hosted on Vercel.

## Commits:
- **Client-side**: Minimum 15 meaningful commits with descriptive messages.
- **Server-side**: Minimum 8 meaningful commits with descriptive messages.

## Additional Notes:
- This application ensures smooth routing and prevents errors on reload.
- Designed with user-friendly navigation and responsive layouts.
- Includes validation for all forms and secure handling of sensitive information.

## Optional Features Implemented:
- Loading spinner during data fetch.
- Animations using Framer Motion.
