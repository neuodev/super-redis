const experss = require('express')
const redis = require('redis')
const colors = require('colors')

const app = experss()
const client = redis.createClient()

client.on('connect', () => {
    console.log('Redis connected...'.bgGreen)
})

// Middlewares 
app.use(experss.json())

// API Routes 
app.get('/write', (req, res, next) => {
    const id = 'user002'
    console.log(`Try to save user with id ${id}`.bgBlue)
    // Save user
    client.hmset(id, [
        'first_name', 'Ahmed',
        'last_name', 'Ibrahim',
        'email', 'ahmed@test.com',
    ], (err) => {
        if(err) {
            console.log(`Con't save the user`.bgRed, error, error.message)
            res.status(500).json({err: err.message})
        }
        else {
            console.log(`${id} saved successfully`.bgGreen)
            res.status(200).json({message: `${id} saved successfully` })
        }
    })
})

app.get('/read', (req, res, next) => {
    const id = 'user002'
   console.log(`Get details of a user with id of ${id}`.bgBlue)
   client.hgetall(id, (err, data) => {
       res.status(200).json({
           err, data
       })
   })
})

app.listen(3000, () => {
    console.log(`Server is run on port 3000`.bgCyan)
})


const USER_ID = 'user001'
function test_write() {
    console.log(`Save A user with id ${USER_ID}`.bgBlue)
    client.hmset(USER_ID, [
        'first_name', 'Jone',
        'last_name', 'Doe',
        'email', 'jone@test.com',
    ], (err) => {
        if(err) {
            console.log(`User ${USER_ID} can't be saved to redis`.bgRed)
        } else {
            console.log('Should be saved now...'.bgGreen)
        }
    }) 
    
}

function test_read() {
    console.log(`Read user with id of ${USER_ID}`.bgBlue)
    client.hgetall(USER_ID, (err, data) => {
        console.log({
            err, data
        })
    })
}

test_write()
test_read()