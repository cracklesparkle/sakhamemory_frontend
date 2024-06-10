/**
 * This file implements a catch-all route that renders the user-facing pages
 * generated by Puck. For any route visited (with exception of other hardcoded
 * pages in /app), it will check your database (via `getPage`) for a Puck page
 * and render it using <Render>.
 *
 * All routes produced by this page are statically rendered using incremental
 * static site generation. After the first visit, the page will be cached as
 * a static file. Subsequent visits will receive the cache. Publishing a page
 * will invalidate the cache as the page is written in /api/puck/route.ts
 */

import { Client } from "./client";
import { notFound } from "next/navigation";
import { getPage } from "../../lib/get-page";

export async function generateMetadata({
    params: { puckPath = [] },
}) {
    const path = `/${puckPath.join("/")}`;

    const data = await getPage(path);
    if (!data) {
        return { title: "Страница не найдена" };
    }

    return {
        title: JSON.parse(data.data).root?.props?.title || "Без названия",
    };
}

export default async function Page({
    params: { puckPath = [] },
}) {
    const path = `/${puckPath.join("/")}`;
    const data = await getPage(path);

    if (!data) {
        return notFound();
    }

    return <Client data={JSON.parse(data.data)} />;
}

// Force Next.js to produce static pages: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
// Delete this if you need dynamic rendering, such as access to headers or cookies
export const dynamic = "force-static";