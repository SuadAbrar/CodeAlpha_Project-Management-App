import KanbanBoard from './components/KanbanBoard';

function App() {
  // For demo purposes, using a hardcoded projectId
  // In a real app, this would come from routing or context
  const projectId = '507f1f77bcf86cd799439011'; // Replace with actual project ID

  return (
    <div className="App">
      <KanbanBoard projectId={projectId} />
    </div>
  );
}

export default App;
