# Auth service 

This microservice is responsible for handling the authentication for the app. I tried to do an MVC thing here (minus the view), but I'm not sure I like having the route logic separated into a controller. I almost liked it better when the controller logic was on the route handlers.

Here are some helpful commands

```bash
# To get a psql shell in the running postgres container 
docker exec -it postgres_container psql -U postgres # https://stackoverflow.com/questions/60193781

# If you screw up a prepared statement, you can run this to reset them
docker-compose down --rmi all --volumes 
```