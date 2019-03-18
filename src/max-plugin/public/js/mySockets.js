// --------------------------------------------------------------------------
// This is the javascript required for interactive data retrieval from
// the Max-based Node host via websockets. It uses fairly standard jQuery
// to perform its thing...
// --------------------------------------------------------------------------
/* global $ */


var exampleSocket = new WebSocket("ws://localhost:7474");

exampleSocket.onopen = function (event) {
	console.log("sending data...");
	exampleSocket.send("Ready, willing and able!");
};

exampleSocket.onmessage = function (event) {
	let e = JSON.parse(event.data);

	$("#value_1").text(Math.round(e.value_1 * 100) / 100);
	$("#value_2").text(Math.round(e.value_2 * 100) / 100);
	$("#value_3").text(Math.round(e.value_3 * 100) / 100);
};

// Managing the interaction

$(window).on("beforeunload", function () {
	exampleSocket.close();
});
