# Auth service 

Handles authentication for the app. I tried to do an MVC thing here (with no view), but I'm not sure I like having the route logic in a controller. I almost liked it better when the controller logic was on the route handlers.

```bash
docker exec -it postgres_container psql -U postgres # https://stackoverflow.com/questions/60193781
```

## TODO

In my dockerfile I want to run the installation as the "node" user because they don't have permissions. But if I do that then skaffold no longer works because it no longer has permission to replace old files.