/**
 * This file implements a *magic* catch-all route that renders the Puck editor.
 *
 * This route exposes /puck/[...puckPath], but is disabled by middleware.ts. The middleware
 * then rewrites all URL requests ending in `/edit` to this route, allowing you to visit any
 * page in your application and add /edit to the end to spin up a Puck editor.
 *
 * This approach enables public pages to be statically rendered whilst the /puck route can
 * remain dynamic.
 *
 * NB this route is public, and you will need to add authentication
 */

import "@measured/puck/puck.css";
import { Client } from "./client";
import { getPage } from "@/app/lib/get-page";

export async function generateMetadata({
    params: { puckPath = [] },
}) {
    const path = `/${puckPath.join("/")}`;

    return {
        title: "Редактирование: " + path,
    };
}

export default async function Page({
    params: { puckPath = [] },
}) {
    const path = `/${puckPath.join("/")}`;
    const data = await getPage(path);

    return <Client
        id={data ? JSON.parse(data.id) : null}
        path={path}
        data={data ? JSON.parse(data.data) : []}
        category_id={data ? JSON.parse(data.category_id) : null}
    />;
}