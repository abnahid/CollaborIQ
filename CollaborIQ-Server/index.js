const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(
  cors({
    origin: ["http://localhost:5173", "https://ab-colloborl-q.netlify.app"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }

  // verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};

const uri = `mongodb+srv://${process.env.COLLABOR_IQ_USER}:${process.env.COLLABOR_IQ_USER_PASS}@cluster0.cx0gq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const testimonialCollection = client
      .db("collaborIQ")
      .collection("testimonial");
    const assignmentCollection = client
      .db("collaborIQ")
      .collection("assignments");
    const submissionsCollection = client
      .db("collaborIQ")
      .collection("submissions");

    // auth related APIs
    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10h",
      });

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    app.post("/logout", (req, res) => {
      res
        .clearCookie("token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    // Get All Assignments
    app.get("/assignments", async (req, res) => {
      const result = await assignmentCollection.find().toArray();
      res.send(result);
    });

    app.get("/assignments/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await assignmentCollection.findOne(query);
      res.send(user);
    });

    app.post("/assignments", async (req, res) => {
      const newJob = req.body;
      const result = await assignmentCollection.insertOne(newJob);
      res.status(201).send(result);
    });

    app.put("/assignments/:id", async (req, res) => {
      const id = req.params.id;
      const updatingData = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: updatingData,
      };
      const result = await assignmentCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    app.delete("/assignments/:id", async (req, res) => {
      const id = req.params.id;
      const { email } = req.body;
      const query = { _id: new ObjectId(id) };
      const assignment = await assignmentCollection.findOne(query);

      if (!assignment) {
        return res.status(404).send({ error: "Assignment not found" });
      }

      if (assignment.userEmail !== email) {
        return res.status(403).send({
          error: "Unauthorized: You can only delete assignments you created.",
        });
      }

      // Delete the assignment
      const result = await assignmentCollection.deleteOne(query);

      if (result.deletedCount > 0) {
        res.status(200).send({ message: "Assignment deleted successfully" });
      } else {
        res.status(500).send({ error: "Failed to delete the assignment" });
      }
    });

    // Get All Testimonials
    app.get("/testimonial", async (req, res) => {
      const result = await testimonialCollection.find().toArray();
      res.send(result);
    });

    app.post("/testimonial", async (req, res) => {
      const newJob = req.body;
      const result = await testimonialCollection.insertOne(newJob);
      res.send(result);
    });

    app.get("/submissions", verifyToken, async (req, res) => {
      const currentUserEmail = req.user.email;

      // Query to fetch submissions only for the current user
      const query = {
        user_email: currentUserEmail,
      };

      try {
        const result = await submissionsCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to fetch submissions" });
      }
    });

    // Get All Pending Submissions Excluding the Logged-in User's Submissions
    app.get("/submissions/pending", verifyToken, async (req, res) => {
      const currentUserEmail = req.user.email;
      const query = {
        status: "Pending",
        user_email: { $ne: currentUserEmail },
      };

      try {
        const result = await submissionsCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Failed to fetch pending submissions" });
      }
    });

    app.get("/submissions/:id", async (req, res) => {
      const id = req.params.id;
      const query = { assignment_id: id };

      try {
        const result = await submissionsCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Error fetching submissions" });
      }
    });

    app.post("/submissions", async (req, res) => {
      const { assignment_id, user_email, googleDocsLink, quickNote, status } =
        req.body;
      const result = await submissionsCollection.insertOne({
        assignment_id,
        user_email,
        googleDocsLink,
        quickNote,
        status,
      });
      res.send({ insertedId: result.insertedId });
    });

    app.put("/submissions/:id", async (req, res) => {
      const id = req.params.id;
      const updatingData = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: updatingData,
      };
      const result = await submissionsCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Run the database connection setup
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CollaborIQ Server</title>
      <style>
          body {
              margin: 0;
              font-family: Arial, sans-serif;
              background: linear-gradient(135deg, #0a9396, #94d2bd);
              color: #fefae0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
          }
          .container {
              text-align: center;
          }
          h1 {
              font-size: 3rem;
              margin-bottom: 10px;
          }
          p {
              font-size: 1.5rem;
              margin-top: 0;
          }
          .status {
              margin-top: 20px;
              padding: 10px 20px;
              border-radius: 5px;
              background-color: #e9d8a6;
              color: #005f73;
              font-weight: bold;
              font-size: 1.2rem;
              display: inline-block;
              animation: blink 1.5s linear infinite;
          }
          @keyframes blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>CollaborIQ Server</h1>
          <p>Your server is up and running!</p>
          <div class="status">Server is Running</div>
      </div>
  </body>
  </html>
  `);
});

app.listen(port, () => {
  console.log(`CollaborIQ Server running on ${port}`);
});
