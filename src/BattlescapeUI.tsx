import React from "react";
import { ThemeProvider } from "styled-components";

import { useBgioClientInfo} from "bgio-contexts";
import { theme } from "./theme";
import { MapContextProvider, UIContextProvider } from "game-contexts";
import { Layout } from "ui/layout";
import { MapDisplay } from "ui/hexmap";
import { Controls } from "ui/controls";

export const BattlescapeUI = () => {
  const { playerID } = useBgioClientInfo();
  return (
    <ThemeProvider theme={theme(playerID)}>
      <UIContextProvider>
      <MapContextProvider>
        <Layout>
          <MapDisplay />
          <Controls />
        </Layout>
      </MapContextProvider>
      </UIContextProvider>
    </ThemeProvider>
  );
};

