const WebSocket = require("ws");

const Max = require("max-api");

const wss = new WebSocket.Server({ port: 7474 });

wss.on("connection", function connection(ws, req) {

	ws.on("message", function incoming(message) {
		console.log("received: %s", message);
	});

	ws.on("close", function stop() {
		Max.removeHandlers("send");
		console.log("Connection closed");

		ws.terminate();
	});

	const sender = function (a, b, c) {
		ws.send(JSON.stringify({
			"value_1": a,
			"value_2": b,
			"value_3": c
		}));
	};

	// Handle the Max interactions here...
	Max.addHandler("send", (...args) => {
		console.log("send args: " + args);
		if (args.length === 3) {
			sender(args[0], args[1], args[2]);
		}
	});
});

Max.addHandler(Max.MESSAGE_TYPES.ALL, (handled, ...args) => {
	if (!handled) {
		// Max.post('No client connected.')
		// just consume the message
	}
});

console.log("setting up max handlers");
