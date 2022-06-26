"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMousePositionStr = exports.mouseRight = exports.mouseLeft = exports.mouseDown = exports.mouseUp = void 0;
const robotjs_1 = __importDefault(require("robotjs"));
const mouseUp = (duplex, step) => {
    duplex.write(`mouse_up ${step}\0`);
    const screenSize = robotjs_1.default.getScreenSize();
    const mouse = robotjs_1.default.getMousePos();
    let newCoordinate = mouse.y - step;
    mouse.y = newCoordinate < 0 ? 0 : newCoordinate;
    robotjs_1.default.moveMouse(mouse.x, mouse.y);
};
exports.mouseUp = mouseUp;
const mouseDown = (duplex, step) => {
    duplex.write(`mouse_down ${step}\0`);
    const screenSize = robotjs_1.default.getScreenSize();
    const mouse = robotjs_1.default.getMousePos();
    let newCoordinate = mouse.y + step;
    mouse.y = newCoordinate > screenSize.height ? screenSize.height : newCoordinate;
    robotjs_1.default.moveMouse(mouse.x, mouse.y);
};
exports.mouseDown = mouseDown;
const mouseLeft = (duplex, step) => {
    duplex.write(`mouse_left ${step}\0`);
    const mouse = robotjs_1.default.getMousePos();
    let newCoordinate = mouse.x - step;
    mouse.x = newCoordinate < 0 ? 0 : newCoordinate;
    robotjs_1.default.moveMouse(mouse.x, mouse.y);
};
exports.mouseLeft = mouseLeft;
const mouseRight = (duplex, step) => {
    duplex.write(`mouse_right ${step}\0`);
    const screenSize = robotjs_1.default.getScreenSize();
    const mouse = robotjs_1.default.getMousePos();
    let newCoordinate = mouse.x + step;
    mouse.x = newCoordinate > screenSize.width ? screenSize.width : newCoordinate;
    robotjs_1.default.moveMouse(mouse.x, mouse.y);
};
exports.mouseRight = mouseRight;
const getMousePositionStr = () => {
    const mouse = robotjs_1.default.getMousePos();
    return `mouse_position ${mouse.x},${mouse.y}`;
};
exports.getMousePositionStr = getMousePositionStr;
