
import Layout from "./routes/layout";

import { BrowserRouter } from "react-router-dom";

import { Route, Routes } from "react-router";
import Root from "./routes/root";
import PostInjuryIncident from "./routes/postInjuryIncident";
import PostAccident from "./routes/postAccident";
import ReasonableCauseSuspicion from "./routes/reasonableCauseSuspicion";

import "./App.css"

export default function App() {
  return (
    <div id="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Root />} />
            <Route path="/postAccident" element={<PostAccident />} />
            <Route path="/postInjuryIncident" element={<PostInjuryIncident />} />
            <Route path="/reasonableCauseSuspicion" element={<ReasonableCauseSuspicion />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
