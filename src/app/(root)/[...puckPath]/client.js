"use client";

import { Render } from "@measured/puck";
import puckConfig from "../../../../puck.config";
import { Interweave } from "interweave";

export function Client({ data }) {
  const clientPuckConfig = {
    ...puckConfig,
    components: {
      ...puckConfig.components,
      Interweave: {
        ...puckConfig.components.Interweave,
        render: (({ content }) => (
          <Interweave content={content} />
        ))
      }
    }
  }
  return <Render
    config={clientPuckConfig}
    data={data}
  />;
}