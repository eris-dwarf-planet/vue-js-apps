# README #

Study - Todoアプリ

### 環境 ###
#### 動作環境
* docker 17.03.1
* node (docker image: latest)
* mongodb (docker image: latest)

#### 言語
* typescript 2.4.1

#### フレームワーク
* server - express 4.15.3
* client - vue.js 2.3.4

### 環境セットアップ ###
```
$ ./tools/setup.sh
```

### server & client コンパイル ###
```
$ ./tools/build.sh
```

### server起動 ###
```
$ ./tools/run.sh
```

### 画面確認 ###
```
http://localhost:3000
```

### db確認 ###
```
$ ./tools/mongo-login.sh 

> $ mongo todo_db
> show dbs;
> show collections;
> db.todos.find();
```
