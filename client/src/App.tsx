import React, {useContext, useEffect} from "react";
import { Game } from "./components/game/Game";
import { createTheme, ThemeProvider } from "@mui/material";
import MainLayout from "./MainLayout";
import { useAppSelector } from "./app/hooks";
import Form from "./components/Form/Form";

const theme = createTheme({
    palette: {
        secondary:{
            main: "#FF8000",
            light: "#FFFFFF"
        }
    }
})

function App(): JSX.Element {
  const loggedIn = useAppSelector(state => state.game.loggedIn);

  return (
    <Game> 
      <ThemeProvider theme={theme}>
      <div className="App">
          {loggedIn ? <MainLayout/> : <Form />}
      </div>
      </ThemeProvider>
    </Game>
  );
}

export default App;
