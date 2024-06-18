import mysql from 'mysql2/promise';

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams
    const category = decodeURIComponent(searchParams.get('category'))
    const limit = searchParams.get('limit') || 10
    const offset = searchParams.get('offset') || 0
    try {
        // Create a connection to the database
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            port: process.env.DB_PORT,
            //password: process.env.DB_PASS,
            database: process.env.DB_NAME
        })

        try {
            // Query the database
            const [rows, fields] = await connection.execute(`SELECT * FROM videos WHERE category = '${category}' LIMIT ${limit} OFFSET ${offset};`);
            console.log(rows)
            // Return the queried data as JSON response
            //res.status(200).json(rows);
            return Response.json(rows)
        } catch (error) {
            console.error('Error fetching movies:', error);
            //res.status(500).json({ error: 'Internal server error' });
        } finally {
            // Close the connection
            await connection.end();
        }
    } catch (error) {
        console.error('Error establishing database connection:', error);
        //res.status(500).json({ error: 'Internal server error' });
    }
}