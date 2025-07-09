import { CSSProperties } from "react";

export const createColorGenerator = () => {
  const usedHashes = new Map<string, number>();

  return (usr: string): { style: CSSProperties } => {
    let hash = 0;
    for (let i = 0; i < usr.length; i++) {
      hash += usr.charCodeAt(i) + ((hash << 5) - hash);
    }

    let baseHue = Math.abs((hash % 40) * 9);
    let offset = usedHashes.get(usr) ?? 0;

    while ([...usedHashes.values()].includes(baseHue + offset)) {
      offset += 13;
    }

    const h = (baseHue + offset) % 360;
    const s = 30;
    const l = 50;
    const a = 1;

    const backgroundColor = `hsla(${h}, ${s}%, ${l}%, ${a})`;
    usedHashes.set(usr, offset);

    const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
      s /= 100;
      l /= 100;
      const k = (n: number) => (n + h / 30) % 12;
      const a = s * Math.min(l, 1 - l);
      const f = (n: number) =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
      return [f(0) * 255, f(8) * 255, f(4) * 255];
    };

    const [r, g, b] = hslToRgb(h, s, l);
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    const color = luminance > 186 ? "#000000" : "#FFFFFF";

    return {
      style: {
        backgroundColor,
        color,
      },
    };
  };
};

