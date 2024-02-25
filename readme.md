## カルタグラフ
カード×タグ×グラフで作る紙芝居型TRPG風ソロジャーナル電子ゲームブック

<div><img src="./docs/assets/images/demo.png" /></div>

## カルタグラフ
[カルタグラフ - app](https://d39tlgyf23zo7h.cloudfront.net/app/)  

[openapi backend](https://hibohiboo.github.io/kartagraph-monorepo/public/kartagraph-openapi/)  
[jest-report backend](https://hibohiboo.github.io/kartagraph-monorepo/public/jest-reports-backend/jest.html)  
[jest-report packages/worker](https://hibohiboo.github.io/kartagraph-monorepo/public/jest-reports-worker/jest.html)  
[storybook packages/ui](https://hibohiboo.github.io/kartagraph-monorepo/public/kartagraph-components/)  
[jest-report editor](https://hibohiboo.github.io/kartagraph-monorepo/public/jest-reports-editor/jest.html)  
[storybook packages/editor-ui](https://hibohiboo.github.io/kartagraph-monorepo/public/kartagraph-editor-components/)  

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
├── docs/                 (プロジェクト全体のドキュメント)
│     ├── design          (機能の仕様)
│     ├── assets          (図)
│     ├── openAPI         (バックエンドAPIの仕様)│
├── README.md             (プロジェクト全体の説明と導入ガイド)
├── package.json          (ルートの依存関係と設定)
├── packages


```

## スクリプト

- **prepare**: Gitフックを設定し、npm install実行時にフックディレクトリの変更を示すメッセージを表示。
- **build**: プロジェクトのビルドを行う。
- **ncu**: プロジェクトの依存ライブラリの更新を確認。
- **dev**: appとeditorを開発モードでローカル環境で実行する。
- **deploy**: プロジェクトのデプロイ。カレントディレクトリを "infrastructure" に変更して、そのディレクトリ内で npm run deploy を実行する。

## ワークスペース

- **"packages/*"**: "packages" ディレクトリ以下のすべてのディレクトリを対象とするワイルドカードパターン。
- **"app"**: "app" ディレクトリ。
- **"editor"**: "editor" ディレクトリ。