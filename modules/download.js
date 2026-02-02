import { toCanvas } from "html-to-image";

import { writeBinaryFile } from "@tauri-apps/plugin-fs";
import { save } from "@tauri-apps/plugin-dialog";

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

    out.getContext("2d").drawImage(
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

    const dataUrl = out.toDataURL("image/png");

    const isTauri = !!window.__TAURI__;

    if (isTauri) {
      const filePath = await save({
        defaultPath: filename,
        filters: [{ name: "PNG Image", extensions: ["png"] }],
      });

      if (!filePath) return;

      const base64 = dataUrl.split(",")[1];
      const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

      await writeBinaryFile(filePath, bytes);
    } else {
      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      link.click();
    }
  }
}
