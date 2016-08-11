# eighty

Example `.eightyrc`:
```ini
[servers.app1]
name = app1.domain.ext
listen = 8080
[servers.app1.locations.default]
path = /{p*}
[servers.app1.locations.default.proxy]
host = 127.0.0.1
port = 8081
[servers.app1.locations.default.error.default.file]
path = ../../path/to/error.html

[servers.app2]
name = app2.domain.ext
listen = 8082
[servers.app2.locations.default]
path = /{p*}
[servers.app2.locations.default.proxy]
host = 127.0.0.1
port = 8083
[servers.app2.locations.default.error.default.proxy]
host = 127.0.0.1
port = 8081
```
