## Super Redis

This server will be used that reading/writing to redis is functioning inside EC2 on AWS

The server inclue wrting and saving user data. Also two routes to make sure that the server is working with the outside world 

### To run the project 
```bash
npm i && npm start
```
if redis server is working should see this exact response 
```bash
Save A user with id user001
Read user with id of user001
Server is run on port 3000
Redis connected...
Should be saved now...
{
  err: null,
  data: { first_name: 'Jone', last_name: 'Doe', email: 'jone@test.com' }
}

```

## Test redis with an api 

1. `GET /write` will save another user to redis 
2. `GET /read` will try to read the use you just saved with the `GET /write` and return the user data in a json response. if you can see any response this mean that server crashed and the saving is failed 