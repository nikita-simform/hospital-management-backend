const Patient = require("./patient.mongo");

async function getAllPatients(skip, limit, sort) {
  return await Patient.find({}, { __v: 0 }).skip(skip).limit(limit).sort(sort);
}

async function getTotalPatient() {
  return await Patient.find({}).count();
}

async function savePatient(patient) {
  return await Patient.create(patient);
}

async function isExistingPatient(patientId) {
  const existingUser = await Patient.findOne({
    _id: patientId,
  });

  return existingUser;
}

async function updatePatient(patient) {
  return await Patient.updateOne(
    {
      _id: patient.id,
    },
    patient
  );
}

async function deletePatient(patientId) {
  return await Patient.deleteOne({
    _id: patientId,
  });
}

async function searchPatient(searchKey) {
  return await Patient.find(
    {
      $or: [
        { firstName: { $regex: searchKey, $options: "i" } },
        { middleName: { $regex: searchKey, $options: "i" } },
        { lastName: { $regex: searchKey, $options: "i" } },
        { address: { $regex: searchKey, $options: "i" } },
        { contact_number: { $regex: searchKey, $options: "i" } },
        { email: { $regex: searchKey } },
      ],
    },
    {
      __v: 0,
    }
  );
}

async function filterPatientByAge(minAge, maxAge) {
  return await Patient.find(
    {
      $and: [{ age: { $gte: minAge } }, { age: { $lt: maxAge } }],
    },
    {
      __v: 0,
    }
  );
}

async function uploadFile(csvData){
  return await Patient.insertMany(csvData);
}

module.exports = {
  getAllPatients,
  savePatient,
  isExistingPatient,
  updatePatient,
  deletePatient,
  getTotalPatient,
  searchPatient,
  filterPatientByAge,
  uploadFile
};
