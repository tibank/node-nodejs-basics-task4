"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("./src/http_server/index.js");
const ws = __importStar(require("ws"));
const ws_1 = require("ws");
const commands_1 = require("./src/remote_control/commands");
const HTTP_PORT = 3000;
const WS_PORT = 8080;
console.log(`Start static http server on the ${HTTP_PORT} port!`);
index_js_1.httpServer.listen(HTTP_PORT);
const wss = new ws.Server({ port: WS_PORT });
wss.on('connection', function connection(ws) {
    ws.on('close', () => console.log('Socket is closed!'));
    const duplex = (0, ws_1.createWebSocketStream)(ws, { encoding: 'utf8', decodeStrings: false });
    duplex.on('data', (chunk) => {
        console.log('received: ', chunk.toString());
        let command;
        let args;
        [command, ...args] = chunk.toString().split(' ').filter(Boolean);
        const params = args.map((x) => +x);
        try {
            commands_1.commands[command](duplex, ...params);
            console.log(`Command ${command} was executed successfully!`);
        }
        catch (error) {
            console.log(`Command ${command} was not executed successfully! The error is ${error}`);
        }
    });
    duplex.on('error', (err) => console.error(`Get error: ${err.message}`));
});
wss.on('error', (err) => {
    console.log('Somthing is going wrong ' + err);
});
wss.on('close', (err) => {
    console.log('Websocket server is closed!');
});
process.on('SIGINT', () => {
    wss.clients.forEach((socket) => {
        socket.close();
        process.nextTick(() => {
            if ([socket.OPEN, socket.CLOSING].includes(socket.readyState)) {
                socket.terminate();
            }
        });
    });
    wss.close();
    process.exit(0);
});
process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
});
