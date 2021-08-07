# セブンルール
  アルバイト先のシフトの提出、調整、交代、削除を全てクラウド上で管理、表示するサービスです。

# URL
http://www.seven-rule.net/

# 環境

・Mac OS Catalina

・Ruby 2.7.2

・Rails 6.0.3.2

・MySQL 8.0

・bootstrap 4.5.3

・jquery 3.5.1

　　・fullcalendar 5.0
   
・Rspec

・google calendar api

・AWS


# AWS 構成図

![aws](https://user-images.githubusercontent.com/72666840/112064948-274ba400-8ba7-11eb-9000-7c236cf5f573.png)


# テストデータ

店長ログイン情報： 店舗名 → サンプル店,  パスワード → 123456

従業員ログイン情報：従業員番号　→　100,  パスワード　→　0000　
(従業員名：tester)

# 使って欲しい機能手順
 
店長ログイン →　「募集を開始する」ボタンをクリック　→　メニューバーから「スタッフとしてログイン」　→　従業員ログイン

→　メニューバーの「シフトを提出する」 →　**カレンダーの好きな日付で複数登録していただきたいです**

→　「募集を終了する」ボタン　→　メニューバーから「シフトを調整する」　

→　**提出されたシフトが並んでいるので、クリックして削ったりしてみてください**

→　「確定する」ボタンで仮提出だったシフトが確定シフトに変更、仮削除だったものは削除します。

→　root_pathに戻ると確定されたシフトがずらりと並びます。

※他にも機能一覧を記載していますのでよろしければ操作していただけると幸いです。


# 全機能一覧

## 共通ページ(root_path)

・確定したシフトたちが全て並んでいる

・空いているシフトに入る

・終日予定を追加する(店長only)

・確定した従業員のシフトをダイレクトに削除する。(店長only)

・確定されたシフトを交代、削除する申請(通知)を出す(従業員only)


## 店長側

・新規ユーザー登録

・ログイン

・従業員の新規登録

・従業員の編集削除

・シフト時間割の新規登録

・シフト時間割の編集削除

・従業員としてログイン

・従業員からの申請(通知)をとして受け取る。(メールに送信もできる)

・各申請に対して許可or却下を下す

・集められたシフトを消す対象にしたり、戻したりする

・集められたシフトを確定シフトにする

・空きシフトを追加する

・終日予定を追加する

・確定した従業員のシフトをダイレクトに削除する。

・未提出者、既提出者の一覧

## 従業員側

・ログイン

・シフトを提出(新規登録)

・提出したシフトを削除

・確定されたシフトを確認

・確定されたシフトを交代、削除する申請(通知)を出す

・空いているシフトに入る

# モデル相関図


<img width="657" alt="スクリーンショット 2021-02-25 6 24 11" src="https://user-images.githubusercontent.com/72666840/109068273-f6588a80-7732-11eb-9bea-99b121e017e7.png">


# こだわりポイント

## 高齢者も使えるほどに使いやすいシンプルなUI/UX

僕のバイト先には高齢者の方も働いています。

このサービスは全従業員が使い方を理解して初めて効果を発揮してくれるので、

高齢者のスマホをあまり利用されない方にも使っていただきやすいようにシンプルなUIと

すぐに使い慣れていただけるUXを意識して作りました。


## 何度も同じ作業をさせない機能の実装

シフトを提出する際に毎回日付と時間を選択するのがどうも面倒なので、カレンダーの日付をクリックすると自動的に日付を入力し

一度登録した時間割は使い回し可能な機能を実装し、一度入力してしまえば次回からはボタンをクリックするだけでシフト提出が可能になるようにしました。
