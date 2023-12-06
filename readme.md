## カルタグラフ
https://github.com/hibohiboo/kartagraph-monorepo/issues
https://github.com/users/hibohiboo/projects/3/views/1
https://d39tlgyf23zo7h.cloudfront.net/app/

project-root/
│
├── backend/              (バックエンドアプリケーションのソースコード)
├── frontend/             (フロントエンドアプリケーションのソースコード)
│   ├── src/              (フロントエンドのソースコード)
├── infrastructure/       (AWSインフラストラクチャコード)
│   ├── lib/    (AWS CloudFormationテンプレート)
│   ├── bin/           (デプロイスクリプトやAWS CLIコマンド)
│   ├── package.json   (デプロイ用npm scripts)
│
├── docs/                  (プロジェクト全体のドキュメント)
│     ├── contents 
│       ├── backend-api.md    (バックエンドAPIの仕様)
│       ├── frontend-doc.md   (フロントエンドの仕様)
│       ├── deployment.md     (AWSデプロイの手順)
│       ├── overall-doc.md    (プロジェクト全体の説明とガイド)
│
├── README.md             (プロジェクト全体の説明と導入ガイド)
├── package.json          (ルートの依存関係と設定)
├── packages

# プロジェクト情報

- **名前**: kartagraph-monorepo
- **バージョン**: 0.0.0
- **ライセンス**: MIT
- **作者**: hibohiboo

# スクリプト

- **prepare**: Gitフックを設定し、npm install実行時にフックディレクトリの変更を示すメッセージを表示。
- **build**: プロジェクトのビルドを行う。
- **ncu**: プロジェクトの依存ライブラリの更新を確認。
- **dev**: appとeditorを開発モードでローカル環境で実行する。
- **deploy**: プロジェクトのデプロイ。カレントディレクトリを "infrastructure" に変更して、そのディレクトリ内で npm run deploy を実行する。

# 開発依存関係

- **@testing-library/jest-dom**: バージョン "^6.1.4"
- **eslint**: バージョン "^8.54.0"
- **prettier**: バージョン "^3.1.0"
- **turbo**: バージョン "^1.10.16"

# パッケージマネージャ

- **npm**: バージョン "9.8.1"

# ワークスペース

- **"packages/*"**: "packages" ディレクトリ以下のすべてのディレクトリを対象とするワイルドカードパターン。
- **"app"**: "app" ディレクトリ。
- **"editor"**: "editor" ディレクトリ。