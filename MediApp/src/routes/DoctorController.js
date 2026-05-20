import express from "express";
import doctorService from "../services/DoctorService.js";
import bcrypt from  "bcrypt";


const router  = express.Router();

router.get(
    "/doctors", async (req, res) => {
        try {
            const doctors = await doctorService.getAllDoctors();
            res.send(doctors);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
);

router.get(
    "/getDoctor/:id", async (req, res) => {
        const {id} = req.params;
        try {
            const doctor = await doctorService.getDoctor(id);
            res.send(doctor);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
);

router.post(
    "/postDoctor", async (req, res) => {
        const {name, login, password, medicalSpecialty, medicalRegistration, email, phone} = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const doctor = await doctorService.saveDoctor({name, login, password: hashedPassword, medicalSpecialty, medicalRegistration, email, phone});
            res.send(doctor);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
);

router.put(
    "/doctors/:id", async (req, res) => {
        const {id} = req.params;
        const {name, login, password, medicalSpecialty, medicalRegistration, email, phone} = req.body;
        try {
            const doctor = await doctorService.updateDoctor(id, {name, login, password, medicalSpecialty, medicalRegistration, email, phone});
            res.send(doctor);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
);


router.delete(
    "/doctors/:id", async (req, res) => {
        const {id} = req.params;
        try {
            const doctor = await doctorService.deleteDoctor(id);
            res.send(doctor);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
);

export default router;