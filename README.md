# bear-cli-server
koa based web server framework, including socket.io server for real-time communication.

interact with web-client via https://github.com/Samicelus/bear-cli-web

# deploy steps

1.clone/download server code to server, install node.js, mongodb, redis, pm2. config proxy through nginx. 

2.install dependencies

```
$cd bear-cli-web
$npm install
```

3.change config files in the config folder.

4.start service by command:

```
$pm2 start process.json
```
