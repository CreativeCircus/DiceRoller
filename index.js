var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
   
	console.log('a user connected');
	socket.on('disconnect', () => {
	  console.log('user disconnected');
	});
	socket.on('request roll', (options) => {
		console.log('rolling', options);
		let rolls = []
		for (let i = 0; i < options.count; i++) {
			rolls.push( Math.ceil(Math.random() * 6) )						
		}
		io.emit('rolled', {...options, rolls});
	});
});



http.listen(20202, () => {
	console.log('listening on *:20202');
});