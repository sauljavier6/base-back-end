// middlewares/resizeCreditDocuments.ts

import fs from "fs";
import path from "path";
import sharp from "sharp";
import { Request, Response, NextFunction } from "express";

export const resizeCreditDocuments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    if (!files) return next();

    const uploadDir = path.join(__dirname, "../../uploads/credit-documents");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    for (const fieldName of Object.keys(files)) {
      const file = files[fieldName][0];

      const uniqueName = `Credit-${fieldName}-${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}.webp`;

      const outputPath = path.join(uploadDir, uniqueName);

      await sharp(file.buffer)
        .resize(1000, 700, { fit: "inside" })
        .toFormat("webp", { quality: 80 })
        .toFile(outputPath);

      // Sobrescribimos info para usarla en controller
      file.filename = uniqueName;
      file.path = outputPath;
    }

    next();
  } catch (error) {
    console.error("Error en resizeCreditDocuments:", error);
    next(error);
  }
};
