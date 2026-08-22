# backlog-pr-sync-demo

bee CLI と GitHub Actions で Backlog の課題と GitHub の Pull Request を連動させるデモです。

PR 本文に `DEMO-123` のような課題キーを書くだけで、Backlog 側の課題が自動で動きます。

| GitHub での操作 | Backlog 側の挙動 |
| --- | --- |
| PR を作成 | 課題に PR リンクをコメント＋ステータスを「処理中」に変更 |
| PR 本文を編集 | 新しく追加された課題キーにだけコメント |
| PR をマージ | 課題をクローズ |

## 仕組み

[.github/workflows/backlog-sync.yml](.github/workflows/backlog-sync.yml) の 1 ファイルだけで動きます。
Backlog を操作しているのは実質この 3 コマンドです。

```sh
npx @nulab/bee@1 issue edit "$KEY" --status 2
npx @nulab/bee@1 issue comment "$KEY" --body "..."
npx @nulab/bee@1 issue close "$KEY" --comment "..."
```

認証はリポジトリシークレットに登録した 2 つの環境変数だけで通ります。

| シークレット | 値 |
| --- | --- |
| `BACKLOG_API_KEY` | Backlog の個人設定から発行した API キー |
| `BACKLOG_SPACE` | `your-space.backlog.com` などのスペースのホスト名 |

Backlog 側しか更新しないので、ワークフローは `permissions: {}` で全権限を落としています。

## デモの題材

`src/redirect.js` はログイン後のリダイレクト先を決める関数です。
`next` クエリを無視して常に `/login` を返すバグがあり、`test/redirect.test.js` がそれを検出します。

```sh
node --test
```

## 参考

- [bee リポジトリ](https://github.com/nulab/bee)
- [bee ドキュメント](https://nulab.github.io/bee)
- [レシピ: PR と課題の連動](https://nulab.github.io/bee/recipes/pr-lifecycle-sync/)
- [CI/CD との連携](https://nulab.github.io/bee/integrations/ci-cd/)
