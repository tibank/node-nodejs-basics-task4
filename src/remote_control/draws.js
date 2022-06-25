import robot from 'robotjs';

const drawLine = (axis, direction, lenght) => {
  const mouse = robot.getMousePos();

  for (let i = 0; i < lenght; i++) {
    direction > 0 ? mouse[axis]++ : mouse[axis]--;
    robot.moveMouse(mouse.x, mouse.y);
  }
};

export const drawSquare = (duplex, x) => {
  duplex.write(`draw_square ${x}\0`);

  drawLine('x', 1, x);
  drawLine('y', 1, x);
  drawLine('x', -1, x);
  drawLine('y', -1, x);
};

export const drawRectangular = (duplex, x, y) => {
  duplex.write(`draw_rectangle ${x} ${y}\0`);

  drawLine('x', 1, x);
  drawLine('y', 1, y);
  drawLine('x', -1, x);
  drawLine('y', -1, y);
};

export const drawCircle = (duplex, r) => {
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
