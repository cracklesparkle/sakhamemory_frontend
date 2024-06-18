import * as PDFJS from 'pdfjs-dist/build/pdf.min.mjs'
var pdf2img = require('pdf-img-convert');
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const pdfName = uuidv4();
    const pdfPath = path.join('public', 'uploads', `${pdfName}.pdf`);
    const outputDir = path.join('public', 'books', pdfName);

    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(pdfPath, buffer);

    try {
      const pdfArray = await pdf2img.convert(pdfPath);

      for (let i = 0; i < pdfArray.length; i++) {
        await fs.writeFile(path.join(outputDir, `output${i}.png`), pdfArray[i]);
      }

      return new Response(JSON.stringify({ message: 'PDF converted successfully', images: pdfArray.length }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error:', error);
      return new Response(JSON.stringify({ error: 'Error converting PDF' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    } finally {
      await fs.unlink(pdfPath);
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Error processing request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
