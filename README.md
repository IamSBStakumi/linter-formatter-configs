# Auth-Test

## やったこと

### Google Cloudの機能を有効化

- Cloud build
- Artifact Registry
- Cloud Resource Manager API

### 権限の見直し

- [gcloud builds submit で "The user is forbidden from accessing the bucket..." エラー](https://zenn.dev/nbstsh/scraps/fdda1240d41fa8)を参考にサービスアカウントの権限を管理

- cloud build設定ページから、Cloud Run管理者ロールを`ENABLED`に設定

  - ポップアップは[スキップ]をクリック

- 秘密鍵を発行したサービスアカウントに`サービスアカウントユーザー`ロールを付与

### レポジトリの作成

- Cloud Build実行時に、`staging-repo`が無いというエラーが発生したため、Artifact Registryにおいてレポジトリを作成した

  - 名前とリージョンのみ設定。残りは初期状態のまま

## 現在の設定の懸念

- Cloud Storageにアップロードしたソースを使用してビルドしている -> Cloud Storageの容量を使用する
- Artifact Registryにビルドした古いイメージが残ったままになる

上記を放置すると、料金が高くなる。
