# Auth service 

Handles authentication for the app. I tried to do an MVC thing here (with no view), but I'm not sure if it looks good. I liked it better when the controller logic was in the route handlers. 

## TODO

In my dockerfile I want to run the installation as the "node" user because they don't have permissions. But if I do that then skaffold no longer works because it no longer has permission to replace old files.

Write the SQL queries