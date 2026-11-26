
export function assignFormation(particles, points) {
    if (!points.length) return;

    const shuffled = [...points];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] =
            [shuffled[j], shuffled[i]];
    }

    particles.forEach((particle, index) => {
        const point = shuffled[index % shuffled.length];

        particle.setTarget(point.x, point.y);
    });
}

export function scatterParticles(
    particles,
    width,
    height
) {
    particles.forEach((particle) => {
        const angle = Math.random() * Math.PI * 2;

        const distance =
            Math.random() * Math.min(width, height) * 0.5;

        particle.setTarget(
            width / 2 + Math.cos(angle) * distance,
            height / 2 + Math.sin(angle) * distance
        );
    });
}
