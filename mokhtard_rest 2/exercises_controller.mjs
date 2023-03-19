import "dotenv/config";
import * as users from "./exercises_model.mjs";
import express from "express";

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
 * Create a new user with the title, year and language provided in the body
 */
app.post("/exercises", (req, res) => {
  if (
    users.isRequestValid(
      req.body.weight,
      req.body.reps,
      req.body.date,
      req.body.unit
    )
  ) {
    users
      .createUser(
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit,
        req.body.date
      )
      .then((user) => {
        return res.status(201).json(user);
      })
      .catch((error) => {
        console.error(error);
        // In case of an error, send back status code 400 in case of an error.
        // A better approach will be to examine the error and send an
        // error status code corresponding to the error.
        res.status(400).json({ Error: "Invalid request" });
      });
  } else {
    res.status(400).json({ Error: "Invalid request" });
  }
});

/**
 * Retrive the user corresponding to the ID provided in the URL.
 */
app.get("/exercises/:_id", (req, res) => {
  const userId = req.params._id;
  users
    .findUserById(userId)
    .then((user) => {
      if (user !== null) {
        return res.status(200).json(user);
      } else {
        res.status(404).json({ Error: "Not found" });
      }
    })
});
/**
 * Retrieve users.
 * If the query parameters include a year, then only the users for that year are returned.
 * Otherwise, all users are returned.
 */
app.get("/exercises", (req, res) => {
  let filter = {};
  // Is there a query parameter named year? If so add a filter based on its value.
  if (req.query.year !== undefined) {
    filter = { year: req.query.year };
  }
  users
    .findUsers(filter, "", 0)
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      console.error(error);
      res.send({ Error: "Request failed" });
    });
});

/**
 * Update the user whose id is provided in the path parameter and set
 * its title, year and language to the values provided in the body.
 */
app.put("/exercises/:_id", (req, res) => {
  if (
    users.isRequestValid(
      req.body.weight,
      req.body.reps,
      req.body.date,
      req.body.unit
    )
  ) {
    users
      .replaceUser(
        req.params._id,
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit,
        req.body.date
      )
      .then((numUpdated) => {
        if (numUpdated === 1) {
          return res.status(200).json({
            _id: req.params._id,
            name: req.body.name,
            reps: req.body.reps,
            weight: req.body.weight,
            unit: req.body.unit,
            date: req.body.date,
          });
        } else {
          res.status(404).json({ Error: "Not Found" });
        }
      });
  } else {
    res.status(400).json({ Error: "Invalid request" });
  }
});

/**
 * Delete the user whose id is provided in the query parameters
 */
app.delete("/exercises/:_id", (req, res) => {
  users
    .deleteById(req.params._id)
    .then((deletedCount) => {
      if (deletedCount === 1) {
        res.status(204).send();
      } else {
        res.status(404).json({ Error: "Not Found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.send({ error: "Request failed" });
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
