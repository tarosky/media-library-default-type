# Media Library Default Type

WordPressのブロックエディターでメディアライブラリを開いた際に、デフォルトで「この記事に添付された画像」表示にするプラグインです。

![WordPress Plugin Version](https://img.shields.io/badge/version-1.0.5-blue.svg)
![WordPress Compatibility](https://img.shields.io/badge/WordPress-5.0%2B-green.svg)
![PHP Compatibility](https://img.shields.io/badge/PHP-7.0%2B-blue.svg)
![License](https://img.shields.io/badge/license-GPL%20v2%2B-orange.svg)

## 問題を解決

通常、ブロックエディターでメディアライブラリを開くと「すべてのメディアアイテム」が表示されますが、多くの場合、ユーザーは現在編集している記事に関連する画像を探しています。このプラグインは、メディアライブラリを開いた時に自動的に「この記事に添付された画像」フィルターを適用することで、より効率的な編集体験を提供します。

## 機能

✅ **自動フィルター適用**: メディアライブラリを開いた際、自動的に「この記事に添付された画像」フィルターが適用されます  
✅ **ブロックエディター完全対応**: Gutenbergブロックエディターで完璧に動作します  
✅ **クラシックエディター互換**: クラシックエディターでも動作します  
✅ **軽量設計**: パフォーマンスに影響を与えない軽量な実装  

## インストール

### 自動インストール（推奨）

1. WordPressの管理画面で「プラグイン」→「新規追加」をクリック
2. 「Media Library Default Type」を検索
3. 「インストール」をクリックして有効化

### 手動インストール

1. [最新リリース](https://github.com/fumikito/media-library-default-type/releases)をダウンロード
2. プラグインファイル一式を `/wp-content/plugins/media-library-default-type/` ディレクトリにアップロード
3. WordPress管理画面の「プラグイン」メニューからプラグインを有効化

## 使用方法

プラグインを有効化するだけで自動的に動作します。設定は不要です。

1. 投稿の編集画面を開く
2. 画像ブロックを追加
3. 「メディアライブラリ」をクリック
4. 自動的に「この記事に添付された画像」フィルターが適用される

## 動作環境

- **WordPress**: 5.0以上（ブロックエディター対応）
- **PHP**: 7.0以上
- **ブラウザ**: モダンブラウザ（Chrome, Firefox, Safari, Edge）

## 技術仕様

このプラグインは、WordPressのメディアライブラリの内部APIを拡張して動作します：

- `wp.media.view.AttachmentsBrowser` の初期化プロセスをインターセプト
- `filters` オプションを動的に `'uploaded'` に設定
- ブロックエディターとクラシックエディター両方に対応

## よくある質問

**Q: 設定画面はありますか？**  
A: いいえ。プラグインを有効化するだけで自動的に動作します。

**Q: クラシックエディターでも動作しますか？**  
A: はい。ブロックエディターとクラシックエディター両方で動作します。

**Q: パフォーマンスへの影響はありますか？**  
A: 軽量な実装のため、パフォーマンスへの影響は最小限です。

## 貢献

バグレポートや機能改善の提案は [GitHub Issues](https://github.com/tarosky/media-library-default-type/issues) でお知らせください。

## 開発者

**Fumiki Takahashi** ([@fumikito](https://github.com/fumikito))

## ライセンス

GPL v2 or later

---

WordPress.orgプラグインディレクトリにも登録予定です。
