import type { NextApiRequest, NextApiResponse } from 'next'
import { removeBackground } from "@imgly/background-removal-node";
import multer from "multer";
import path from "path";
import fs from "fs";

type ResponseData = {
    parsed_image_url: string
} | {
    error: string
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dateFolder = new Date().toISOString().split("T")[0];
    const uploadPath = path.join(process.cwd(), "public/uploads", dateFolder);
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const cleanupOldFolders = async (baseDir: string, keepFolder: string) => {
  try {
    try {
      await fs.promises.access(baseDir);
    } catch {
      return;
    }

    const items = await fs.promises.readdir(baseDir);

    await Promise.all(items.map(async (item) => {
      const itemPath = path.join(baseDir, item);
      
      try {
        const stats = await fs.promises.stat(itemPath);

        if (stats.isDirectory() && item !== keepFolder) {
          console.log(`Cleaning up old folder: ${item}`);
          await fs.promises.rm(itemPath, { recursive: true, force: true });
        }
      } catch (err) {
        console.error(`Failed to clean item ${item}:`, err);
      }
    }));
  } catch (error) {
    console.error("Critical error during cleanup:", error);
  }
};

const upload = multer({ storage: storage });

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
        return;
    }

    try {
        await new Promise<void>((resolve, reject) => {
            upload.single("image")(req as any, res as any, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });

        const uploadedFile = (req as any).file;

        if (!uploadedFile) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const dateFolder = new Date().toISOString().split("T")[0];
        const fileName = uploadedFile.filename;
        const filePath = path.join("public/uploads", dateFolder, fileName);

        const blobResult = await removeBackground(filePath);
        const arrayBuffer = await blobResult.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const processedFileName = `processed-${fileName.replace(path.extname(fileName), '.png')}`;
        const uploadsBaseDir = path.join(process.cwd(), "public/uploads");
        const outputDir = path.join(uploadsBaseDir, dateFolder);
        const outputFilePath = path.join(outputDir, processedFileName);

        await fs.promises.writeFile(outputFilePath, buffer);

        const publicUrl = `/uploads/${dateFolder}/${processedFileName}`;

            await cleanupOldFolders(uploadsBaseDir, dateFolder);

        res.status(200).json({ parsed_image_url: publicUrl });
    } catch (error) {
        console.log(error);

        res.status(500).json({ error: "Error uploading image" });
    }
}