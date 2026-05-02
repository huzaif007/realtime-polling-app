import {Server} from 'socket.io';
import {createServer} from 'http';
import express from 'express';
import cors from 'cors';
import { timeStamp } from 'console';

const app = express();

app.use(express());
app.use(cors());

const httpServer = createServer(app);

// Create the HTTP server and bind Socket.io to it
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// define event constants
const EVENTS = {
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    POLL_UPDATED: 'poll_updated',
    CAST_VOTE: 'cast_vote'
};

// In-Memory state (The source of truth)
// In a production app, this would live in MongoDB or Redis
const pollState = {
    question: "Which backend language is the absolute goat?",
    options: {
        "Node": 0,
        "Python": 0,
        "Go": 0,
        "Rust": 0
    }
};

;(
    async() => {   
        try {
            // socket logic
            io.on(EVENTS.CONNECTION, async (socket) => {
                console.log(`Socket connected, socket id ${socket.id}`);
                
                // The moment someone connects whisper them the current state of poll
                socket.emit(EVENTS.POLL_UPDATED, pollState);
                // Listen for when this specific user casts the vote
                socket.on(EVENTS.CAST_VOTE, (voteString) => {
                    // check if they voted for a valid option
                    if (pollState.options[voteString] !== undefined) {
                        // update the state
                        pollState.options[voteString]++;
                        console.log(`[VOTE CAST] ${socket.id} voted for ${voteString}`);
                        // Broadcast the new updated poll to everyone connected
                        io.emit(EVENTS.POLL_UPDATED, pollState);
                    }
                });

                socket.on(EVENTS.DISCONNECT, () => {
                    console.log(`Disconnected User ${socket.id} left.`)
                })
            });

            //start the server
            const PORT = process.env.PORT || 3000;
            
            httpServer.listen(PORT, async() => {
                console.log(`Server ready at port ${PORT}`)
            });

        }
        catch (err) {
            console.error(`Error: ${err.message}`);
            process.exit(1);
        }
    }
)();