import { useState, useCallback } from 'react';
import Crossword from '@jaredreisinger/react-crossword';

// サンプルのクロスワードデータ
const sampleData = {
  across: {
    1: {
      clue: 'AWSのサーバーレスコンピューティングサービス',
      answer: 'LAMBDA',
      row: 0,
      col: 0,
    },
    4: {
      clue: 'AWSのデータベースサービス',
      answer: 'DYNAMODB',
      row: 2,
      col: 0,
    },
    6: {
      clue: 'AWSのストレージサービス',
      answer: 'S3',
      row: 4,
      col: 3,
    },
  },
  down: {
    1: {
      clue: 'AWSのロードバランサーサービス',
      answer: 'ELB',
      row: 0,
      col: 0,
    },
    2: {
      clue: 'AWSのコンテナオーケストレーションサービス',
      answer: 'ECS',
      row: 0,
      col: 2,
    },
    3: {
      clue: 'AWSのCDNサービス',
      answer: 'CLOUDFRONT',
      row: 0,
      col: 5,
    },
    5: {
      clue: 'AWSのAPIゲートウェイサービス',
      answer: 'APIGATEWAY',
      row: 2,
      col: 7,
    },
  },
};

const CrosswordPuzzle = () => {
  const [completed, setCompleted] = useState<boolean>(false);

  const onCrosswordComplete = useCallback((isCorrect: boolean) => {
    if (isCorrect) {
      setCompleted(true);
    }
  }, []);

  return (
    <div className="crossword-container">
      <h2>AWS サービスクロスワード</h2>
      <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
        <Crossword
          data={sampleData}
          onCrosswordComplete={onCrosswordComplete}
        />
      </div>
      {completed && (
        <div className="completion-message">
          <h3>おめでとうございます！クロスワードを完成させました！</h3>
        </div>
      )}
    </div>
  );
};

export default CrosswordPuzzle;
