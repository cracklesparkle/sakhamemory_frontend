// pages/api/file.js
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { verifyToken } from '@/app/puck/api/route';

// Directory to store uploaded files
const uploadDir = path.join(process.cwd(), 'public', 'uploads');

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

export async function POST(request) {
    const isVerified = await verifyToken(request);
    if (!isVerified) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } else {
        try {
            const formData = await request.formData();
            const file = formData.get('file');

            if (!file) {
                return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
            }

            // Example of handling the uploaded file
            const fileName = file.name;
            const filePath = path.join(uploadDir, fileName);

            // Convert ArrayBuffer to Buffer
            const buffer = Buffer.from(await file.arrayBuffer());

            // Write the file to the public/uploads directory
            await fs.promises.writeFile(filePath, buffer);

            const fileUrl = `/uploads/${fileName}`;
            return NextResponse.json({ url: fileUrl });
        } catch (error) {
            console.error('Error uploading file:', error);
            return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
        }
    }
}

export async function GET(request) {
    const { searchParams } = new URL(request.url, `${process.env.NEXTAUTH_URL}`);
    const filePath = searchParams.get('filePath');

    if (!filePath) {
        return NextResponse.json({ error: 'File path is required' }, { status: 400 });
    }

    const fullPath = path.join(uploadDir, filePath);

    try {
        // Check if the file exists
        if (!fs.existsSync(fullPath)) {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }

        // Return the file as a stream
        return new NextResponse(fs.createReadStream(fullPath));
    } catch (error) {
        console.error('Error retrieving file:', error);
        return NextResponse.json({ error: 'Failed to retrieve file' }, { status: 500 });
    }
}

// Export the POST and GET handlers
export default {
    POST,
    GET,
};