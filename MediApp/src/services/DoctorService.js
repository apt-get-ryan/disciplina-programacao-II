import doctorRepository from "../repositories/DoctorRepository.js";

const getAllDoctors = async () => {
    return await doctorRepository.getAllDoctors();
}

const getDoctor = async (id) => {
    return await doctorRepository.getDoctor(id);
}

const saveDoctor = async ({name, login, password, medicalSpecialty, medicalRegistration, email, phone}) => {
    return await doctorRepository.saveDoctor({name, login, password, medicalSpecialty, medicalRegistration, email, phone});
}

const updateDoctor = async (id, {name, login, password, medicalSpecialty, medicalRegistration, email, phone}) => {
    return await doctorRepository.updateDoctor(id, {name, login, password, medicalSpecialty, medicalRegistration, email, phone}, {new: true});
}

const deleteDoctor = async (id) => {
    return await doctorRepository.deleteDoctor(id);
}

const getDoctorByLogin = async (login) => {
    return await doctorRepository.getDoctorByLogin(login);
}

const doctorService = {
    getAllDoctors,
    getDoctor,
    saveDoctor,
    updateDoctor,
    deleteDoctor,
    getDoctorByLogin
}

export default doctorService;