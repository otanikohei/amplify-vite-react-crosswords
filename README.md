# AWS Amplify クロスワードパズルアプリ

このリポジトリは、AWS Amplify を使用して構築されたクロスワードパズルゲームアプリケーションです。React と Vite を使用して開発されており、AWS のサービスを活用した認証、API、データベース機能を備えています。

## 概要

このアプリケーションは、AWS サービスに関するクロスワードパズルを提供します。ユーザーはパズルを解いて AWS サービスについて学ぶことができます。

## 機能

- **クロスワードパズル**: インタラクティブなクロスワードパズルインターフェース
- **パズル一覧**: 複数のパズルから選択可能
- **進捗保存**: ユーザーの進捗状況を保存（実装予定）
- **認証**: Amazon Cognito による安全なユーザー認証（オプション）
- **データベース**: Amazon DynamoDB によるパズルデータと進捗状況の保存

## 使用技術

- React + Vite
- TypeScript
- AWS Amplify Gen2
- Amazon DynamoDB
- Amazon Cognito (オプション)
- react-crossword ライブラリ

## セットアップ方法

1. リポジトリをクローン:
   ```
   git clone https://github.com/yourusername/amplify-vite-react-crosswords.git
   cd amplify-vite-react-crosswords
   ```

2. 依存関係をインストール:
   ```
   npm install
   ```

3. Amplify バックエンドをデプロイ:
   ```
   npx amplify sandbox
   ```

4. ローカルで実行:
   ```
   npm run dev
   ```

## AWS へのデプロイ

詳細な手順については、[Amplify のドキュメント](https://docs.amplify.aws/react/start/quickstart/#deploy-a-fullstack-app-to-aws)を参照してください。

## セキュリティ

セキュリティの問題については、[CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications)を参照してください。

## ライセンス

このライブラリは MIT-0 ライセンスの下で提供されています。詳細は LICENSE ファイルを参照してください。