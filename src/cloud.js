import * as d3 from 'd3'

// Word cloud layout by Jason Davies, http://www.jasondavies.com/word-cloud/
// Algorithm due to Jonathan Feinberg, http://static.mrfeinberg.com/bv_ch03.pdf
export default function cloud() {
  let dimensions = [256, 256],
  text = cloudText,
  font = cloudFont,
  fontSize = cloudFontSize,
  fontStyle = cloudFontNormal,
  fontWeight = cloudFontNormal,
  rotate = cloudRotate,
  padding = cloudPadding,
  spiral = archimedeanSpiral,
  words = [],
  cloud = {};

  cloud.compute = function() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    let board = zeroArray((dimensions[0] >> 5) * dimensions[1]),
    bounds = null,
    tags = [],
    data = words.map(function(d, i) {
      d.text = text.call(this, d, i);
      d.font = font.call(this, d, i);
      d.style = fontStyle.call(this, d, i);
      d.weight = fontWeight.call(this, d, i);
      d.rotate = rotate.call(this, d, i);
      d.size = ~~fontSize.call(this, d, i);
      d.padding = padding.call(this, d, i);
      return d;
    }).sort(function(a, b) { return b.size - a.size; });

    step(words.length);

    return data;

    function step(length) {
      for(let i=0; i<length; ++i) {
        let d = data[i];
        d.x = (dimensions[0] * (Math.random() + .5)) >> 1;
        d.y = (dimensions[1] * (Math.random() + .5)) >> 1;
        cloudSprite(d, data, i);
        if (d.hasText && place(board, d, bounds)) {
          tags.push(d);
          if (bounds) cloudBounds(bounds, d);
          else bounds = [{x: d.x + d.x0, y: d.y + d.y0}, {x: d.x + d.x1, y: d.y + d.y1}];
          // Temporary hack
          d.x -= dimensions[0] >> 1;
          d.y -= dimensions[1] >> 1;
        }
      }
    }
  }


  function place(board, tag, bounds) {
    let perimeter = [{x: 0, y: 0}, {x: dimensions[0], y: dimensions[1]}],
    startX = tag.x,
    startY = tag.y,
    maxDelta = Math.sqrt(dimensions[0] * dimensions[0] + dimensions[1] * dimensions[1]),
    s = spiral(dimensions),
    dt = Math.random() < .5 ? 1 : -1,
    t = -dt,
    dxdy,
    dx,
    dy;

    while (dxdy = s(t += dt)) {
      dx = ~~dxdy[0];
      dy = ~~dxdy[1];

      if (Math.min(dx, dy) > maxDelta) break;

      tag.x = startX + dx;
      tag.y = startY + dy;

      if (
        tag.x + tag.x0 < 0 || tag.y + tag.y0 < 0 ||
        tag.x + tag.x1 > dimensions[0] || tag.y + tag.y1 > dimensions[1]
      ) continue;
      // TODO only check for collisions within current bounds.
      if (!bounds || !cloudCollide(tag, board, dimensions[0])) {
        if (!bounds || collideRects(tag, bounds)) {
          let sprite = tag.sprite,
          w = tag.width >> 5,
          sw = dimensions[0] >> 5,
          lx = tag.x - (w << 4),
          sx = lx & 0x7f,
          msx = 32 - sx,
          h = tag.y1 - tag.y0,
          x = (tag.y + tag.y0) * sw + (lx >> 5),
          last;
          for (let j = 0; j < h; j++) {
            last = 0;
            for (let i = 0; i <= w; i++) {
              board[x + i] |= (last << msx) | (i < w ? (last = sprite[j * w + i]) >>> sx : 0);
            }
            x += sw;
          }
          delete tag.sprite;
          return true;
        }
      }
    }
    return false;
  }

  cloud.words = function(x) {
    if (!arguments.length) return words;
    words = x;
    return cloud;
  };

  cloud.dimensions = function(x) {
    if (!arguments.length) return dimensions;
    dimensions = [+x[0], +x[1]];
    return cloud;
  };

  cloud.font = function(x) {
    if (!arguments.length) return font;
    font = functor(x);
    return cloud;
  };

  cloud.fontStyle = function(x) {
    if (!arguments.length) return fontStyle;
    fontStyle = functor(x);
    return cloud;
  };

  cloud.fontWeight = function(x) {
    if (!arguments.length) return fontWeight;
    fontWeight = functor(x);
    return cloud;
  };

  cloud.rotate = function(x) {
    if (!arguments.length) return rotate;
    rotate = functor(x);
    return cloud;
  };

  cloud.text = function(x) {
    if (!arguments.length) return text;
    text = functor(x);
    return cloud;
  };

  cloud.spiral = function(x) {
    if (!arguments.length) return spiral;
    spiral = spirals[x + ""] || x;
    return cloud;
  };

  cloud.fontSize = function(x) {
    if (!arguments.length) return fontSize;
    fontSize = functor(x);
    return cloud;
  };

  cloud.padding = function(x) {
    if (!arguments.length) return padding;
    padding = functor(x);
    return cloud;
  };



  function cloudText(d) {
    return d.text;
  }

  function cloudFont() {
    return "serif";
  }

  function cloudFontNormal() {
    return "normal";
  }

  function cloudFontSize(d) {
    return Math.sqrt(d.value);
  }

  function cloudRotate() {
    return (~~(Math.random() * 6) - 3) * 30;
  }

  function cloudPadding() {
    return 1;
  }

  // Fetches a monochrome sprite bitmap for the specified text.
  // Load in batches for speed.
  function cloudSprite(d, data, di) {
    if (d.sprite) return;
    ctx.clearRect(0, 0, (cw << 5) / ratio, ch / ratio);
    let x = 0,
    y = 0,
    maxh = 0,
    n = data.length;
    --di;
    while (++di < n) {
      d = data[di];
      ctx.save();
      ctx.font = d.style + " " + d.weight + " " + ~~((d.size + 1) / ratio) + "px " + d.font;
      let w = ctx.measureText(d.text + "m").width * ratio,
      h = d.size << 1;
      if (d.rotate) {
        let sr = Math.sin(d.rotate * cloudRadians),
        cr = Math.cos(d.rotate * cloudRadians),
        wcr = w * cr,
        wsr = w * sr,
        hcr = h * cr,
        hsr = h * sr;
        w = (Math.max(Math.abs(wcr + hsr), Math.abs(wcr - hsr)) + 0x1f) >> 5 << 5;
        h = ~~Math.max(Math.abs(wsr + hcr), Math.abs(wsr - hcr));
      } else {
        w = (w + 0x1f) >> 5 << 5;
      }
      if (h > maxh) maxh = h;
      if (x + w >= (cw << 5)) {
        x = 0;
        y += maxh;
        maxh = 0;
      }
      if (y + h >= ch) break;
      ctx.translate((x + (w >> 1)) / ratio, (y + (h >> 1)) / ratio);
      if (d.rotate) ctx.rotate(d.rotate * cloudRadians);
      ctx.fillText(d.text, 0, 0);
      if (d.padding) ctx.lineWidth = 2 * d.padding, ctx.strokeText(d.text, 0, 0);
      ctx.restore();
      d.width = w;
      d.height = h;
      d.xoff = x;
      d.yoff = y;
      d.x1 = w >> 1;
      d.y1 = h >> 1;
      d.x0 = -d.x1;
      d.y0 = -d.y1;
      d.hasText = true;
      x += w;
    }
    let pixels = ctx.getImageData(0, 0, (cw << 5) / ratio, ch / ratio).data,
    sprite = [];
    while (--di >= 0) {
      d = data[di];
      if (!d.hasText) continue;
      let w = d.width,
      w32 = w >> 5,
      h = d.y1 - d.y0;
      // Zero the buffer
      for (let i = 0; i < h * w32; i++) sprite[i] = 0;
      x = d.xoff;
      if (x == null) return;
      y = d.yoff;
      let seen = 0,
      seenRow = -1;
      for (let j = 0; j < h; j++) {
        for (let i = 0; i < w; i++) {
          let k = w32 * j + (i >> 5),
          m = pixels[((y + j) * (cw << 5) + (x + i)) << 2] ? 1 << (31 - (i % 32)) : 0;
          sprite[k] |= m;
          seen |= m;
        }
        if (seen) seenRow = j;
        else {
          d.y0++;
          h--;
          j--;
          y++;
        }
      }
      d.y1 = d.y0 + seenRow;
      d.sprite = sprite.slice(0, (d.y1 - d.y0) * w32);
    }
  }

  // Use mask-based collision detection.
  function cloudCollide(tag, board, sw) {
    sw >>= 5;
    let sprite = tag.sprite,
    w = tag.width >> 5,
    lx = tag.x - (w << 4),
    sx = lx & 0x7f,
    msx = 32 - sx,
    h = tag.y1 - tag.y0,
    x = (tag.y + tag.y0) * sw + (lx >> 5),
    last;
    for (let j = 0; j < h; j++) {
      last = 0;
      for (let i = 0; i <= w; i++) {
        if (((last << msx) | (i < w ? (last = sprite[j * w + i]) >>> sx : 0))
        & board[x + i]) return true;
      }
      x += sw;
    }
    return false;
  }

  function cloudBounds(bounds, d) {
    let b0 = bounds[0],
    b1 = bounds[1];
    if (d.x + d.x0 < b0.x) b0.x = d.x + d.x0;
    if (d.y + d.y0 < b0.y) b0.y = d.y + d.y0;
    if (d.x + d.x1 > b1.x) b1.x = d.x + d.x1;
    if (d.y + d.y1 > b1.y) b1.y = d.y + d.y1;
  }

  function collideRects(a, b) {
    return a.x + a.x1 > b[0].x && a.x + a.x0 < b[1].x && a.y + a.y1 > b[0].y && a.y + a.y0 < b[1].y;
  }

  function archimedeanSpiral(dimensions) {
    let e = dimensions[0] / dimensions[1];
    return function(t) {
      return [e * (t *= .1) * Math.cos(t), t * Math.sin(t)];
    };
  }

  function rectangularSpiral(dimensions) {
    let dy = 4,
    dx = dy * dimensions[0] / dimensions[1],
    x = 0,
    y = 0;
    return function(t) {
      let sign = t < 0 ? -1 : 1;
      // See triangular numbers: T_n = n * (n + 1) / 2.
      switch ((Math.sqrt(1 + 4 * sign * t) - sign) & 3) {
        case 0:  x += dx; break;
        case 1:  y += dy; break;
        case 2:  x -= dx; break;
        default: y -= dy; break;
      }
      return [x, y];
    };
  }

  function zeroArray(length) {
    return new Array(length).fill(0);
  }

  let cloudRadians = Math.PI / 180,
  cw = 64,
  ch = 2048,
  canvas,
  ratio = 1;

  if (typeof document !== "undefined") {
    canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    ratio = Math.sqrt(canvas.getContext("2d").getImageData(0, 0, 1, 1).data.length >> 2);
    canvas.width = (cw << 5) / ratio;
    canvas.height = ch / ratio;
  } else {
    // Attempt to use node-canvas.
    canvas = new Canvas(cw << 5, ch);
  }

  let ctx = canvas.getContext("2d"),
  spirals = {
    archimedean: archimedeanSpiral,
    rectangular: rectangularSpiral
  };
  ctx.fillStyle = ctx.strokeStyle = "red";
  ctx.textAlign = "center";

  function functor(value) {
    if(typeof value === "function") return value;
    return () => value;
  }




  return cloud;
}
