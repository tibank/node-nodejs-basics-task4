import robot from 'robotjs';

export const mouseMove = (axis, step) => {
  const screenSize = robot.getScreenSize();
  const mouse = robot.getMousePos();
  const bound = axis === 'x' ? screenSize.width : screenSize.height;

  let newCoordinate = mouse[axis] + step;
  mouse[axis] = newCoordinate < 0 ? 0 : newCoordinate > bound ? bound : newCoordinate;

  robot.moveMouse(mouse.x, mouse.y);

  return mouse;
};

export const mouseUp = (duplex, step) => {
  duplex.write(`mouse_up ${step}\0`);
  const screenSize = robot.getScreenSize();
  const mouse = robot.getMousePos();

  let newCoordinate = mouse.y - step;
  mouse.y = newCoordinate < 0 ? 0 : newCoordinate;
  robot.moveMouse(mouse.x, mouse.y);
};

export const mouseDown = (duplex, step) => {
  duplex.write(`mouse_down ${step}\0`);
  const screenSize = robot.getScreenSize();
  const mouse = robot.getMousePos();

  let newCoordinate = mouse.y + step;
  mouse.y = newCoordinate > screenSize.height ? screenSize.height : newCoordinate;
  robot.moveMouse(mouse.x, mouse.y);
};

export const mouseLeft = (duplex, step) => {
  duplex.write(`mouse_left ${step}\0`);
  const screenSize = robot.getScreenSize();
  const mouse = robot.getMousePos();

  let newCoordinate = mouse.x - step;
  mouse.x = newCoordinate < 0 ? 0 : newCoordinate;
  robot.moveMouse(mouse.x, mouse.y);
};

export const mouseRight = (duplex, step) => {
  duplex.write(`mouse_right ${step}\0`);
  const screenSize = robot.getScreenSize();
  const mouse = robot.getMousePos();

  let newCoordinate = mouse.x + step;
  mouse.x = newCoordinate > screenSize.width ? screenSize.width : newCoordinate;
  robot.moveMouse(mouse.x, mouse.y);
};

export const getMousePositionStr = () => {
  const mouse = robot.getMousePos();

  return `mouse_position ${mouse.x},${mouse.y}`;
};
