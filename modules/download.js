import { toCanvas } from "html-to-image";

export class Downloader {
  static async downloadCard(viewRef, filename = "card.png") {
    if (!viewRef?.current) return;

    await document.fonts.ready;

    const canvas = await toCanvas(viewRef.current, {
      pixelRatio: 4,
      cacheBust: true,
      backgroundColor: "#ffffff",
    });

    const card = viewRef.current.querySelector("#card-frame");
    const cardRect = card.getBoundingClientRect();
    const parentRect = viewRef.current.getBoundingClientRect();

    const scale = canvas.width / parentRect.width;

    const cropX = Math.floor((cardRect.left - parentRect.left) * scale);
    const cropY = Math.floor((cardRect.top - parentRect.top) * scale);
    const cropW = Math.ceil(cardRect.width * scale) - 2;
    const cropH = Math.ceil(cardRect.height * scale) - 118;


    const out = document.createElement("canvas");
    out.width = cropW;
    out.height = cropH;

    out
      .getContext("2d")
      .drawImage(
        canvas,
        cropX,
        cropY,
        cropW,
        cropH,
        0,
        0,
        cropW,
        cropH
      );

    const link = document.createElement("a");
    link.download = filename;
    link.href = out.toDataURL("image/png");
    link.click();
  }
}
