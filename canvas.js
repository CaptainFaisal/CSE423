const canvas = document.getElementById('monitor');
const scale = 4;
const w = 192 * scale;
const h = 108 * scale;
canvas.width = w;
canvas.height = h;
const n = 24;
const hn = h / n;
const wn = w / n;
const d = h / hn;
const c = canvas.getContext('2d');
const frame_buffer = [...Array.from({ length: wn }, e => Array.from({ length: hn }, e => 0))];
const drawCircle = (x, y, radius, color = 'white') => {
  c.beginPath();
  c.arc(x, y, radius, 0, Math.PI * 2, false);
  c.strokeStyle = 'black';
  c.fillStyle = color;
  c.fill();
  c.stroke();
}
const changeZone = (x, y, zone) => {
  x = Math.abs(x);
  y = Math.abs(y);
  if (x < y) [x, y] = [y, x]
  switch (zone) {
    case 0: return [x, y];
    case 1: return [y, x];
    case 2: return [-y, x];
    case 3: return [-x, y];
    case 4: return [-x, -y];
    case 5: return [-y, -x];
    case 6: return [y, -x];
    case 7: return [x, -y];
  }
}
const getZone = (x, y) => {
  if (x >= 0 && y >= 0) {
    if (x > y) return 0;
    else return 1;
  } else if (x < 0 && y >= 0) {
    if (-x > y) return 3;
    else return 2;
  } else if (x < 0 && y < 0) {
    if (x < y) return 4;
    else return 5;
  } else if (x >= 0 && y < 0) {
    if (x > -y) return 7;
    else return 6;
  }
}
const drawPixel = (x, y) => frame_buffer[x][y] = 1;
const sign = (x) => x >= 0 ? 1 : x < 0 ? -1 : 0;
const render = (fb) => {
  for (let i = 0; i < hn; i++) {
    for (let j = 0; j < wn; j++) {
      const x = d / 2 + d * j;
      const y = d / 2 + d * (hn - 1 - i);
      const color = fb[j][i] === 0 ? 'white' : 'black';
      drawCircle(x, y, 5, color);
    }
  }
}
const clear = () => {
  for (let i = 0; i < hn; i++) {
    for (let j = 0; j < wn; j++) {
      c.beginPath();
      c.moveTo(d / 2 + d * j, 0);
      c.lineTo(d / 2 + d * j, h);
      c.strokeStyle = 'black';
      c.stroke();
      frame_buffer[j][i] = 0;
    }
    c.beginPath();
    c.moveTo(0, d / 2 + d * i);
    c.lineTo(w, d / 2 + d * i);
    c.strokeStyle = 'black';
    c.stroke();
  }
  for (let i = 0; i < hn; i++) {
    for (let j = 0; j < wn; j++) {
      drawCircle(d / 2 + d * j, d / 2 + d * i, 5);
    }
  }
}

clear();