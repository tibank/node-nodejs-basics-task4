import Jimp from 'jimp';
import robot from 'robotjs';

export const printScreen = (duplex) => {
  const CAPTURE_WIDTH = 200;
  const CAPTURE_HEIGHT = 200;
  const POSITION_DATA_BASE64 = 22;

  const mouse = robot.getMousePos();
  const buf = robot.screen.capture(mouse.x, mouse.y, CAPTURE_WIDTH, CAPTURE_HEIGHT).image;
  new Jimp({ data: buf, width: CAPTURE_WIDTH, height: CAPTURE_HEIGHT }, (err, image) => {
    if (err) {
      console.log(err);
    } else {
      image
        .getBase64Async(Jimp.MIME_PNG)
        .then((data) => {
          const base64 = data.slice(POSITION_DATA_BASE64);
          duplex.write(`prnt_scrn ${base64}`);
        })
        .catch((err) => console.log(err));
    }
  });
};
