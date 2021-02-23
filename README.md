## About
Discordのボイスチャンネル開始/終了をLINE Notify経由で通知するDiscord Botです。

## How To Use It
src/config.ts を作成して下記の設定を記述してください。
``` js
export const config = {
    dicordToken: "Discord Bot Token",
    lineTolen: "Line Notify Token"
}
```

下記コマンドで実行できます。
``` bash
$ npm run run
```