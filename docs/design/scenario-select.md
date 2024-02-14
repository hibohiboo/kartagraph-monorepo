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

##### 初期表示
* シナリオ概要取得APIの呼出し
  * 呼出し中はLoadingと表示
  * エラー発生時はエラー発生のメッセージを表示

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

### バックエンド

openapiからrestを作ることを試す。

3.0か2.0しか対応していないようなので、3.1を3.0にダウングレードして使う。

[openapi-down-convert](https://github.com/apiture/openapi-down-convert)
[OpenAPI を使用した REST API の設定](https://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/api-gateway-import-api.html)
[OpenAPI × AWS CDK × APIGateway でRest APIを管理する](https://zenn.dev/taroman_zenn/articles/91879cec40627c)
[AWS CDKで作ったAPI Gateway + LambdaからOpenAPIドキュメントを生成してみた](https://zenn.dev/ncdc/articles/42c7d2b8dfec3e)
使おうかと思ったが、よく読んだらCDKとopenapiの併用はできないもよう。（追加はできる）
openapiによるパス管理とLambda定義を行っているソースもあったが、最終更新が1年前。
無理に使うのは危険なにおいなので諦める。

[AWS CDKを使ってAPI Gateway(HTTPAPI)+LambdaをOpenAPIで定義してデプロイする](https://serverless.co.jp/blog/347/) では公式のCDKで実現している模様。こちらを試したい。
これを使うと、yamlから下記のオブジェクトが取得できる。

```js
{
  "openapi": "3.1.0",
  "info": {
    "version": "0.0.1",
    "title": "カルタグラフ",
    "description": "カルタグラフ用API",
    "contact": { "name": "hibohiboo", "url": "https://twitter.com/hibohiboo" },
    "license": { "name": "MIT", "url": "https://opensource.org/licenses/MIT" }
  },
  "paths": {
    "/v1/api/tags": {
      "put": {
        "operationId": "tags",
        "summary": "タグ情報送信",
        // 以下略
      }
    }
  }
}

```

[Promiseを外す](https://kakehashi-dev.hatenablog.com/entry/2021/12/20/080000)
ここまでのコミットID `1c95c66657c63d81fc56b69be5cc172d3e733985`

ここまで書いて、@apidevtools/swagger-parserを使うより、bundle結果をJSONで出力して、使用したほうが早いのではと気づく。


