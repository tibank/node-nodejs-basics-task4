import robot from 'robotjs';
import { Duplex } from 'stream';

const drawLine = (axis: string, direction: number, lenght: number) => {
  const mouse: { [key: string]: any } = robot.getMousePos();

  for (let i = 0; i < lenght; i++) {
    direction > 0 ? mouse[axis]++ : mouse[axis]--;
    robot.moveMouse(mouse.x, mouse.y);
  }
};

export const drawSquare = (duplex: Duplex, x: number): void => {
  duplex.write(`draw_square ${x}\0`);

  drawLine('x', 1, x);
  drawLine('y', 1, x);
  drawLine('x', -1, x);
  drawLine('y', -1, x);
};

export const drawRectangular = (duplex: Duplex, x: number, y: number): void => {
  duplex.write(`draw_rectangle ${x} ${y}\0`);

  drawLine('x', 1, x);
  drawLine('y', 1, y);
  drawLine('x', -1, x);
  drawLine('y', -1, y);
};

export const drawCircle = (duplex: Duplex, r: number): void => {
  const LENGTH_CICLE = 2 * Math.PI;

  duplex.write(`draw_cicle ${r}\0`);

  const mouse = robot.getMousePos();
  mouse.x -= r;

  for (let i = 0; i <= LENGTH_CICLE; i += 0.01) {
    const x = mouse.x + r * Math.cos(i);
    const y = mouse.y + r * Math.sin(i);
    robot.moveMouse(x, y);
  }
};
