
export class Particle {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.x = Math.random() * width;
    this.y = Math.random() * height;

    this.targetX = this.x;
    this.targetY = this.y;

    this.vx = 0;
    this.vy = 0;

    this.size = Math.random() * 1.6 + 0.8;

    this.alpha = Math.random() * 0.5 + 0.5;

    this.phase = Math.random() * Math.PI * 2;

    this.twinkleSpeed =
      Math.random() * 0.025 + 0.01;

    this.speed = Math.random() * 0.045 + 0.035;

    this.color = this.randomColor();

    this.currentAlpha = this.alpha;
  }

  randomColor() {
    const colors = [
      '#ffffff',
      '#f9d78a',
      '#d8c7ff',
      '#f9b8d5',
      '#a5c8ff',
    ];

    return colors[
      Math.floor(Math.random() * colors.length)
    ];
  }

  setTarget(x, y) {
    this.targetX = x;
    this.targetY = y;
  }

  update(time) {
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;

    this.vx += dx * this.speed * 0.08;
    this.vy += dy * this.speed * 0.08;

    this.vx *= 0.88;
    this.vy *= 0.88;

    this.x += this.vx;
    this.y += this.vy;

    this.phase += this.twinkleSpeed;

    this.currentAlpha =
      this.alpha *
      (0.65 + Math.sin(time + this.phase) * 0.35);
  }

  draw(ctx) {
    ctx.globalAlpha = this.currentAlpha;
    ctx.fillStyle = this.color;

    // Reducimos el coste del efecto de brillo.
    ctx.shadowBlur = 5;
    ctx.shadowColor = this.color;

    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.size,
      0,
      Math.PI * 2
    );

    ctx.fill();

    // Restauramos los valores para el siguiente dibujo.
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }
}
