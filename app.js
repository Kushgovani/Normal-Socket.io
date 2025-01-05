const http = require('http');
const express = require('express');
const path = require('path');
const client = require('./routes/client');
const app = express();
const dotenv = require('dotenv')
dotenv.config({ path: './config.env'});
const server = http.createServer(app);

//Socket IO
const { Server } = require("socket.io");
const io = new Server(server);


app.use(express.static(path.resolve('./public')));    

app.get('/',(req, res) =>{
    return res.sendFile("/public/index.html")
})

io.on('connection', (socket) => {
    console.log('New User Connected', socket.id);
    socket.on("UserMsg", (message)=>{
        io.emit('Message', message);
        console.log('Message:', message);
    })
  });

const port = process.env.PORT || 3000;
server.listen(port,() => 
    console.log(`Server is running on port ${port}`)
);

