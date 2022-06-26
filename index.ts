import { httpServer } from './src/http_server/index.js';
import { Duplex } from 'stream';
import * as ws from 'ws';
import { createWebSocketStream } from 'ws';
import { commands } from './src/remote_control/commands';

const HTTP_PORT: number = 3000;
const WS_PORT: number = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new ws.Server({ port: WS_PORT });

wss.on('connection', function connection(ws: ws) {
  ws.on('close', () => console.log('Socket is closed!'));
  const duplex: Duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

  duplex.on('data', (chunk: any): void => {
    console.log('received: ', chunk.toString());
    let command: string;
    let args: string[];
    [command, ...args] = chunk.toString().split(' ').filter(Boolean);
    const params = args.map((x: string): number => +x);
    try {
      commands[command](duplex, ...params);
      console.log(`Command ${command} was executed successfully!`);
    } catch (error) {
      console.log(`Command ${command} was not executed successfully! The error is ${error}`);
    }
  });

  duplex.on('error', (err: Error): void => console.error(`Get error: ${err.message}`));
});

wss.on('error', (err: Error): void => {
  console.log('Somthing is going wrong ' + err);
});

wss.on('close', (err: Error): void => {
  console.log('Websocket server is closed!');
});

process.on('SIGINT', () => {
  wss.clients.forEach((socket: any): void => {
    socket.close();

    process.nextTick((): void => {
      if ([socket.OPEN, socket.CLOSING].includes(socket.readyState)) {
        socket.terminate();
      }
    });
  });

  wss.close();
  process.exit(0);
});

process.on('exit', (code: number): void => {
  console.log(`About to exit with code: ${code}`);
});
