"use client";

import { Render } from "@measured/puck";
import puckConfig from "../../../../puck.config";

export function Client({ data }) {
  return <Render config={puckConfig} data={data} />;
}