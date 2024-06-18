"use client";

import { Puck } from "@measured/puck";
import puckConfig from "../../../../puck.config";
import { useEffect } from "react";
import { slugify } from "transliteration";

export function Client({
  path,
  data,
  id,
  category_id
}) {
  useEffect(() => {
    
  }, [])

  return (
    <Puck
      config={puckConfig}
      data={data}
      headerPath={path}
      onPublish={async (data) => {
        if (id) {
          await fetch('/api/pages/edit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, category_id, path, data })
          })
        } else {
          await fetch('/api/pages/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ category_id, data })
          })
        }
      }}
    />
  );
}