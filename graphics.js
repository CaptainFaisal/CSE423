const drawLine = (x1, y1, x2, y2, algo) => {
    clear();
    
    if (algo === 'DDA') {
        const length = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
        const dx = (x2 - x1) / length;
        const dy = (y2 - y1) / length;
        let x = x1;
        let y = y1;
        for (let i = 0; i < length; i++) {
            drawPixel(Math.floor(x + 0.5 * sign(dx)), Math.floor(y + 0.5 * sign(dy)));
            x += dx;
            y += dy;
        }
    }
    if (algo === 'BLA') {
        const drawLine_0 = (fx1, fy1, fx2, fy2, zone) => {
            const dx = fx2 - fx1;
            const dy = fy2 - fy1;
            const delE = 2 * dy;
            const delNE = 2 * (dy - dx);
            let d = 2 * dy - dx;
            let x = fx1;
            let y = fy1;
            let [px, py] = changeZone(x - x1, y - y1, zone);
            drawPixel(px + x1, py + y1);
            while (x < fx2) {
                if (d < 0) {
                    d += delE;
                } else {
                    d += delNE;
                    y++;
                }
                x++;
                [px, py] = changeZone(x - x1, y - y1, zone);
                drawPixel(px + x1, py + y1);
            }
        }
        let dx = x2 - x1;
        let dy = y2 - y1;
        const zone = getZone(dx, dy);
        [dx, dy] = changeZone(dx, dy, 0);
        [x2, y2] = [x1 + dx, y1 + dy];
        drawLine_0(x1, y1, x2, y2, zone);
    }
    render(frame_buffer);
}
