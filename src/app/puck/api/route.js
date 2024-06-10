import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import fs from "fs";
import { getToken } from 'next-auth/jwt';

export async function verifyToken(request) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
        return false;
    }
    // You can add more checks here, like user roles or permissions
    return true;
}

export async function POST(request) {
    const isVerified = await verifyToken(request);
    if (!isVerified) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await request.json();

    // const existingData = JSON.parse(
    //     fs.existsSync("database.json")
    //         ? fs.readFileSync("database.json", "utf-8")
    //         : "{}"
    // );

    // const updatedData = {
    //     ...existingData,
    //     [payload.path]: payload.data,
    // };

    // fs.writeFileSync("database.json", JSON.stringify(updatedData));

    // Purge Next.js cache
    revalidatePath(payload.path);

    return NextResponse.json({ status: "ok" });
}
