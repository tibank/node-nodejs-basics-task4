import { httpServer } from './src/http_server/index.js';
import { WebSocketServer, createWebSocketStream } from 'ws';
import { commands } from './src/remote_control/commands.js';

const HTTP_PORT = 3000;
const WS_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: WS_PORT });

wss.on('connection', function connection(ws) {
  ws.on('close', () => console.log('Socket is closed!'));
  const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

  duplex.on('data', (chunk) => {
    console.log('received: ', chunk.toString());
    const [command, ...args] = chunk.toString().split(' ').filter(Boolean);
    const params = args.map((x) => +x);
    try {
      commands[command](duplex, ...params);
      console.log(`Command ${command} was executed successfully!`);
    } catch (error) {
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
