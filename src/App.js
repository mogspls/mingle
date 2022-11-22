import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

//Views
import Homeview from "./views/Homeview";
import Chatbox from "./components/Chatbox"
import theme from "./theme"
import { ThemeProvider } from "@mui/material/styles";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Homeview/>} />
          <Route path="/chat" element={<Chatbox/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
