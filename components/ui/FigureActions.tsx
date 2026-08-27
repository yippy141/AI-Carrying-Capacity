"use client";

import { useState } from "react";
import { toPng, toSvg } from "html-to-image";

const EXPORT_BACKGROUND = "#FBFAF7";

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function figureNode(figureId: string): HTMLElement {
  const figure = document.getElementById(figureId);
  if (!figure) throw new Error("The figure is not available for export.");
  return figure;
}

function includeInExport(node: HTMLElement): boolean {
  return !(node instanceof HTMLElement && node.hasAttribute("data-figure-actions"));
}

async function dataUrlAsBlob(dataUrl: string): Promise<Blob> {
  const response = await fetch(dataUrl);
  if (!response.ok) throw new Error("The browser could not prepare the export.");
  return response.blob();
}

function pngFromSvg(svg: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const source = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const sourceUrl = URL.createObjectURL(source);
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, image.naturalWidth * 2);
      canvas.height = Math.max(1, image.naturalHeight * 2);
      const context = canvas.getContext("2d");
      if (!context) {
        URL.revokeObjectURL(sourceUrl);
        reject(new Error("PNG export is unavailable in this browser."));
        return;
      }
      context.fillStyle = EXPORT_BACKGROUND;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(sourceUrl);
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("The browser could not create the PNG file."));
      }, "image/png");
    };
    image.onerror = () => {
      URL.revokeObjectURL(sourceUrl);
      reject(new Error("The browser could not render the figure export."));
    };
    image.src = sourceUrl;
  });
}

export function FigureActions({
  exportBaseName,
  explicitSvg,
  figureId
}: {
  exportBaseName: string;
  explicitSvg?: string;
  figureId: string;
}) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState<"png" | "svg" | null>(null);

  async function exportSvg() {
    try {
      setError("");
      setBusy("svg");
      const blob = explicitSvg
        ? new Blob([explicitSvg], { type: "image/svg+xml;charset=utf-8" })
        : await dataUrlAsBlob(
            await toSvg(figureNode(figureId), {
              backgroundColor: EXPORT_BACKGROUND,
              cacheBust: true,
              filter: includeInExport
            })
          );
      triggerDownload(
        blob,
        `${exportBaseName}.svg`
      );
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "SVG export failed.");
    } finally {
      setBusy(null);
    }
  }

  async function exportPng() {
    try {
      setError("");
      setBusy("png");
      const blob = explicitSvg
        ? await pngFromSvg(explicitSvg)
        : await dataUrlAsBlob(
            await toPng(figureNode(figureId), {
              backgroundColor: EXPORT_BACKGROUND,
              cacheBust: true,
              filter: includeInExport,
              pixelRatio: 2
            })
          );
      triggerDownload(blob, `${exportBaseName}.png`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "PNG export failed.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="text-right" data-figure-actions>
      <div className="flex items-center gap-2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.05em]">
        <a className="focus-ring inline-flex min-h-11 items-center px-1" href={`#${figureId}`}>
          Permalink
        </a>
        <button className="focus-ring inline-flex min-h-11 cursor-pointer items-center px-1 disabled:cursor-wait disabled:opacity-60" disabled={busy !== null} onClick={exportPng} type="button">
          {busy === "png" ? "PNG…" : "PNG"}
        </button>
        <button className="focus-ring inline-flex min-h-11 cursor-pointer items-center px-1 disabled:cursor-wait disabled:opacity-60" disabled={busy !== null} onClick={exportSvg} type="button">
          {busy === "svg" ? "SVG…" : "SVG"}
        </button>
      </div>
      {error ? (
        <p className="mt-2 max-w-64 text-[11px] normal-case tracking-normal text-ink-soft" role="status">
          {error}
        </p>
      ) : null}
    </div>
  );
}
