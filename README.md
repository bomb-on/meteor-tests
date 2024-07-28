Create app:

```shell
$ meteor create --vue meteor-tests --release 3.0.1
$ cd meteor-tests
```

Add accounts-base:

```shell
$ meteor add accounts-base
```

Update to latest packages:

```shell
$ meteor npm uninstall meteor-vite vite
$ meteor npm install meteor-vite@2.0.0-next.1 vite@5 --force

$ meteor remove jorgenvatle:vite-bundler
$ meteor add jorgenvatle:vite-bundler@3.0.0-meteor3.next.10
```

Run app:

```shell
$ meteor
```
