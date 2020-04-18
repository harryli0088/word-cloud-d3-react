// Word cloud layout by Jason Davies, http://www.jasondavies.com/word-cloud/
// Algorithm due to Jonathan Feinberg, http://static.mrfeinberg.com/bv_ch03.pdf
// Harry - TBH the source code was garbage or I'm just dumb. I've done my best to clean things up and comment, but I've given up
export default function cloud() {
  const radiansPerDegree = Math.PI / 180;
  const cw = 2048;
  const ch = 2048;
  const spirals = {
    archimedean: archimedeanSpiral,
    rectangular: rectangularSpiral
  };

  let dimensions = [256, 256]; //the dimensions of the space we're working in
  let fontStyle = cloudFontNormal;
  let fontWeight = cloudFontNormal;
  let spiral = archimedeanSpiral;
  let words = [];
  let cloud = {};
  let canvas;

  if (typeof document !== "undefined") {
    canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    canvas.width = cw;
    canvas.height = ch;
  } else {
    canvas = new Canvas(cw, ch); // Attempt to use node-canvas.
  }

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = ctx.strokeStyle = "red";
  ctx.textAlign = "center";


  function text(d) {
    return d.text;
  }
  function font() {
    return "serif";
  }
  function fontSize(d) {
    return d.value;
  }
  function cloudFontNormal() {
    return "normal";
  }
  function rotate() {
    return (~~(Math.random() * 6) - 3) * 30; //random number between -90 and 60 degrees
  }
  function padding() {
    return 1;
  }


  cloud.compute = function() {
    //TODO 606 is height pixels...?
    const boardWidth = dimensions[0] >> 5
    const boardHeight = dimensions[1] //606

    ctx.clearRect(0,0,canvas.width,canvas.height) //clear the canvas on which we will make calculations
    let board = zeroArray(boardWidth *boardHeight);
    let bounds = null;
    let data = words.map(function(d, i) { //initialize some fields for each word
      d.text = text.call(this, d, i);
      d.font = font.call(this, d, i);
      d.style = fontStyle.call(this, d, i);
      d.weight = fontWeight.call(this, d, i);
      d.rotate = rotate.call(this, d, i);
      d.size = ~~fontSize.call(this, d, i); //floor the size
      d.padding = padding.call(this, d, i);
      return d;
    }).sort(function(a, b) { return b.size - a.size; }); //sort the words largest to smallest

    function step(data) {
      for(let i=0; i<data.length; ++i) { //run this code on every word
        let d = data[i]; //get the data at this index

        //randomly place this word within the dimensions between 25% to 75%
        d.x = (dimensions[0] * (Math.random() + .5)) >> 1;
        d.y = (dimensions[1] * (Math.random() + .5)) >> 1;

        cloudSprite(d, data, i);

        if (d.hasText && place(board, d, bounds)) { //if the word has text AND was properly placed
          if (bounds) { //if we have bounds (all words after the first word)
            cloudBounds(bounds, d); //adjust the bounds so that they contain this new word
          }
          else { //else this is the first word
            bounds = [ //set the bounds to contain this word
              {x: d.x + d.x0, y: d.y + d.y0}, //top left corner of the word
              {x: d.x + d.x1, y: d.y + d.y1} //bottom right corner of the word
            ];
          }

          //center the word in the space by translating by half of each dimension
          d.x -= dimensions[0] >> 1;
          d.y -= dimensions[1] >> 1;
        }
      }
    }

    step(data); //calculate the position and size of all the words



    return {
      words: data,
      whiteSpace: calculateWhiteSpace(board, boardWidth, boardHeight),
    }; //return all the data
  }


  //Harry - I added these white space calculations so that we can properly scale the word cloud on the React side
  function calculateWhiteSpace(board, boardWidth, boardHeight) {
    const whiteSpace = {
      top: -1, //start at -1 since the nested for loops increment this one extra time
      verticalFilled: 0,
      bottom: -1,
      left: -1,
      horizontalFilledSpace: 0,
      right: -1,
    }

    //calculate which rows are empty
    for(let i=0; i<boardHeight; ++i) { //loop through each row going forwards
      for(let j=0; j<boardWidth; ++j) { //loop through each column
        if(board[i*boardWidth + j] !== 0) { //if this cell is not empty
          //neither nested loop will run a second time (but will still finish this iteration)
          i=boardHeight
          j=boardWidth
        }
      }

      ++whiteSpace.top //this entire row was empty, increment our top count (runs an extra time)
    }

    //we don't need to check the middle rows

    for(let i=boardHeight-1; i>=0; --i) { //loop through each row going backwards
      for(let j=0; j<boardWidth; ++j) { //loop through each column
        if(board[i*boardWidth + j] !== 0) { //if this cell is not empty
          //neither nested loop will run a second time (but will still finish this iteration)
          i=-1
          j=boardWidth
        }
      }

      ++whiteSpace.bottom //this entire row was empty, increment our bottom count (runs an extra time)
    }

    whiteSpace.verticalFilled = dimensions[1] - whiteSpace.top - whiteSpace.bottom //calculate the pixel height of filled rows



    //calculate which columns are empty
    for(let j=0; j<boardWidth; ++j) { //loop through each column starting from the left then moving right
      for(let i=0; i<boardHeight; ++i) { //loop through each row
        if(board[i*boardWidth + j] !== 0) { //if this cell is not empty
          //neither nested loop will run a second time (but will still finish this iteration)
          j = boardWidth
          i = boardHeight
        }
      }

      ++whiteSpace.left //this column was empty, increment our left counter (runs an extra time)
    }

    //we don't need to check the middle columns

    for(let j=boardWidth-1; j>=0; --j) { //loop through each column starting from the right then moving left
      for(let i=0; i<boardHeight; ++i) { //loop through each row
        if(board[i*boardWidth + j] !== 0) { //if this cell is not empty
          //neither nested loop will run a second time (but will still finish this iteration)
          j = -1
          i = boardHeight
        }
      }

      ++whiteSpace.right //this column was empty, increment our right counter (runs an extra time)
    }

    whiteSpace.left *= dimensions[0] / boardWidth //convert back to pixels
    whiteSpace.right *= dimensions[0] / boardWidth //convert back to pixels
    whiteSpace.horizontalFilledSpace = dimensions[0] - whiteSpace.right - whiteSpace.left //calculate the pixel width of filled columns

    return whiteSpace
  }

  //returns true if the word was properly placed in the board without collision, else returns false that the word exceeded the dimensions
  function place(board, tag, bounds) { //the parameter tag is the word or data point
    const hypotenuse = Math.hypot(dimensions[0], dimensions[1]);
    const mySpiral = spiral(dimensions); //get the spiral function

    const startX = tag.x; //starting x position of the tag
    const startY = tag.y; //starting x position of the tag
    const dt = Math.random() < .5 ? 1 : -1; //randomly pick 1 or -1
    let t = -dt; //randomly set to opposite of dt (-1 or 1)
    let dxdy; //used to get the return value of the spiral function in the form [dx, dy]
    let dx; //used to get the x value of the spiral function
    let dy; //used to get the y value of the spiral function

    while (true) {
      dxdy = mySpiral(t += dt); //get the dx dy as we continue moving along the spiral
      dx = ~~dxdy[0]; //floor the dx value
      dy = ~~dxdy[1]; //floor the dy value

      if (Math.min(dx, dy) > hypotenuse) { //if either the dx or dy exceeds the hypotenuse
        break; //break out of the loop
      }

      //set a new position for the tag by translating the tag along the spiral
      tag.x = startX + dx;
      tag.y = startY + dy;

      if ( //if any part of the word is outside the dimensions
        tag.x + tag.x0 < 0 || //if the left side of the tag exceeds the left side of the dimensions
        tag.y + tag.y0 < 0 || //if the top of the tag exceeds the top of the dimensions
        tag.x + tag.x1 > dimensions[0] || //if the right side of the tag exceeds the right side of the dimensions
        tag.y + tag.y1 > dimensions[1] //if the bottom of the tag exceeds the bottom of the dimensions
      ) {
        continue; //continue to the next iteration of the loop, skipping the collision calculation below
      }
      // TODO only check for collisions within current bounds.
      if (!bounds || !cloudCollide(tag, board, dimensions[0])) {
        if (!bounds || collideRects(tag, bounds)) {
          let sprite = tag.sprite,
          w = tag.width >> 5,
          sw = dimensions[0] >> 5, //divide by 32 and floor
          lx = tag.x - (w << 4),
          sx = lx & 127,
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













  // Fetches a monochrome sprite bitmap for the specified text.
  // Load in batches for speed.
  function cloudSprite(d, data, dataIndex) {
    if (d.sprite) { //if this data point already has a sprite, return immediately
      return;
    }

    ctx.clearRect(0, 0, cw, ch); //clear the whole canvas

    let x = 0;
    let y = 0;
    let maxh = 0;
    let n = data.length;
    --dataIndex; //decrement the data index before the while loop
    while (++dataIndex < n) { //loop through the subsequent data points
      d = data[dataIndex]; //get the next word
      ctx.save(); //save the current canvas state
      ctx.font = d.style + " " + d.weight + " " + ~~(d.size + 1) + "px " + d.font; //set the font for this word
      let w = ctx.measureText(d.text + "m").width;
      let h = d.size << 1;

      if (d.rotate) { //if we should be rotating this word
        const sr = Math.sin(d.rotate * radiansPerDegree);
        const cr = Math.cos(d.rotate * radiansPerDegree);
        const wcr = w * cr;
        const wsr = w * sr;
        const hcr = h * cr;
        const hsr = h * sr;
        w = (Math.max(Math.abs(wcr + hsr), Math.abs(wcr - hsr)) + 31) >> 5 << 5;
        h = ~~Math.max(Math.abs(wsr + hcr), Math.abs(wsr - hcr));
      }
      else {
        w = (w + 31) >> 5 << 5; //round up to the next closest multiple of 32
      }

      if (h > maxh) { //if this height of the word is higher than the max we currently have
        maxh = h; //set new max height
      }

      if (x + w >= cw) { //if the right side of the word exceeds the right side of the canvas
        x = 0;
        y += maxh;
        maxh = 0;
      }

      if (y + h >= ch) { //if the bottom of the word exceeds the bottom of the canvas
        break;
      }

      ctx.translate(x + (w >> 1), y + (h >> 1)); //translate the canvas so that the origin is about the center of the word
      if (d.rotate) {
        ctx.rotate(d.rotate * radiansPerDegree);
      }
      ctx.fillText(d.text, 0, 0); //place the text on the canvas
      if (d.padding) { //if there is padding between the works
        ctx.lineWidth = 2 * d.padding, ctx.strokeText(d.text, 0, 0);
      }

      ctx.restore(); //restore the original canvas state

      d.width = w;
      d.height = h;
      d.xoff = x;
      d.yoff = y;
      d.x1 = w >> 1; //about the right width of the word
      d.y1 = h >> 1; //about the bottom height of the word
      d.x0 = -d.x1; //about the left width of the word
      d.y0 = -d.y1; //about the top height of the word
      d.hasText = true;
      x += w;
    }

    let pixels = ctx.getImageData(0, 0, cw, ch).data; //get the image data on the canvas
    let sprite = [];
    while (--dataIndex >= 0) { //move backwards through the daa points
      d = data[dataIndex]; //get this data point

      if (!d.hasText) { //if this data point does not have text
        continue; //skip it and move to the next loop iteration
      }

      let w = d.width;
      let w32 = w >> 5; //divide by 32 and floor
      let h = d.y1 - d.y0; //height of this word

      // Zero the sprite buffer
      for (let i = 0; i < h * w32; i++) { //zero to height times w32 of this data point
        sprite[i] = 0;
      }
      x = d.xoff;
      if (x == null) {
        return;
      }
      y = d.yoff;
      let seen = 0;
      let seenRow = -1;
      for (let j = 0; j < h; j++) { //loop through each pixel column in the word
        for (let i = 0; i < w; i++) { //loop throguh each pixel row in the word
          const k = w32 * j + (i >> 5),
          m = pixels[((y + j) * (cw) + (x + i)) << 2] ? 1 << (31 - (i % 32)) : 0;
          sprite[k] |= m; //sprite[k] = sprite[k] | m
          seen |= m; //seen = seen | m
        }
        if (seen) {
          seenRow = j;
        }
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

  //returns true/false whether this tag collides with other words on the board
  // Use mask-based collision detection.
  function cloudCollide(tag, board, sw) {
    sw >>= 5; //divide by 32 and floor
    let sprite = tag.sprite;
    let w = tag.width >> 5; //divide by 32 and floor
    let lx = tag.x - (w << 4); //subtract by w * 16
    let sx = lx & 127; //basically lx & 128
    let msx = 32 - sx;
    let h = tag.y1 - tag.y0; //get height of tag
    let x = (tag.y + tag.y0) * sw + (lx >> 5); //TODO I think this means which section in the board to inspect
    let last;

    for (let j = 0; j < h; j++) { //loop through each pixel column of the tag
      last = 0;
      for (let i = 0; i <= w; i++) { //loop through each pixel row of the tag
        if (
          (
            (last << msx) | //bitwise or
            (i < w ? (last = sprite[j * w + i]) >>> sx : 0)
          ) & //bitwise and
          board[x + i] //check this index in this section of the board
        ) {
          return true; //TODO I think this means there is a collision
        }
      }
      x += sw; //TODO I think this means to move on to the next section of the board
    }
    return false; //TODO I think this means no collision
  }

  //this function makes sure that the bounds contains the whole word
  function cloudBounds(bounds, d) {
    const b0 = bounds[0];
    const b1 = bounds[1];

    if (d.x + d.x0 < b0.x) { //if the left side of the word is less than the left side of the bounds
      b0.x = d.x + d.x0; //set the bounds to the left side of this word
    }
    if (d.y + d.y0 < b0.y) { //if the top of the word is less than the top of the bounds
      b0.y = d.y + d.y0; //set the bounds to the top of this word
    }
    if (d.x + d.x1 > b1.x) { //if the right side of the word is greater than the right side of the bounds
      b1.x = d.x + d.x1; //set the bounds to the right side of this word
    }
    if (d.y + d.y1 > b1.y) { //if the bottom of the word is greater than the bottom of the bounds
      b1.y = d.y + d.y1; //set the bounds to the bottom of this word
    }
  }

  function collideRects(a, b) {
    return a.x + a.x1 > b[0].x && a.x + a.x0 < b[1].x && a.y + a.y1 > b[0].y && a.y + a.y0 < b[1].y;
  }

  function archimedeanSpiral(dimensions) { //prepare the archimedean spiral function given the dimensions
    let e = dimensions[0] / dimensions[1]; //the ratio of the dimention width / height
    return function(t) {
      return [e * (t *= .1) * Math.cos(t), t * Math.sin(t)];
    };
  }

  function rectangularSpiral(dimensions) { //prepare a rectangular spiral function given the dimensions
    let dy = 4;
    let dx = dy * dimensions[0] / dimensions[1];
    let x = 0;
    let y = 0;
    return function(t) {
      const sign = t < 0 ? -1 : 1; //get the sign of the t without returning zero
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


  function functor(value) {
    if(typeof value === "function") return value;
    return () => value;
  }




  return cloud;
}
