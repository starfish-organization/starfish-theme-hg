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
    /* var p2 = new Path2D(
     *   'M895.17 311.45h61.095v-112.892h-281.567c0-3.32 0.664-7.305 0.664-10.625v-135.471h-119.533v135.471c0 67.735-33.204 130.822-89.65 168.674l67.071 98.947c53.126-35.86 93.634-86.329 117.541-144.104h124.846v98.283c0 90.314-21.25 164.69-51.798 226.449-20.586-45.157-33.204-94.298-33.204-146.096h-119.533c0 87.658 26.563 174.651 77.032 257.66-53.79 61.095-112.228 100.275-145.432 122.189l-7.305 4.649 67.071 98.947 6.641-4.649c32.54-21.914 92.306-61.759 151.409-124.182 45.157 51.134 100.275 100.275 165.354 147.424l70.392-96.955c-53.79-39.18-111.564-88.322-160.042-146.096 55.782-85.665 98.283-197.23 98.283-340.005v-97.619z'
     * );*/

    this.context.globalAlpha = 0.5;
    // this.context.font = this.font;
    this.context.fillStyle = 'rgb(255,0,0)';
    /* this.context.fillText(this.text, x1, this.height / 2);*/
    this.context.fill(p1);
    // this.context.stroke(p2);

    this.context.globalCompositeOperation = this.compOp;

    this.context.fillStyle = 'rgb(0,255,0)';
    /*     this.context.fillText(this.text, x2, this.height / 2);*/
    this.context.fill(p1);
    // this.context.stroke(p2);
    this.context.fillStyle = 'rgb(0,0,255)';
    this.context.fill(p1);
    // this.context.stroke(p2);
    /*     this.context.fillText(this.text, x3, this.height / 2);*/

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
