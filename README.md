# 俺用 simple image browser

This is the image viewer to use the web browser.

これはブラウザで使う画像ビューアです

私が欲しかった機能は

- 画像を表示領域の横幅にフィットして拡大表示できる
- 画像の最上部が表示領域の最下部までスクロールできる
- 画像の最下部が表示領域の最上部までスクロールできる

世の中の画像ビューアはそんな簡単な事も出来ないくせに要らない機能は実装して複雑なので自作したのです

## Required files

通常使用で最低限必要なファイル

- dist/
  - simple_image_browser.html
  - simple_image_browser.js
  - simple_image_browser.css

## Setting

画像へのパスを設定する

```html
<script>
  SimpleImageBrowser.images([
    './images/give_me_regards_black_jack/give_me_regards_black_jack_001.jpg',
    './images/give_me_regards_black_jack/give_me_regards_black_jack_002.jpg',
    './images/give_me_regards_black_jack/give_me_regards_black_jack_003.jpg'
  ]);
</script>
```

```html
<script>
  SimpleImageBrowser.images(
    './images/give_me_regards_black_jack/give_me_regards_black_jack_{001..030}.jpg'
  );
</script>
```

```html
<script>
  SimpleImageBrowser.images([
    './images/give_me_regards_black_jack/give_me_regards_black_jack_{001..030}.jpg',
    './images/give_me_regards_black_jack/give_me_regards_black_jack_031.jpg',
    './images/give_me_regards_black_jack/give_me_regards_black_jack_{032..059}.jpg'
   ]);
</script>
```

## Show next page

次のページを表示

- Click right side of the window
- Push enter key or right arrow key
- ウィンドウの右の方をクリック
- エンターキーか右カーソルキー

## Show previous page

前のページを表示

- Click left side of the window
- Push left arrow key
- ウィンドウの左の方をクリック
- 左カーソルキー

## Accelerator

もっと先へ加速したくはないか、少年

- Move 10 pages if hold down MetaKey, ShiftKey, AltKey, CtrlKey
- 適当なそれっぽいキーを押していると10ページ遷移する

## Dev

```sh
yarn install
yarn run server
```

## Test

テスト

- WIP
