import Cropper from "cropperjs";

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

export default async function getCroppedImg(imageSrc, crop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  /* setting canvas width & height allows us to
     resize from the original image resolution */
  canvas.width = image.width;
  canvas.height = image.height;

  ctx.drawImage(image, 0, 0);

  const pixelRatio = window.devicePixelRatio;
  const { x, y, width, height } = crop;
  const canvasData = ctx.getImageData(x, y, width, height);

  const pCanvas = document.createElement("canvas");
  pCanvas.width = width;
  pCanvas.height = height;

  const pctx = pCanvas.getContext("2d");
  pctx.putImageData(canvasData, 0, 0);

  return new Promise((resolve) => {
    pCanvas.toBlob((file) => {
      resolve(file); // resolving with Blob object
    }, "image/jpeg");
  });
}
