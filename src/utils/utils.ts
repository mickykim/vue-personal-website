// Takes the viewport widths in pixels and the font sizes in rem
export function clampBuilder(
  minWidthPx: number,
  maxWidthPx: number,
  minFontSize: number,
  maxFontSize: number
) {
  const root = document.querySelector("html");
  if (!root) return new Error("html element not found");

  // Grab the value of 1rem from the browser. Slice to ignore px suffix. Default 1rem = 16px
  const pixelsPerRem = Number(getComputedStyle(root).fontSize.slice(0, -2));

  const minWidth = minWidthPx / pixelsPerRem;
  const maxWidth = maxWidthPx / pixelsPerRem;

  // Linear interpolation rate
  const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth);
  const yAxisIntersection = -minWidth * slope + minFontSize;

  return `clamp( ${minFontSize}rem, ${yAxisIntersection}rem + ${
    slope * 100
  }vw, ${maxFontSize}rem )`;
}
/**
 * @param elements
 * @param wrapType
 * @returns
 */
export const wrapLines = (
  elements: Array<HTMLElement> | null,
  wrapType: string
) => {
  console.log(elements);
  if (!elements || elements.length === 0 || wrapType === "") return;
  elements.forEach((el) => {
    const wrapEl = document.createElement(wrapType);
    wrapEl.style.overflow = "hidden";
    el.parentNode?.appendChild(wrapEl);
    wrapEl.appendChild(el);
  });
};
