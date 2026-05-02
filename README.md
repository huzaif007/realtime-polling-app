# 📊 Real-Time Polling App (WebSocket CLI)

A real-time, terminal-based polling application built to demonstrate stateful, two-way communication using WebSockets. This project bypasses standard HTTP REST constraints, allowing the server to push live data to all connected clients instantly.

## 🚀 Features

* **Real-Time Broadcasting:** Utilizes `io.emit` to instantly update the poll UI on every connected terminal the second a vote is cast.
* **Interactive CLI:** Uses Node's native `readline` module to create a persistent, interactive terminal dashboard that updates without refreshing.
* **In-Memory State Management:** The server acts as the single source of truth, maintaining the current poll data in memory.
* **Robust Error Handling:** Built-in connection limits, graceful fallback logic, and timeout handlers to prevent terminal crashes if the server goes offline.
* **Async Server Initialization:** Utilizes an Async IIFE pattern for safe server boot-ups and database readiness.

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js (HTTP Server binding)
* **WebSockets:** Socket.io (Server) & Socket.io-client (CLI)

## 💻 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1. Clone this repository:
   ```bash
   git clone [https://github.com/YOUR_GITHUB_USERNAME/realtime-polling-app.git](https://github.com/YOUR_GITHUB_USERNAME/realtime-polling-app.git)
Navigate into the directory:

Bash
cd realtime-polling-app
Install the required dependencies:

Bash
npm install


### How to Run the App (Multi-Terminal Simulation)

To see the real-time WebSockets in action, you will need to open multiple terminal windows.

**1. Start the Server:**
Open your first terminal window and run:
```bash
node server.js
(Wait for the 🚀 Polling Server live confirmation).

2. Start a Client (Voter 1):
Open a second terminal window and run:

Bash
node client.js
(You will see the live poll UI appear).

3. Start another Client (Voter 2):
Open a third terminal window and run:

Bash
node client.js
Cast a vote in Terminal 2 by typing your choice (e.g., Node) and pressing Enter. Watch Terminal 3 update instantly!
