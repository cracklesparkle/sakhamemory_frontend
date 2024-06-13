// pages/api/file/list.js
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const uploadDir = path.join(process.cwd(), 'public', 'uploads');

export async function GET(request) {
    const { searchParams } = new URL(request.url, `${process.env.NEXTAUTH_URL}`);
    const directoryPath = searchParams.get('directoryPath') || '';

    const fullPath = path.join(uploadDir, directoryPath);

    try {
        // Check if the directory exists
        if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isDirectory()) {
            return NextResponse.json({ error: 'Directory not found' }, { status: 404 });
        }

        // Read directory contents
        const files = fs.readdirSync(fullPath).map(file => {
            const filePath = path.join(fullPath, file);
            const fileStats = fs.statSync(filePath);
            return {
                path: path.join(directoryPath, file),
                name: file,
                type: fileStats.isDirectory() ? 'directory' : 'file',
            };
        });

        return NextResponse.json({ files });
    } catch (error) {
        console.error('Error listing directory:', error);
        return NextResponse.json({ error: 'Failed to list directory' }, { status: 500 });
    }
}

export default {
    GET,
};