# シナリオ選択ページデザインドキュメント
## Scope
フロントエンドの機能設計およびフロントエンドから使用するＡＰＩの概要を記す

## Background
公開したシナリオを選んで遊べるようにする。

## Proclem Statement
公開したシナリオを選んで遊べるようにする。

## Proposal
### 概要
公開されているシナリオを10件新着順に見せる。
最後まで読み込んだら最初に戻るようにする。（一通り流し見して決めたい場合に最初まで１０個矢印を押すのは大変なため）
公開シナリオは少ないため、検索・ページングの機能はこの時点では設計しない。
依頼板を見ている雰囲気を出すため、カルーセル方式で表示できるものとする。

### フロントエンド機能
#### 画面部品
* カルーセル
  * シナリオ詳細を切り替える機能を持つ。新着順でループできるようにする。
* シナリオ詳細
  * シナリオタイトル
  * タイトル画像
  * 紹介文
  * 詳細文表示ボタン
  * シナリオ開始ボタン
* シナリオ詳細文(自由記述)
  * 作者名
  * 利用素材
  * などなど、自由にテキストを置けるようにする

#### 画面機能
##### ページ表示前
* シナリオ概要取得APIの呼出し
  * loader
##### 初期表示


##### カルーセル
* カルーセルの基本機能を持つ
  * > 次のアイテム
  * < 前のアイテム
  * ソート順：新着順
  * ループ：する

##### シナリオ開始ボタン押下時
* 該当のシナリオを開始する

項目|値|データ取得元|データ取得元プロパティ
--|--|--|--
遷移パス|/scenario/{シナリオID}|シナリオ概要取得API|id

##### 詳細文押下時
* シナリオ詳細をモーダルウィンドウで表示。 ... あまり使われないと思われるのでAlartで最初は実装

## バックエンド
### シナリオ概要取得API
公開シナリオは少ないため、検索・ページングの機能はこの時点では設計しない。

#### 概要

項目|値
--|--
メソッド|GET
パス|/scenario/list
クエリパラメータ|なし

#### レスポンス
下記シナリオ情報の配列.
更新日時の昇順でソート

パス|論理名
--|--
[].title|シナリオタイトル
[].src|タイトル画像
[].summary|紹介文
[].detail|シナリオ詳細文(自由記述)
[].created| 登録日時
[].updated| 更新日時
[].id| シナリオID


## 作業メモ

### 参考
jotaiとAPIから取得した値の扱いを確認する。
Redux Tool KitのQueryと似た仕組みがあるようなので、これを利用する。キャッシュのことなど、ベストプラクティスがあれば従うべきと考えている。

[jotai query](https://jotai.org/docs/extensions/query)

[React Query vs. Redux Toolkit with Thunk: Streamlining Data Management and State](https://medium.com/@mudassir.iqball/supercharging-your-react-app-with-react-query-and-redux-toolkit-a-comparison-5b7f802ce1cc)

```
npm i jotai-tanstack-query @tanstack/query-core wonka
```

ライブラリ|概要
--|--
jotai-tanstack-query|jotaiとtanstack-queryをつなぐ拡張
@tanstack/query-core|tanstack-query.HTTP通信のキャッシュなどを担当
wonka|rxjsやlxjsに似たストリームのライブラリ。Callbag仕様にのっとる。


