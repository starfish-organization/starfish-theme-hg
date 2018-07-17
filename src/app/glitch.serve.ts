export default class Glitcher {
  width = 160;
  height = 110;
  text: string;
  size: string;
  font: string;
  textWidth: number;
  globalAlpha = 0.9;

  fps = 25;
  channel = 0;
  compOp = 'lighter';
  phase = 0.0;
  phaseStep = 0.05;
  amplitude = 0.0;
  amplitudeBase = 2.0;
  amplitudeRange = 2.0;
  alphaMin = 0.8;

  glitchAmplitude = 5.0;
  glitchThreshold = 0.9;
  scanlineBase = 40;
  scanlineRange = 40;
  scanlineShift = 15;

  fillStyle1 = 'rgb(224,66,215)';
  fillStyle2 = 'rgb(48, 48, 121)';
  fillStyle3 = 'rgb(47, 245, 204)';

  canvas: any;
  context: any;
  timer: any;

  constructor(canvas: any, text: string, size: string, private silent: boolean) {
    this.text = text;
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.size = size;
    this.font = `${size}px icomoon`;

    this.context.font = this.font;
    this.textWidth = this.context.measureText(this.text).width;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // this.render();
  }

  stop() {
    if (!!this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  start() {
    this.tick();
    if (this.silent) {
      setTimeout(() => {
        this.stop();
      }, 1000);
    }
  }

  tick() {
    if (!!this.timer) {
      clearInterval(this.timer);
    }

    this.timer = setInterval(
      function() {
        this.phase += this.phaseStep;

        if (this.phase > 1) {
          this.phase = 0.0;
          this.channel = this.channel === 2 ? 0 : this.channel + 1;
          this.amplitude = this.amplitudeBase + this.amplitudeRange * Math.random();
        }

        this.render();
        this.grayify();
      }.bind(this),
      1000 / this.fps
    );
  }

  grayify() {
    const contextData = this.context.getImageData(0, 0, this.width, this.height);
    for (let i = 0; i < contextData.data.length; i += 4) {
      contextData.data[i] = Math.max(0, contextData.data[i] - 10);
      contextData.data[i + 1] = Math.max(0, contextData.data[i + 1] - 10);
      contextData.data[i + 2] = Math.max(0, contextData.data[i + 2] - 10);
    }
    this.context.putImageData(contextData, 0, 0);
  }

  render() {
    let x0 = (this.amplitude * Math.sin(Math.PI * 2 * this.phase)) >> 0;
    let x1;
    let x2;
    let x3;

    if (Math.random() >= this.glitchThreshold) {
      x0 *= this.glitchAmplitude;
    }

    x1 = (this.width - this.textWidth) >> 1;
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

  renderBlock() {}

  renderChannels(x1, x2, x3) {
    const height = this.height - 10;
    this.context.globalCompositeOperation = this.compOp;

    this.context.font = this.font;
    this.context.globalAlpha = this.globalAlpha;

    this.context.fillStyle = this.fillStyle1;
    this.context.fillText(this.text, x1, height);

    this.context.fillStyle = this.fillStyle2;
    this.context.fillText(this.text, x2, height);

    this.context.fillStyle = this.fillStyle3;
    this.context.fillText(this.text, x3, height);
  }

  renderScanline() {
    const y = (this.height * Math.random()) >> 0;
    const o = this.context.getImageData(0, y, this.width, 1);
    const d: any = o.data;

    let i = d.length;
    const s = (this.scanlineBase + this.scanlineRange * Math.random()) >> 0;
    const x = (-this.scanlineShift + this.scanlineShift * 2 * Math.random()) >> 0;

    while (i-- > 0) {
      d[i] += s;
    }
    this.context.putImageData(o, x, y);
  }
}
