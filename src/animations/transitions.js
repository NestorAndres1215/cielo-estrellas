
export function assignFormation(particles, points) {
    if (!points.length) return;

    particles.forEach((particle, index) => {
        // Distribuimos las partículas uniformemente
        // por todos los puntos de la formación.
        const pointIndex = Math.floor(
            (index * points.length) / particles.length
        );

        const point = points[pointIndex];

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
