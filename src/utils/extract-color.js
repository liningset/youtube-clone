const getBrightness = (r, g, b) => {
  return (r + g + b) / (3 * 255);
};

const getSaturation = (r, g, b) => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  return max ? (max - min) / max : 0;
};

const extractColor = (img) => {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;

  const ctx = canvas.getContext("2d");

  ctx.drawImage(img, 0, 0, 32, 32);
  const bytes = ctx.getImageData(0, 0, 32, 32);
  const counts = new Map();

  for (let i = 0; i < 1024; i++) {
    const pixel = i * 4;
    const r = Math.round(bytes.data[pixel] / 10) * 10;
    const g = Math.round(bytes.data[pixel + 1] / 10) * 10;
    const b = Math.round(bytes.data[pixel + 2] / 10) * 10;

    const brightness = getBrightness(r, g, b);
    const saturation = getSaturation(r, g, b);

    const isUsable = brightness < 0.9 && brightness > 0.1 && saturation > 0.2;

    const key = `${r},${g},${b}`;
    if (isUsable) counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  let mostProminent;
  let highestCount = 0;

  for (const [color, count] of counts) {
    if (count > highestCount) {
      highestCount = count;
      mostProminent = color;
    }
  }

  return `rgba(${mostProminent},0.2)`;
};

export default extractColor;
