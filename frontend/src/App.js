import './App.css';
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="todo-app">
      <TodoList />
      <div>
        <h1 className="left hideComplete"> Hide completed </h1>
      </div>
    </div>
  );
}

export default App;
