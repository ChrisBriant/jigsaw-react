import './App.css';
import MainCanvasScreen from './components/MainCanvasScreen';
import JigsawPieceSelect from './components/widgets/JigsawPieceSelect';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Header</p>
      </header>
      <main>
        <MainCanvasScreen />
        <JigsawPieceSelect />
      </main>
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
}

export default App;
