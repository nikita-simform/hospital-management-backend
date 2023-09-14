const express = require("express");
const {
  httpGetAllPatients,
  httpSavePatient,
  httpUpdatePatient,
  httpDeletePatient,
  httpFindPatientById,
  httpSearchPatient,
  httpFilterPatientByAge,
  temp,
  uploadCSV,
} = require("./patient.controller");
const { uploads } = require("../../services/multer");
const { patientValidations } = require("./patient.validations");
const { verifyToken } = require("../../utils/accessToken");

const patientRouter = express.Router();

patientRouter.post('/upload',verifyToken,uploads.single('csvFile'),uploadCSV);
patientRouter.get("/filter",verifyToken,httpFilterPatientByAge);
patientRouter.get("/all", verifyToken, httpGetAllPatients);
patientRouter.post("/add", verifyToken, patientValidations(), httpSavePatient);
patientRouter.put(
  "/update",
  verifyToken,
  patientValidations(),
  httpUpdatePatient
);
patientRouter.delete("/:id", verifyToken, httpDeletePatient);
patientRouter.get("/:id", verifyToken, httpFindPatientById);
patientRouter.get("/search/:key",verifyToken,httpSearchPatient);


module.exports = patientRouter;
