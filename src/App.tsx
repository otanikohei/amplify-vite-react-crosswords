import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";
import CrosswordPuzzle from "./components/CrosswordPuzzle";
import PuzzleList from "./components/PuzzleList";
import PuzzleDetail from "./components/PuzzleDetail";
import "./App.css";

const client = generateClient<Schema>();

function App() {
  const [selectedPuzzleId, setSelectedPuzzleId] = useState<string | null>(null);
  const [showDemo, setShowDemo] = useState<boolean>(false);

  const handleSelectPuzzle = (puzzleId: string) => {
    setSelectedPuzzleId(puzzleId);
    setShowDemo(false);
  };

  const handleBackToList = () => {
    setSelectedPuzzleId(null);
    setShowDemo(false);
  };

  const handleShowDemo = () => {
    setShowDemo(true);
    setSelectedPuzzleId(null);
  };

  return (
    <div className="app-container">
      <header>
        <h1>AWS クロスワードパズル</h1>
      </header>

      <main>
        {showDemo ? (
          <>
            <button onClick={handleBackToList}>← パズル一覧に戻る</button>
            <CrosswordPuzzle />
          </>
        ) : selectedPuzzleId ? (
          <PuzzleDetail puzzleId={selectedPuzzleId} onBack={handleBackToList} />
        ) : (
          <>
            <PuzzleList onSelectPuzzle={handleSelectPuzzle} />
            <div className="demo-section">
              <h2>デモを試す</h2>
              <p>データベースを設定せずにデモのクロスワードパズルを試すことができます。</p>
              <button onClick={handleShowDemo}>デモを表示</button>
            </div>
          </>
        )}
      </main>

      <footer>
        <p>Powered by AWS Amplify</p>
      </footer>
    </div>
  );
}

export default App;
