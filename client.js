import {io} from 'socket.io-client'
import readline from 'readline'

const SERVER_URL = 'http://localhost:3000';

const socket = io(SERVER_URL, {
    reconnectionAttempts: 5,
    timeout: 10000.
});

const EVENTS = {
    CONNECT: 'connect',
    CONNECT_ERROR: 'connect_error',
    POLL_UPDATED: 'poll_updated',
    CAST_VOTE: 'cast_vote'
};

// set up the terminal to listen for your keyboard typing 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

socket.on(EVENTS.CONNECT, () => {
    // we don't need to emit a greeting here anymore
    // The server will automatically send us the poll state upon connection
});

socket.on(EVENTS.POLL_UPDATED, (poll)=> {
    // this clears the terminal screen to make it feel like a real UI
    console.clear();
    console.log(`\n LIVE POLL: ${poll.question} \n`);
    // loop through the options and print them 
    Object.entries(poll.options).forEach(([option, votes]) => {
        // Draw a visual bar chart using the repeat function
        const bar = '█'.repeat(votes);
        console.log(`[${option}] ${votes} votes | ${bar}`);
    });
    console.log(`\n----------------`);
    console.log('Type your vote exactly as shown and press enter');
});

// Listen for the user typing in the terminal and pressing Enter
rl.on('line', (input) => {
    const vote = input.trim(); // remove accidental spaces
    socket.emit(EVENTS.CAST_VOTE, vote);
});

socket.on(EVENTS.CONNECT_ERROR, (err) => {
    console.error(`Connection Error: ${err.message}`);
    process.exit(1);
});

