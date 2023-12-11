<div><img src="./docs/assets/images/demo.png" /></div>

## カルタグラフ
[カルタグラフ - app](https://d39tlgyf23zo7h.cloudfront.net/app/)  

[openapi backend](https://hibohiboo.github.io/kartagraph-monorepo/public/kartagraph-openapi/)  
[jest-report packages/worker](https://hibohiboo.github.io/kartagraph-monorepo/public/jest-reports-worker/jest.html)  
[storybook packages/ui](https://hibohiboo.github.io/kartagraph-monorepo/public/kartagraph-components/)  

[wiki](https://github.com/hibohiboo/kartagraph-monorepo/wiki/%E3%83%95%E3%83%AD%E3%83%B3%E3%83%88%E3%82%A8%E3%83%B3%E3%83%89)  
[Backlogs](https://github.com/hibohiboo/kartagraph-monorepo/issues)  
[Projects](https://github.com/users/hibohiboo/projects/3/views/1)  

```
project-root/
│
├── backend/              (バックエンドアプリケーションのソースコード)
├── app/                  (フロントエンドアプリケーションのソースコード)
├── infrastructure/       (AWSインフラストラクチャコード)
│   ├── lib/    (AWS CloudFormationテンプレート)
│   ├── bin/           (デプロイスクリプトやAWS CLIコマンド)
│   ├── package.json   (デプロイ用npm scripts)
│
├── docs/                  (プロジェクト全体のドキュメント)
│     ├── gameCore 
│       ├── summary.md      (フロントエンドゲームロジックの仕様)
│     ├── frontend.md       (フロントエンドの仕様)
│     ├── backend.md        (バックエンドAPIの仕様)│
├── README.md             (プロジェクト全体の説明と導入ガイド)
├── package.json          (ルートの依存関係と設定)
├── packages


```
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