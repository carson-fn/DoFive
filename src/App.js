import './styles/App.css';
import Home from './pages/Home.jsx';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>DO FIVE</h1>
        <p className="subtitle">The daily 5-minute challenge tracker</p>
      </header>

      <main className="app-content">
        <Home />
      </main>

      <footer className="app-footer">
        <p>© 2025 DoFive</p>
      </footer>
    </div>
  );
}

export default App;
