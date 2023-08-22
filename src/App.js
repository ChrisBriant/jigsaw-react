import './App.css';
import MainCanvasScreen from './components/MainCanvasScreen';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Header</p>
      </header>
      <main>
        <p>I am the canvas, I am the eggman</p>
        <MainCanvasScreen />
      </main>
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
}

export default App;
