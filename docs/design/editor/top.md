# シナリオ作成ページデザインドキュメント
## Scope
フロントエンドの機能設計およびフロントエンドから使用するＡＰＩの概要を記す

## Background
シナリオをJSONで記述は可視性が低い。
直感的に今どんな画面を作っているのか分かるようにしたい。
DB操作を手動でやるのが面倒。

## Proclem Statement
シナリオを投稿して遊べるようにする。

## Proposal
### 概要
JSONで書かれたシナリオを読み込み、投稿できるようにする。


### フロントエンド機能
#### 画面部品
* シナリオツリー
  * シナリオをツリー表示で可視化
* プレビュー
  * アプリと同様
* シナリオ投稿ボタン

#### 画面機能

##### シナリオ投稿ボタン押下時
* シナリオ投稿APIを呼出し、シナリオを投稿する

## バックエンド
### シナリオ投稿API
* S3にJSONを保存。JSON内からシナリオテーブルに必要な要素を取り出し保存する

#### 概要

項目|値
--|--
メソッド|PUT
パス|/scenario/${uid}/${id}
リクエストボディ|JSON

パラメータ|説明
--|--
uid|ユーザID
id|シナリオID

リクエストボディ

JSONPath|論理名
--|--
.id| シナリオID
.title|シナリオタイトル
.src|タイトル画像
.summary|紹介文
.detail|シナリオ詳細文(自由記述)

### S3
S3はシナリオ保存用のバケットと、メインのフロントエンドを表示するS3とを分ける。
(参考: https://dev.classmethod.jp/articles/cdk-multi-origin-oac/ )

### 詳細設計

scenario_list テーブルをupsertする。

カラム名|論理名|取得元|更新
--|--|--|--
id|シナリオID[PK]|リクエストボディ|
title|シナリオタイトル|リクエストボディ|〇
src|タイトル画像のパス|リクエストボディ|〇
summary|紹介文|リクエストボディ|〇
detail|シナリオ詳細文(自由記述)|リクエストボディ|〇
s3_key|S3のオブジェクトキー|record.s3.object.key|〇
created| 登録日時(UTC)|record.eventTime|
updated| 更新日時(UTC)|record.eventTime|〇

## 作業メモ

### 更新SQL

```sql
insert into scenario_list (id,title,src,summary,detail,s3_key,created,updated) 
                   values ('a9ff348b-8a64-4dae-b658-c05ac44413fa','title','src','summary','detail','s3_key',current_timestamp,current_timestamp) 
         on conflict (id) 
         do update set 
            title = EXCLUDED.title,
            src = EXCLUDED.src,
            summary = EXCLUDED.summary,
            detail = EXCLUDED.detail,
            s3_key = EXCLUDED.s3_key,
            updated = EXCLUDED.updated;
```

### 参考

[Prisma Neon](https://www.prisma.io/docs/orm/overview/databases/neon)
[【NextJs14】NextJs14 と 便利なライブラリ【#２７ Neon Serverless Postgres】](https://zenn.dev/web_life_ch/articles/549289858bd26b)
[NestJSに最適のORMを考えてみる（Prisma VS TypeORM）](https://ap-ep.com/node-orm/)
[TypescriptのSQLクエリビルダーのkyselyが快適](https://qiita.com/mont_blanc/items/0564a946b0d6919ad3a0)
[TypeScript用クエリービルダー「Kysely」でトランザクション、UPSERT、JOINを使ってみた](https://qiita.com/kanedaq/items/2202b700533e9ca15f9e)

### 検討
#### S3に残すキーに日付とか入れる？
リクエストのたびに新しいS3オブジェクトができ、消すのどうしようってなる。
必要になったらＳ３のバージョニングを有効にしてもいいかも。
今回は不要とする。

下記は削る
```

      path: `${bucket.bucketName}/scenario/{uid}/{id}/{time}-{rid}.json`,
...
          'integration.request.path.time': 'context.requestTimeEpoch',
          'integration.request.path.rid': 'context.requestId',
```

