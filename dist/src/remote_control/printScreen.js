"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printScreen = void 0;
const jimp_1 = __importDefault(require("jimp"));
const robotjs_1 = __importDefault(require("robotjs"));
const printScreen = (duplex) => {
    const CAPTURE_WIDTH = 200;
    const CAPTURE_HEIGHT = 200;
    const POSITION_DATA_BASE64 = 22;
    const mouse = robotjs_1.default.getMousePos();
    const buf = robotjs_1.default.screen.capture(mouse.x, mouse.y, CAPTURE_WIDTH, CAPTURE_HEIGHT).image;
    new jimp_1.default({ data: buf, width: CAPTURE_WIDTH, height: CAPTURE_HEIGHT }, (err, image) => {
        if (err) {
            console.log(err);
        }
        else {
            image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
                if (idx % 4 === 0) {
                    [image.bitmap.data[idx], image.bitmap.data[idx + 2]] = [image.bitmap.data[idx + 2], image.bitmap.data[idx]];
                }
            });
            image
                .getBase64Async(jimp_1.default.MIME_PNG)
                .then((data) => {
                const base64 = data.slice(POSITION_DATA_BASE64);
                duplex.write(`prnt_scrn ${base64}`);
            })
                .catch((err) => console.log(err));
        }
    });
};
exports.printScreen = printScreen;
