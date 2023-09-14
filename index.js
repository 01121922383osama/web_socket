const express = require("express");
const http = require("http");
const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = require("socket.io")(server);
app.use("/uploads", express.static("uploads"));

// Middleware
app.use(express.json());
var clients = {};
const routes = require("./routes");
app.use("/routes", routes);

io.on("connection", (socket) => {
    console.log("connected");
    console.log(socket.id, "has joined");

    socket.on('signin', (id) => {
        console.log(id);
        clients[id] = socket;
        // console.log(clients);
        socket.on('message', (msg) => {
            console.log(msg);
            let targetId = msg.targetId;
            if (clients[targetId]) {
                io.emit('message', msg);
            }
        });
    });
});
app.route('/check').get((req, res) => {
    return res.json('your app workin work');
});

server.listen(port, "0.0.0.0", () => {
    console.log("server connected");
});
