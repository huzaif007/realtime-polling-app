Until now, every API you've built has been Stateless (HTTP). Think of HTTP like sending a letter in the mail: the client sends a request, the server reads it, sends a response back, and then completely forgets the client exists. The connection closes.

WebSockets are stateful. Think of them like a phone call. The client calls the server, the server picks up, and the line stays open. The server can randomly shout out information to the client without the client ever asking for it. This is how chat apps, live sports scores, and real-time polling work!

npm socket.io -> for the backend server
npm socket.io-client -> to make our terminal act as the client

using process.exit(1) in catch -> If your database connection fails, the try/catch block catches it, logs the exact error, and gracefully shuts down the process (process.exit(1)) instead of leaving a "zombie" server running that can't actually do anything.

2 New Concepts:
1. State Management -> The server needs to hold the current poll data in its memory so it knows exactly what the current vote count is at any given millisecond.
2. Broadcasting:
    - io.emit: sends message to a specific person
    - socket.emit: shouts to every single client at the same time

pollState -> memory


RUN IT:
The Multi-Terminal Stress Test 🧪
This is the exact moment you get to see why WebSockets are so powerful. We are going to simulate multiple users voting at the exact same time.

Open Terminal 1 and start the server: node server.js

Open Terminal 2 and start a client: node client.js (You should see the poll UI load instantly).

Open Terminal 3 (yes, a third split window!) and start another client: node client.js

Now, go to Terminal 2, type Node (case-sensitive) and press Enter.




THAT IS THE MAGIC OF WEBSOCKETS! 🚀

Seeing that instant update pop up on a completely different terminal without ever hitting "refresh" or sending an HTTP request is one of the most satisfying moments in backend development.

Think about the architecture you just built:

Client A sends a tiny message (socket.emit).

The Server catches it, updates its memory, and grabs the megaphone (io.emit).

Client B (and C, and D) instantly receive the new data and redraw their UI in milliseconds.

This exact Publish-Subscribe (Pub/Sub) pattern is what powers live Twitch chat, multiplayer games, Google Docs collaboration, and live stock market tickers. You just built the core engine for all of them.

The Final Save (Your GitHub Routine)
You have successfully completed the Real-Time Polling App. Let's lock this code into your repository so you have a perfect boilerplate for WebSockets in the future.

Stop your running servers (Ctrl + C in your terminals) and run your daily routine:

Bash
git status
git add .
git commit -m "Completed real-time polling app with Socket.io and interactive CLI"
git push origin main