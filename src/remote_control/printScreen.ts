import Jimp from 'jimp';
import robot, { Bitmap } from 'robotjs';
import { Duplex } from 'stream';

interface Mouse {
  x: number;
  y: number;
}

export const printScreen = (duplex: Duplex): void => {
  const CAPTURE_WIDTH: number = 200;
  const CAPTURE_HEIGHT: number = 200;
  const POSITION_DATA_BASE64: number = 22;

  const mouse: Mouse = robot.getMousePos();
  const buf = robot.screen.capture(mouse.x, mouse.y, CAPTURE_WIDTH, CAPTURE_HEIGHT).image;
  new Jimp({ data: buf, width: CAPTURE_WIDTH, height: CAPTURE_HEIGHT }, (err: Error, image: any) => {
    if (err) {
      console.log(err);
    } else {
      image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x: number, y: number, idx: number): void => {
        if (idx % 4 === 0) {
          [image.bitmap.data[idx], image.bitmap.data[idx + 2]] = [image.bitmap.data[idx + 2], image.bitmap.data[idx]];
        }
      });
      image
        .getBase64Async(Jimp.MIME_PNG)
        .then((data: any): void => {
          const base64 = data.slice(POSITION_DATA_BASE64);
          duplex.write(`prnt_scrn ${base64}`);
        })
        .catch((err: Error) => console.log(err));
    }
  });
};
