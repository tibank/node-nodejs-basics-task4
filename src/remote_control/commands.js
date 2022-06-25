import { mouseUp, mouseDown, mouseLeft, mouseRight, getMousePositionStr } from './mouseMove.js';
import { drawSquare, drawRectangular, drawCircle } from './draws.js';
import { printScreen } from './printScreen.js';

export const commands = {
  mouse_up: mouseUp,
  mouse_down: mouseDown,
  mouse_left: mouseLeft,
  mouse_right: mouseRight,
  mouse_position: (duplex) => {
    duplex.write(`${getMousePositionStr()}\0`);
  },
  draw_circle: drawCircle,
  draw_square: drawSquare,
  draw_rectangle: drawRectangular,
  prnt_scrn: printScreen,
};
