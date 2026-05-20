import appointmentRepository from "../repositories/AppointmentRepository.js";

const getAllAppointments = async () => {
    return await appointmentRepository.getAllAppointments();
}

const getAppointment = async (id) => {
    return await appointmentRepository.getAppointment(id);
}

const saveAppointment = async ({date, doctorId, pacientId}) => {
    return await appointmentRepository.saveAppointment({date, doctorId, pacientId});
}

const updateAppointment = async (id, {date, doctorId, pacientId}) => {
    return await appointmentRepository.updateAppointment(id, {date, doctorId, pacientId});
}

const deleteAppointment = async (id) => {
    return await appointmentRepository.deleteAppointment(id);
}

const appointmentService = {
    getAllAppointments,
    getAppointment,
    saveAppointment,
    updateAppointment,
    deleteAppointment
}

export default appointmentService;