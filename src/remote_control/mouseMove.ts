import robot from 'robotjs';
import { Duplex } from 'stream';

interface Mouse {
  x: number;
  y: number;
}

interface Screen {
  width: number;
  height: number;
}

export const mouseUp = (duplex: Duplex, step: number): void => {
  duplex.write(`mouse_up ${step}\0`);
  const screenSize: Screen = robot.getScreenSize();
  const mouse: Mouse = robot.getMousePos();

  let newCoordinate = mouse.y - step;
  mouse.y = newCoordinate < 0 ? 0 : newCoordinate;
  robot.moveMouse(mouse.x, mouse.y);
};

export const mouseDown = (duplex: Duplex, step: number): void => {
  duplex.write(`mouse_down ${step}\0`);
  const screenSize: Screen = robot.getScreenSize();
  const mouse: Mouse = robot.getMousePos();

  let newCoordinate = mouse.y + step;
  mouse.y = newCoordinate > screenSize.height ? screenSize.height : newCoordinate;
  robot.moveMouse(mouse.x, mouse.y);
};

export const mouseLeft = (duplex: Duplex, step: number): void => {
  duplex.write(`mouse_left ${step}\0`);
  const mouse: Mouse = robot.getMousePos();

  let newCoordinate = mouse.x - step;
  mouse.x = newCoordinate < 0 ? 0 : newCoordinate;
  robot.moveMouse(mouse.x, mouse.y);
};

export const mouseRight = (duplex: Duplex, step: number): void => {
  duplex.write(`mouse_right ${step}\0`);
  const screenSize = robot.getScreenSize();
  const mouse: Mouse = robot.getMousePos();

  let newCoordinate = mouse.x + step;
  mouse.x = newCoordinate > screenSize.width ? screenSize.width : newCoordinate;
  robot.moveMouse(mouse.x, mouse.y);
};

export const getMousePositionStr = (): string => {
  const mouse: any = robot.getMousePos();

  return `mouse_position ${mouse.x},${mouse.y}`;
};
