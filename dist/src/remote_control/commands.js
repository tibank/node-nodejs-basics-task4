"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = void 0;
const mouseMove_1 = require("./mouseMove");
const draws_1 = require("./draws");
const printScreen_1 = require("./printScreen");
exports.commands = {
    mouse_up: mouseMove_1.mouseUp,
    mouse_down: mouseMove_1.mouseDown,
    mouse_left: mouseMove_1.mouseLeft,
    mouse_right: mouseMove_1.mouseRight,
    mouse_position: (duplex) => {
        duplex.write(`${(0, mouseMove_1.getMousePositionStr)()}\0`);
    },
    draw_circle: draws_1.drawCircle,
    draw_square: draws_1.drawSquare,
    draw_rectangle: draws_1.drawRectangular,
    prnt_scrn: printScreen_1.printScreen,
};
