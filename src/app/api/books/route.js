import mysql from 'mysql2/promise';

export async function GET(req, res) {
    const searchParams = req.nextUrl.searchParams
    const limit = searchParams.get('limit') || 10
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
            const [rows, fields] = await connection.execute(`SELECT * FROM books LIMIT ${limit}`);

            // Return the queried data as JSON response
            //res.status(200).json(rows);

            return Response.json(rows)
        } catch (error) {
            console.error('Error fetching books:', error);
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
