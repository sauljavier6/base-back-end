// src/routes/saleRoutes.ts ✅
import { Router } from 'express';
import { createSolicitud } from '../controllers/creditController';
import { uploadCreditDocuments } from '../middlewares/uploadCreditDocuments';
import { resizeCreditDocuments } from '../middlewares/resizeCreditDocuments';

const router = Router();

router.post('/', uploadCreditDocuments, resizeCreditDocuments, createSolicitud);

export default router;
