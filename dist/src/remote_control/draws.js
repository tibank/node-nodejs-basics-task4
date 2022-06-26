"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawCircle = exports.drawRectangular = exports.drawSquare = void 0;
const robotjs_1 = __importDefault(require("robotjs"));
const drawLine = (axis, direction, lenght) => {
    const mouse = robotjs_1.default.getMousePos();
    for (let i = 0; i < lenght; i++) {
        direction > 0 ? mouse[axis]++ : mouse[axis]--;
        robotjs_1.default.moveMouse(mouse.x, mouse.y);
    }
};
const drawSquare = (duplex, x) => {
    duplex.write(`draw_square ${x}\0`);
    drawLine('x', 1, x);
    drawLine('y', 1, x);
    drawLine('x', -1, x);
    drawLine('y', -1, x);
};
exports.drawSquare = drawSquare;
const drawRectangular = (duplex, x, y) => {
    duplex.write(`draw_rectangle ${x} ${y}\0`);
    drawLine('x', 1, x);
    drawLine('y', 1, y);
    drawLine('x', -1, x);
    drawLine('y', -1, y);
};
exports.drawRectangular = drawRectangular;
const drawCircle = (duplex, r) => {
    const LENGTH_CICLE = 2 * Math.PI;
    duplex.write(`draw_cicle ${r}\0`);
    const mouse = robotjs_1.default.getMousePos();
    mouse.x -= r;
    for (let i = 0; i <= LENGTH_CICLE; i += 0.01) {
        const x = mouse.x + r * Math.cos(i);
        const y = mouse.y + r * Math.sin(i);
        robotjs_1.default.moveMouse(x, y);
    }
};
exports.drawCircle = drawCircle;
