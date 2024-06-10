import { query } from '@/app/lib/db';

export const getPage = async (path) => {
    if (path == '/') {
        try {
            const homepageId = await query('SELECT value FROM settings WHERE name = ?', ['homepage']);
            const pageData = await query('SELECT id, created_at, title, category_id, ordering, published_at, alias, data FROM content WHERE id = ?', [parseInt(homepageId[0].value)]);

            return pageData.length > 0 ? pageData[0] : null;
        } catch (error) {
            console.error('Failed to fetch page data:', error);
            return null;
        }
    } else {
        try {
            // Remove leading slash and split the path into parts
            const parts = path.replace(/^\//, '').split('/');

            // Remove the last part as it's the alias
            const alias = parts.pop();

            // Initialize parent_id for the root category
            let parentId = null;

            // Traverse the categories table to find the final category id
            for (const part of parts) {
                let sql;
                let values;

                // If parentId is null, we need to find the category with the current part and a null parent_id
                if (parentId === null) {
                    sql = 'SELECT id FROM categories WHERE link = ? AND parent_id IS NULL';
                    values = [part];
                } else {
                    sql = 'SELECT id FROM categories WHERE link = ? AND parent_id = ?';
                    values = [part, parentId];
                }

                const categoryData = await query(sql, values);

                if (categoryData.length === 0) {
                    throw new Error(`Category not found for path part: ${part}`);
                }

                parentId = categoryData[0].id;
            }

            // Now, parentId should be the category_id of the final category in the path
            const sql = 'SELECT id, created_at, title, category_id, ordering, published_at, alias, data FROM content WHERE alias = ? AND category_id = ?';
            const values = [alias, parentId];
            const pageData = await query(sql, values);

            return pageData.length > 0 ? pageData[0] : null;
        } catch (error) {
            console.error('Failed to fetch page data:', error);
            return null;
        }
    }
};
