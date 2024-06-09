import fs from "fs";

// Replace with call to your database
export const getPage = (path) => {
    const allData = fs.existsSync("database.json")
        ? JSON.parse(fs.readFileSync("database.json", "utf-8"))
        : null;

    return allData ? allData[path] : null;
};