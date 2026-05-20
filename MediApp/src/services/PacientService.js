import pacientRepository from "../repositories/PacientRepository.js";

const getAllPacients = async () => {
    return await pacientRepository.getAllPacients();
}

const getPacient = async (id) => {
    return await pacientRepository.getPacient(id);
}

const savePacient = async ({name, birthDate, email, phone}) => {
    return await pacientRepository.savePacient({name, birthDate, email, phone});
}

const updatePacient = async (id, {name, birthDate, email, phone}) => {
    return await pacientRepository.updatePacient(id, {name, birthDate, email, phone});
}

const deletePacient = async (id) => {
    return await pacientRepository.deletePacient(id);
}

const pacientService = {
    getAllPacients,
    getPacient,
    savePacient,
    updatePacient,
    deletePacient
}

export default pacientService;