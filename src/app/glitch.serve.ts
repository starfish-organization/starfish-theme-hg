export default class Glitcher {
  width: number;
  height: number;
  // font: string;
  context: any;
  text: string;
  textWidth: number;

  fps: number = 60;
  channel: number = 0;
  compOp: string = 'lighter';
  phase: number = 0.0;
  phaseStep: number = 0.05;
  amplitude: number = 0.0;
  amplitudeBase: number = 2.0;
  amplitudeRange: number = 2.0;
  alphaMin: number = 0.8;

  glitchAmplitude: number = 5.0;
  glitchThreshold: number = 0.9;
  scanlineBase: number = 40;
  scanlineRange: number = 40;
  scanlineShift: number = 15;

  redImageData: any;
  blueImageData: any;
  greenImageData: any;
  canvas: any;

  constructor() {}

  init(canvas: any) {
    setTimeout(
      function() {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');

        var img = new Image(); // Create new img element

        img.onload = () => {
          this.img = img;

          this.context.drawImage(img, 0, 0, img.width, img.height);
          var imgData = this.context.getImageData(0, 0, img.width, img.height);
          this.imgData = imgData;
          var imgData = this.context.getImageData(0, 0, img.width, img.height);
          for (let i = 0, max = imgData.data.length; i < max; i += 4) {
            imgData.data[i] = 224;
            imgData.data[i + 1] = 66;
            imgData.data[i + 2] = 215;
          }
          this.redImageData = imgData;
          var imgData = this.context.getImageData(0, 0, img.width, img.height);
          for (let i = 0, max = imgData.data.length; i < max; i += 4) {
            imgData.data[i] = 48;
            imgData.data[i + 1] = 48;
            imgData.data[i + 2] = 121;
          }
          this.blueImageData = imgData;
          var imgData = this.context.getImageData(0, 0, img.width, img.height);
          for (let i = 0, max = imgData.data.length; i < max; i += 4) {
            imgData.data[i] = 47;
            imgData.data[i + 1] = 245;
            imgData.data[i + 2] = 204;
          }
          this.greenImageData = imgData;

          this.context.clearRect(0, 0, this.width, this.height);

          this.initOptions();
          this.resize();
          this.tick();
        };
        img.src = '/assets/fang.svg';
      }.bind(this),
      100
    );
  }

  initOptions() {
    this.width = document.documentElement.offsetWidth;
    this.height = window.innerHeight;
  }

  tick() {
    setTimeout(
      function() {
        this.phase += this.phaseStep;

        if (this.phase > 1) {
          this.phase = 0.0;
          this.channel = this.channel === 2 ? 0 : this.channel + 1;
          this.amplitude = this.amplitudeBase + this.amplitudeRange * Math.random();
        }

        this.render();
        this.tick();
      }.bind(this),
      1000 / this.fps
    );
  }

  render() {
    var x0 = (this.amplitude * Math.sin(Math.PI * 2 * this.phase)) >> 0,
      x1,
      x2,
      x3;

    if (Math.random() >= this.glitchThreshold) {
      x0 *= this.glitchAmplitude;
    }

    x1 = (this.width - 200) >> 1;
    x2 = x1 + x0;
    x3 = x1 - x0;

    this.context.clearRect(0, 0, this.width, this.height);
    this.context.globalAlpha = this.alphaMin + (1 - this.alphaMin) * Math.random();

    switch (this.channel) {
      case 0:
        this.renderChannels(x1, x2, x3);
        break;
      case 1:
        this.renderChannels(x2, x3, x1);
        break;
      case 2:
        this.renderChannels(x3, x1, x2);
        break;
    }

    this.renderScanline();
  }

  renderChannels(x1, x2, x3) {
    var p1 = new Path2D('M221.8 63.087h221.8v112.892h-221.8v-112.892z');

    this.context.globalAlpha = 0.5;
    // this.context.font = this.font;
    this.context.fillStyle = 'rgb(255,0,0)';
    /* this.context.fillText(this.text, x1, this.height / 2);*/
    this.context.stroke();

    this.context.globalCompositeOperation = this.compOp;

    this.context.fillStyle = 'rgb(0,255,0)';
    this.context.fillText(this.text, x2, this.height / 2);
    this.context.fillStyle = 'rgb(0,0,255)';
    this.context.fillText(this.text, x3, this.height / 2);

    /* this.context.putImageData(this.redImageData, x1, 0);
     * this.context.putImageData(this.blueImageData, x2, 0);
     * this.context.putImageData(this.greenImageData, x3, 0);*/
  }

  renderScanline() {
    var y = (this.height * Math.random()) >> 0,
      o = this.context.getImageData(0, y, this.width, 1),
      d = o.data,
      i = d.length,
      s = (this.scanlineBase + this.scanlineRange * Math.random()) >> 0,
      x = (-this.scanlineShift + this.scanlineShift * 2 * Math.random()) >> 0;

    while (i-- > 0) {
      d[i] += s;
    }

    this.context.putImageData(o, x, y);
  }
  resize() {
    if (this.canvas) {
      this.canvas.width = document.documentElement.offsetWidth;
      this.canvas.height = window.innerHeight;
    }
  }
}
