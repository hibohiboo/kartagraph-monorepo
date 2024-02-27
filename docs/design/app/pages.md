# ページ概要デザインドキュメント
## Scope
フロントエンドのページ一覧およびパス一覧を示す。

## Background
react-routerの設計

## Proclem Statement
URLによって表示するページを切り替える

## Proposal
### パス一覧

パス|ページ
--|--
/|トップページ
/tutorial|チュートリアル
/scenario/|シナリオ一覧
/scenario/${uid}/${scenarioId}|シナリオプレイページ
/scenario/${uid}/${scenarioId}/result|シナリオプレイ結果表示ページ
/agreement|利用規約
/privacy-policy|プライバシーポリシー


### 設定

設定|値
--|--
basename|app

### 遷移機能

#### loader
**概要**
loaderで処理する機能。
画面アクセスの最初に行われる。

ただし、下記画面では実施しない。

パス|
--|
/agreement|
/privacy-policy|

##### レポート準備
web-vitalsを記録する。
開発環境ではconsoleに、本番環境ではGoogle Analyticsに出力

##### MSW準備
HTTPアクセスのモック。
開発環境のみ、MSWでAPIの通信をモックするようにする。

##### ユーザー認証
firebaseの匿名認証を使ってログイン。
uidを取得する。

