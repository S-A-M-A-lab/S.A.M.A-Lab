const projectsRouter = require("express").Router();
const projects = require("../db/projects.js");

/**
 * Creates a new peoject route
 */
projectsRouter.post("/projects/add", async (req, res) => {
  try {
    const result = await projects.addProject(
      req.body.name,
      req.body.description,
      req.body.organizationID,
      req.body.userID
    );
    res.send(result);
  } catch (e) {
    console.log(e);
  }
});


/**
 * Get all projects by user id
 */
projectsRouter.get("/projects/all/:userID", async (req, res) => {
  try {
    const allProjects = await projects.getProjectsByUserID(req.params.userID);
    res.send(allProjects);
  } catch (err) {
    res.status(400).send("Something wrong happend!!");
    console.log(err);
  }
});

/**
 * Get all projects by user id and org id
 */
projectsRouter.get("/projects/all/:userID/:orgID", async (req, res) => {
  try {
    const allProjects = await projects.getProjectsByOrgIdAndUserID(req.params.userID, req.params.orgID);
    res.send(allProjects);
  } catch (err) {
    res.status(400).send("Something wrong happend!!");
    console.log(err);
  }
});

module.exports = projectsRouter;
