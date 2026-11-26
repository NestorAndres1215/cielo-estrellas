
export function generateTextPoints(text, width, height, options = {}) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;

  const isMobile = width <= 600;

  const fontSize = options.fontSize ?? Math.min(
    width * (isMobile ? 0.09 : 0.085),
    height * 0.13,
    100
  );

  const gap = options.gap ?? (isMobile ? 5 : 4);
  const maxWidth = width * (isMobile ? 0.88 : 0.92);

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `bold ${fontSize}px Arial`;

  const words = text.split(/\s+/);
  const lines = [];
  let currentLine = '';

  // En móviles, dividir las frases largas automáticamente.
  if (isMobile) {
    words.forEach((word) => {
      const testLine = currentLine
        ? `${currentLine} ${word}`
        : word;

      if (ctx.measureText(testLine).width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }
  } else {
    lines.push(text);
  }

  const lineHeight = fontSize * 1.25;
  const totalHeight = lines.length * lineHeight;
  const startY = (height - totalHeight) / 2 + lineHeight / 2;

  lines.forEach((line, index) => {
    ctx.fillText(
      line,
      width / 2,
      startY + index * lineHeight,
      maxWidth
    );
  });

  const image = ctx.getImageData(0, 0, width, height);
  const points = [];

  for (let y = 0; y < height; y += gap) {
    for (let x = 0; x < width; x += gap) {
      const pixelIndex = (y * width + x) * 4;

      if (image.data[pixelIndex + 3] > 128) {
        points.push({ x, y });
      }
    }
  }

  return points;
}

export function generateHeartPoints(width, height, count = 1000) {
  const points = [];

  const centerX = width / 2;
  const centerY = height / 2;

  const scale = Math.min(width, height) / 38;

  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;

    const x = 16 * Math.pow(Math.sin(t), 3);

    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    points.push({
      x: centerX + x * scale,
      y: centerY - y * scale,
    });
  }

  return points;
}
