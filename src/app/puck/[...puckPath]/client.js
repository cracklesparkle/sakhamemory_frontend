"use client";

import { Puck } from "@measured/puck";
import puckConfig from "../../../../puck.config";
import { useEffect } from "react";

export function Client({ path, data, id }) {
  return (
    <Puck
      config={puckConfig}
      data={data}
      onPublish={async (data) => {
        await fetch("/puck/api", {
          method: "post",
          body: JSON.stringify({ data, path }),
        });
      }}
    />
  );
}