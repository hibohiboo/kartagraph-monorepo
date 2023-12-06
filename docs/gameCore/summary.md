## ゲームコア

ゲームコアは、シナリオを解釈することを責務とする。
jotaiライブラリからメッセージを受け取り、受け取ったメッセージに応じて次の状態を返す。

## シナリオ構造
シナリオはJSONで表す。

jsonPath|説明
--|--
.title|シナリオタイトル
.firstSceneId|最初のシーンID
.scenes[]|シーン一覧
.scenes[].id|シーンID
.scenes[].eventId?|シーン開始時に実行するイベント
.scenes[].backgroundImage|背景
.scenes[].events[]|イベント一覧
.scenes[].events[].id|イベントID
.scenes[].events[].type|イベントタイプ
.scenes[].events[].data|イベントデータ
.scenes[].events[].next?|次のイベント
.scenes[].cards[]|カード一覧
.scenes[].cards[].id|カードID
.scenes[].cards[].name|カード名
.scenes[].cards[].image|カード画像
.scenes[].cards[].clickEventId|カードクリック時のイベント

## イベントデータ
イベントデータはtypeによって異なるものを返す。

type|
--|
message|メッセージを表示する
messages|連続したメッセージを表示する
nextScene|次のシーンに移動する
select|選択肢

### message

```json
{
  "type": "message",
  "data": {
    "test": "おはよう",
    "image": "/images/characters/recept/laugh.png"
  }
}
```


jsonPath|説明
--|--
.type|message
.data.text|文字
.data.image?|画像

### messages

```json
{
  "type": "messages",
  "data": {
    "test": ["おはよう", "ちょっとそれとって"]
  }
}
```


jsonPath|説明
--|--
.type|messages
.data.text[]|メッセージ一覧
.data.image?|画像

### nextScene
jsonPath|説明
--|--
.type|nextScene
.data.id|次のシーンのID

### select
jsonPath|説明
--|--
.type|select
.data.select[].label|選択肢名
.data.select[].id|イベントID

