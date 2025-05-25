import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import CrosswordPuzzle from './CrosswordPuzzle';

const client = generateClient<Schema>();

interface PuzzleDetailProps {
  puzzleId: string;
  onBack: () => void;
}

const PuzzleDetail = ({ puzzleId, onBack }: PuzzleDetailProps) => {
  const [puzzle, setPuzzle] = useState<Schema['Puzzle']['type'] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPuzzle = async () => {
      try {
        const response = await client.models.Puzzle.get({ id: puzzleId });
        setPuzzle(response);
      } catch (err) {
        console.error('Error fetching puzzle:', err);
        setError('パズルの読み込み中にエラーが発生しました。');
      } finally {
        setLoading(false);
      }
    };

    fetchPuzzle();
  }, [puzzleId]);

  if (loading) {
    return <div>パズルを読み込み中...</div>;
  }

  if (error || !puzzle) {
    return (
      <div>
        <p>{error || 'パズルが見つかりませんでした。'}</p>
        <button onClick={onBack}>戻る</button>
      </div>
    );
  }

  return (
    <div className="puzzle-detail">
      <h2>{puzzle.title}</h2>
      <p>{puzzle.description}</p>
      <div className="puzzle-info">
        <span>難易度: {puzzle.difficulty}</span>
      </div>
      
      <CrosswordPuzzle />
      
      <button onClick={onBack} className="back-button">
        パズル一覧に戻る
      </button>
    </div>
  );
};

export default PuzzleDetail;
