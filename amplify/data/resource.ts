import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*
  クロスワードパズルゲーム用のデータモデル
*/
const schema = a.schema({
  // パズルの定義
  Puzzle: a
    .model({
      title: a.string(),
      description: a.string(),
      size: a.integer(), // グリッドのサイズ (例: 15x15なら15)
      grid: a.string(), // JSON文字列としてグリッド情報を保存
      clues: a.string(), // JSON文字列として問題のヒントを保存
      difficulty: a.string(), // 難易度 (easy, medium, hard)
      createdAt: a.datetime(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  
  // ユーザーの進捗状況
  UserProgress: a
    .model({
      userId: a.string(), // 匿名ユーザーIDまたは認証済みユーザーID
      puzzleId: a.string(), // 関連するパズルのID
      currentGrid: a.string(), // 現在の解答状態をJSON文字列として保存
      isCompleted: a.boolean(),
      timeSpent: a.integer(), // 秒単位での経過時間
      lastUpdated: a.datetime(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
