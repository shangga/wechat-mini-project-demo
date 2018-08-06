Page({
  onReady: function() {
    this.drawBall()
  },

  drawBall: function() {
    var lastFrameTime = 0;
    // 模拟 requestAnimationFrame
    var doAnimationFrame = function(callback) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastFrameTime));
      var id = setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastFrameTime = currTime + timeToCall;
      return id;
    };
    // 模拟 cancelAnimationFrame
    var abortAnimationFrame = function(id) {
      clearTimeoutÏ(id)
    }
    var dashLen = 220,
      dashOffset = dashLen,
      speed = 5,
      txt = "canvas",
      x = 30,
      i = 0;
    var context = wx.createCanvasContext('canvas')
    context.font = "60px Comic Sans MS, cursive, TSCu_Comic, sans-serif";
    context.lineWidth = 5;
    context.globalAlpha = 2 / 3;
    (function loop() {
      var setx = dashLen - dashOffset;
      var sety = dashOffset - speed;
      context.setFillStyle('red');
      context.setStrokeStyle('black');
      context.setLineDash([setx, sety]); // create a long dash mask
      context.strokeText(txt[i], x, 90); // stroke letter
      context.fillText(txt[i], x, 90);
      context.stroke();
      context.fill();
      dashOffset -= speed; // reduce dash length
      if (dashOffset > 0) {
        requestAnimationFrame(loop);
        context.save();
      } else {
        dashOffset = dashLen; // prep next char
        x += context.measureText(txt[i++]).width + 5 * Math.random();
        context.setTransform(1, 0, 0, 1, 0, 3 * Math.random()); // random y-delta
        context.rotate(Math.random() * 0.005); // random rotation

        if (i < txt.length) requestAnimationFrame(loop);
      }
      context.draw(true);
    })();
  },
  onUnload: function() {
    clearInterval(this.interval)
  }
})