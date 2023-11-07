
import Layout from "./routes/layout";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes} from "react-router";
import Root from "./routes/root";
import PostInjuryIncident from "./routes/postInjuryIncident";
import PostAccident from "./routes/postAccident";
import ReasonableCauseSuspicion from "./routes/reasonableCauseSuspicion";
import Login from "./routes/login";
import "./App.css"
export default function App() {

  return (
      <div id="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Route path="/home" element={<Layout />} onEnter={requireAuth}/> */}
            <Route index element={<Root />} />
            <Route path="/postAccident" element={<PostAccident />} />
            <Route path="/postInjuryIncident" element={<PostInjuryIncident />} />
            <Route path="/reasonableCauseSuspicion" element={<ReasonableCauseSuspicion />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
    
    
  );
}
