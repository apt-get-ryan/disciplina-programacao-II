import express from "express";
import prescriptionService from "../services/PrescriptionService.js";
import multer from "multer";
import process from "process";
import path from "path";

const router  = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./MediApp/prescriptions");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({storage: storage});

router.post(
    "/uploadPrescription/:id", 
    upload.single("file"),
    async (req, res) => {
        try {
            const { id } = req.params;
            let prescription = await prescriptionService.getPrescription(id);

            const file = "./MediApp/prescriptions" + req.file.originalname;

            prescription = await prescriptionService.updatePrescription(id, { file });
            return res.status(200).send(prescription);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
);

router.get(
    "/readPrescription/:id",
    async (req, res) => {
        const { id } = req.params;
        try {
            const prescription = await prescriptionService.getPrescription(id);
            const filePath = path.resolve(process.cwd() + "/../" + prescription.file);
            return res.status(200).send(filePath)
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
)

router.get(
    "/prescriptions", async (req, res) => {
        try {
            const prescriptions = await prescriptionService.getAllPrescriptions();
            res.send(prescriptions);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
);

router.get(
    "/getPrescription/:id", async (req, res) => {
        const {id} = req.params;
        try {
            const prescription = await prescriptionService.getPrescription(id);
            res.send(prescription);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
);

router.post(
    "/postPrescription", async (req, res) => {
        const {date, appointmentId, medicine, dosage, instructions} = req.body;
        try {
            const prescription = await prescriptionService.savePrescription({date, appointmentId, medicine, dosage, instructions});
            res.send(prescription);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
);

router.put(
    "/prescriptions/:id", async (req, res) => {
        const {id} = req.params;
        const {date, appointmentId, medicine, dosage, instructions} = req.body;
        try {
            const prescription = await prescriptionService.updatePrescription(id, {date, doctorId, pacientId});
            res.send(prescription);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
);


router.delete(
    "/prescriptions/:id", async (req, res) => {
        const {id} = req.params;
        try {
            const prescription = await prescriptionService.deletePrescription(id);
            res.send(prescription);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
);


router.get("/generatePrescription/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const prescripton = await prescriptionService.getPrescription(id);
        const generatedPrescription = await prescriptionService.generatePrescriptionFile(prescripton);
        res.send(generatedPrescription);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})
export default router;