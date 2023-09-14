const {
  getAllPatients,
  savePatient,
  isExistingPatient,
  updatePatient,
  deletePatient,
  getTotalPatient,
  searchPatient,
  filterPatientByAge,
  uploadFile,
} = require("../../models/patient/patient.model");
const { validationResult } = require("express-validator");
const { getPagination, getSorting } = require("../../utils/query");
const { httpResponse, httpErrorResponse } = require("../../utils/httpResponse");
const csv = require("csvtojson");

async function httpGetAllPatients(req, res) {

  try {
    const { skip, limit } = getPagination(req.query);
    const sort = getSorting(req.query);

    return httpResponse(res, 200, '', {
      patients: await getAllPatients(skip, limit, sort),
      total: await getTotalPatient()
    })
  } catch (error) {
    return httpErrorResponse(res, error);
  }
}

async function httpSavePatient(req, res) {

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return httpResponse(res, 400, { error: errors.array()[0].msg });
    }

    const patient = req.body;
    const result = await savePatient(patient);
    return httpResponse(res, 201, 'Patient created successfully', { result });
  }
  catch (error) {
    return httpErrorResponse(res, error);
  }
}

async function httpUpdatePatient(req, res) {

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return httpResponse(res, 400, { error: errors.array()[0].msg });
    }

    const patient = req.body;
    if (!patient.id) {
      return httpResponse(res, 400, { error: 'Patient id is required' });
    }
    const existingPatient = await isExistingPatient(patient.id);
    if (!existingPatient) {
      return httpResponse(res, 404, { error: 'Patient not found' });
    }
    const result = await updatePatient(patient);
    return httpResponse(res, 200, 'Patient details updated successfully', { result });
  }
  catch (error) {
    return httpErrorResponse(res, error);
  }
}

async function httpDeletePatient(req, res) {
  const patientId = req.params.id;

  try {
    const patient = await isExistingPatient(patientId);
    if (!patient) {
      return httpResponse(res, 404, { error: 'Patient not found' });
    }

    const deletedPatient = await deletePatient(patientId);
    if (!deletedPatient) {
      return httpResponse(res, 400, { error: 'Problem deleting patient' });
    }

    return httpResponse(res, 200, 'Patient deleted successfully');
  }
  catch (error) {
    return httpErrorResponse(res, error);
  }
}

async function httpFindPatientById(req, res) {
  const patientId = req.params.id;

  try {
    const patient = await isExistingPatient(patientId);
    if (!patient) {
      return httpResponse(res, 404, { error: 'Patient not found' });
    }
    return httpResponse(res, 200, '', { result: patient });
  } catch (error) {
    return httpErrorResponse(res, error);
  }

}

async function httpSearchPatient(req, res) {
  const searchKey = req.params.key;

  try {
    const patients = await searchPatient(searchKey);
    if (patients.length == 0) {
      return httpResponse(res, 200, 'No records found');
    }
    return httpResponse(res, 200, '', { result: patients });
  } catch (error) {
    return httpErrorResponse(res, error);
  }
}

async function httpFilterPatientByAge(req, res) {
  const { minAge, maxAge } = req.query;

  try {
    if (!minAge || !maxAge || isNaN(minAge) || isNaN(maxAge)) {
      return httpResponse(res, 400, { error: 'Please enter valid age' });
    }

    if (minAge > maxAge) {
      return httpResponse(res, 400, { error: 'MinAge should not be greater than maxAge' });
    }

    const patients = await filterPatientByAge(minAge, maxAge);
    if (patients.length == 0) {
      return httpResponse(res, 200, 'No records found');
    }
    return httpResponse(res, 200, '', { result: patients });
  }
  catch (error) {
    return httpErrorResponse(res, error);
  }
}

function uploadCSV(req, res) {
  if (!req.file.path) {
    return httpResponse(res, 200, 'No CSV file found');
  }
  csv()
    .fromFile(req.file.path)
    .then(async (response) => {
      await uploadFile(response);
      return httpResponse(res, 200, 'CSV file uploaded successfully');
    })
    .catch((error) => {
      return httpResponse(res, 400, { error: 'Error in uploading CSV file' });
    });
}

module.exports = {
  httpGetAllPatients,
  httpSavePatient,
  httpUpdatePatient,
  httpDeletePatient,
  httpFindPatientById,
  httpSearchPatient,
  httpFilterPatientByAge,
  uploadCSV,
};
