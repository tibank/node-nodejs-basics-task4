import { httpServer } from './src/http_server/index.js';
import { WebSocketServer, createWebSocketStream } from 'ws';
import { commands } from './src/remote_control/commands.js';

const HTTP_PORT = 3000;
const WS_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: WS_PORT });

wss.on('connection', function connection(ws) {
  const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

  duplex.on('data', (chunk) => {
    console.log('received: ', chunk.toString());
    const [command, ...args] = chunk.toString().split(' ').filter(Boolean);
    const params = args.map((x) => +x);
    commands[command](duplex, ...params);
  });

  duplex.on('error', (err) => console.error(`Get error: ${err.message}`));
});

process.on('SIGINT', () => {});

// process.on('exit', () => {
//   wss.close();
//   console.log(`Socket is closed!`);
// });
