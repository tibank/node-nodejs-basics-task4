import { Duplex } from 'stream';
import { mouseUp, mouseDown, mouseLeft, mouseRight, getMousePositionStr } from './mouseMove';
import { drawSquare, drawRectangular, drawCircle } from './draws';
import { printScreen } from './printScreen';

export const commands: { [key: string]: any } = {
  mouse_up: mouseUp,
  mouse_down: mouseDown,
  mouse_left: mouseLeft,
  mouse_right: mouseRight,
  mouse_position: (duplex: Duplex): void => {
    duplex.write(`${getMousePositionStr()}\0`);
  },
  draw_circle: drawCircle,
  draw_square: drawSquare,
  draw_rectangle: drawRectangular,
  prnt_scrn: printScreen,
};
