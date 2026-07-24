# Todo App

React + Node.js/Express + SQLiteで作ったフルスタックTodoアプリです。
CRUD操作(作成・読み取り・更新・削除)を実際に手を動かしながら学ぶために制作しました。

## デモ

🔗 https://todo-app-three-lime-52.vercel.app

## 使用技術

**フロントエンド**
- React (useState, useEffect)
- Vite
- Vercel(デプロイ)

**バックエンド**
- Node.js / Express
- SQLite(`node:sqlite`)
- Render(デプロイ)

## 主な機能

- Todoの追加・削除・完了/未完了の切り替え・編集(CRUD)
- フィルター機能(全部 / 未完了 / 完了済み)
- レスポンシブ対応
- SQLiteによるデータの永続化

## こだわった点

- `useState`でUIの状態(入力中のテキスト、編集中のTodo、フィルターの状態など)を管理し、Reactの状態管理の基本を実践的に学びながら実装しました
- フロントエンド(React)とバックエンド(Express)を分離し、CRUD操作をREST API経由で行う設計にしました
- 開発中はlocalStorageでの管理から始め、Express + SQLiteでのデータ永続化に段階的に移行しました

## ローカルでの動かし方

\`\`\`bash
git clone https://github.com/tsunat973/todo-app.git
cd todo-app
npm install

# .envファイルを作成
echo "VITE_API_URL=http://localhost:3001" > .env

npm run dev
\`\`\`

※ ローカルでAPIも動かす場合は [todo-server](https://github.com/tsunat973/todo-server) を別途起動してください。
デモページ(Vercel)はRender上の本番バックエンドに接続しているため、ローカルでバックエンドを起動しなくても動作します。