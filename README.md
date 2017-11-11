# 俺用 simple image viewer

This is image viewer.

これは画像ビューアです

私が欲しかった機能は

- 画像を表示領域の横幅にフィットして拡大表示できる
- 画像の最上部が表示領域の最下部までスクロールできる
- 画像の最下部が表示領域の最上部までスクロールできる

ただそれだけなのに、世の中の画像ビューアはそんな簡単な事も出来ないくせに要らない機能ばっかり実装しやがってそびえ立つクソしか無いので自作したのです

## Browser support priority

上の方ほどサポートされてそうなブラウザ

- Chrome 62
- Firefox 56
- Safari 11
- Opera 49
- MS-IE 11
- MS-Edge 25

## Required files

通常使用で最低限必要なファイル

- app/
  - simple_image_viewer.html
  - js/siv.js
  - css/siv.css

## Edit Setting

設定はココだけ 画像ファイルへのパス、連番の桁数、拡張子を変更する

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

- MetaKey, ShiftKey, AltKey, CtrlKey it will go 10 pages Press
- 適当なそれっぽいキーを押していると10ページ遷移します

## Test

テスト

- WIP

## License

MIT
