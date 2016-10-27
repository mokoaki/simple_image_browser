# 俺用 simple_image_viewer

This is image viewerrrrrrrrrrrrrrr

これは何かと言うと、画像ビューア（そのまんま）なのです<br>
欲しかった機能は

- 画像は横幅にフィットして拡大表示が出来る
- 上下にスクロールして読み進める事が出来る
- 簡単に次のページに遷移出来る

ただそれだけなのに、世の中の画像ビューアはそんな簡単な事も出来ないくせに要らない機能ばっかり実装しやがって**そびえ立つクソしか無い**ので自作したのです

## Support browsers

俺がメインで使っているのですぐバグに気付くと思われるブラウザ

- Chrome 54

## Best effort support browsers

俺がメインで使っていないのでバグに気付かないかもしれないブラウザ

- Firefox 49
- Safari 10
- Opera 41
- MS-IE 11
- MS-Edge 25

## Edit Setting

設定はココだけ

```javascript
setting: {
  // e.g.
  // ./path/to/file_name_001.jpg
  file_path:         "./path/to/file_name_",
  zero_suppress_num: 3,
  file_extension:    ".jpg",
},
```

## Next page

次のページ

- Click right side of the window
- Push enter key or right arrow key
- ウィンドウの右の方をクリックする
- エンターキーか右カーソルキーを押す

## Previous page

前のページ

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
- 各プラットフォーム・各ブラウザで自動テストを行う実験中

## License
MIT
