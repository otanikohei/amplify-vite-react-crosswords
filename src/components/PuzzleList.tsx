import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

interface PuzzleListProps {
  onSelectPuzzle: (puzzleId: string) => void;
}

const PuzzleList = ({ onSelectPuzzle }: PuzzleListProps) => {
  const [puzzles, setPuzzles] = useState<Array<Schema['Puzzle']['type']>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPuzzles = async () => {
      try {
        const response = await client.models.Puzzle.list();
        setPuzzles(response.data);
      } catch (error) {
        console.error('Error fetching puzzles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPuzzles();
  }, []);

  // サンプルパズルを作成する関数
  const createSamplePuzzle = async () => {
    try {
      const samplePuzzle = {
        title: 'AWS サービスクロスワード',
        description: 'AWSの主要サービスに関するクロスワードパズル',
        size: 15,
        grid: JSON.stringify({
          // グリッド情報をここに入れる
        }),
        clues: JSON.stringify({
          across: {
            1: 'AWSのサーバーレスコンピューティングサービス',
            4: 'AWSのデータベースサービス',
            6: 'AWSのストレージサービス',
          },
          down: {
            1: 'AWSのロードバランサーサービス',
            2: 'AWSのコンテナオーケストレーションサービス',
            3: 'AWSのCDNサービス',
            5: 'AWSのAPIゲートウェイサービス',
          },
        }),
        difficulty: 'medium',
        createdAt: new Date().toISOString(),
      };

      const newPuzzle = await client.models.Puzzle.create(samplePuzzle);
      setPuzzles([...puzzles, newPuzzle]);
    } catch (error) {
      console.error('Error creating sample puzzle:', error);
    }
  };

  if (loading) {
    return <div>パズルを読み込み中...</div>;
  }

  return (
    <div className="puzzle-list">
      <h2>クロスワードパズル一覧</h2>
      {puzzles.length === 0 ? (
        <div>
          <p>パズルがありません。サンプルパズルを作成しましょう。</p>
          <button onClick={createSamplePuzzle}>サンプルパズルを作成</button>
        </div>
      ) : (
        <ul>
          {puzzles.map((puzzle) => (
            <li key={puzzle.id} onClick={() => onSelectPuzzle(puzzle.id)}>
              <h3>{puzzle.title}</h3>
              <p>{puzzle.description}</p>
              <span>難易度: {puzzle.difficulty}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PuzzleList;
