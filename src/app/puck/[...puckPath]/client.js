"use client";

import { Puck } from "@measured/puck";
import puckConfig from "../../../../puck.config";

export function Client({ path, data }) {
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