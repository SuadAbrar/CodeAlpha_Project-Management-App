import { Routes, Route } from "react-router-dom";
import KanbanBoard from "./components/KanbanBoard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/projects/:projectId" element={<KanbanBoard />} />
        <Route path="/projects/:projectId/board" element={<KanbanBoard />} />
        <Route
          path="/"
          element={
            <div className="flex justify-center items-center h-screen">
              <h1 className="text-2xl">Welcome to Project Management App</h1>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
