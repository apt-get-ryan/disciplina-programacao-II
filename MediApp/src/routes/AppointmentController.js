import express from "express";
import appointmentService from "../services/AppointmentService.js";


const router  = express.Router();

router.get(
    "/appointments", async (req, res) => {
        try {
            const appointments = await appointmentService.getAllAppointments();
            console.log(appointments);
            res.send(appointments);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
);

router.get(
    "/getAppointment/:id", async (req, res) => {
        const {id} = req.params;
        try {
            const appointment = await appointmentService.getAppointment(id);
            res.send(appointment);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
);

router.post(
    "/postAppointment", async (req, res) => {
        const {date, doctorId, pacientId} = req.body;
        try {
            const appointment = await appointmentService.saveAppointment({date, doctorId, pacientId});
            res.send(appointment);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
);

router.put(
    "/appointments/:id", async (req, res) => {
        const {id} = req.params;
        try {
            const appointment = await appointmentService.updateAppointment(id, {date, doctorId, pacientId});
            res.send(appointment);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
);


router.delete(
    "/appointments/:id", async (req, res) => {
        const {id} = req.params;
        const {date, doctorId, pacientId} = req.body;
        try {
            const appointment = await appointmentService.deleteAppointment(id);
            res.send(appointment);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
);

router.put(
    "/reschedule/:id", async (req, res) => {
        const { id } = req.params;
        const { date } = req.body;
        try {
            let appointment = await appointmentService.getAppointment(id);
            appointment.date = date;

            appointment = await appointmentService.updateAppointment(id, { date: date});
            res.send(appointment);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
);

export default router;