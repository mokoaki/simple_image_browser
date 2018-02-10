# 俺用 simple image viewer

This is the image viewer to use the web browser.

これはブラウザで使う画像ビューアです

私が欲しかった機能は

- 画像を表示領域の横幅にフィットして拡大表示できる
- 画像の最上部が表示領域の最下部までスクロールできる
- 画像の最下部が表示領域の最上部までスクロールできる

ただそれだけなのに、世の中の画像ビューアはそんな簡単な事も出来ないくせに要らない機能ばっかり実装しやがってそびえ立つクソしか無いので自作したのです

## Browser support priority

上の方ほどサポートされてそうなブラウザ

- Chrome 64.0.3282.140
- Firefox 58.0.2
- Safari 11.0.3 (13604.5.6)
- Opera 51.0.2830.26
- MS-IE 11
- MS-Edge 25

## Required files

通常使用で最低限必要なファイル

- app/
  - simple_image_viewer.html
  - js/siv.js
  - css/siv.css

## Setting

設定は1箇所 画像ファイルへのパス、連番の桁数、拡張子を変更する

```js
# app/js/siv.js

var Setting = {
  // e.g.
  // path/to/file_name_001.jpg
  // ./images/irasutoya_001.jpg
  file_path: "./images/irasutoya_",
  zero_suppress_num: 3,
  file_extension: ".jpg"
};
```

## Show next page

次のページを表示

- Click right side of the window
- Push enter key or right arrow key
- ウィンドウの右の方をクリックする
- エンターキーか右カーソルキーを押す

## Show previous page

前のページを表示

- Click left side of the window
- Push left arrow key
- ウィンドウの左の方をクリックする
- 左カーソルキーを押す

## Accelerator

もっと先へ加速したくはないか、少年

- Move 10 pages if hold down MetaKey, ShiftKey, AltKey, CtrlKey
- 適当なそれっぽいキーを押していると10ページ遷移します

## Test

テスト

- WIP

## License

MIT
