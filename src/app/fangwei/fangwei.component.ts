import {
  Component,
  Inject,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'fangwei',
  templateUrl: './fangwei.component.html',
  styleUrls: ['./fangwei.component.scss']
})
export class FangweiComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('jupiterContainer') jupiterContainer: ElementRef;
  movement: any = {
    imgWrapper: {
      translation: { x: 1, y: 1, z: 0 },
      rotation: { x: -8, y: 8, z: 0 }
    },
    back: {
      translation: { x: 10, y: 10, z: [0, 10] },
      rotation: { x: 0, y: 0, z: 0 }
    },
    caption: {
      translation: { x: 20, y: 20, z: 0 },
      rotation: { x: 0, y: 0, z: 0 }
    }
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.jupiterContainer.nativeElement.addEventListener('mousemove', event => {
        requestAnimationFrame(() => {
          const imgWrapperDom = this.jupiterContainer.nativeElement;
          const captionDom = imgWrapperDom.querySelector('.jupiter-cover');
          const backDom = imgWrapperDom.querySelector('.back-block');

          this.layoutJupiter(event, imgWrapperDom, 'imgWrapper');
          this.layoutJupiter(event, captionDom, 'caption');
          this.layoutJupiter(event, backDom, 'back');
        });
      });
      this.jupiterContainer.nativeElement.addEventListener('mouseleave', event => {
        const imgWrapperDom = this.jupiterContainer.nativeElement;
        const captionDom = imgWrapperDom.querySelector('.jupiter-cover');
        const backDom = imgWrapperDom.querySelector('.back-block');

        this.leaveJupiter(event, imgWrapperDom, 'imgWrapper');
        this.leaveJupiter(event, captionDom, 'caption');
        this.leaveJupiter(event, backDom, 'back');
      });
      this.jupiterContainer.nativeElement.addEventListener('mouseenter', event => {
        const imgWrapperDom = this.jupiterContainer.nativeElement;
        const captionDom = imgWrapperDom.querySelector('.jupiter-cover');
        const backDom = imgWrapperDom.querySelector('.back-block');

        this.enterJupiter(event, imgWrapperDom, 'imgWrapper');
        this.enterJupiter(event, captionDom, 'caption');
        this.enterJupiter(event, backDom, 'back');
      });
    }
  }

  enterJupiter(event, element, name) {
    element.classList.remove('leaved');
  }

  leaveJupiter(event, element, name) {
    element.classList.add('leaved');
    const transforms = {
      translation: {
        x: 0,
        y: 0,
        z: 0
      },
      rotation: {
        x: 0,
        y: 0,
        z: 0
      }
    };
    this.applyTransfrom(transforms, element);
  }

  layoutJupiter(event, element, name) {
    const mousepos = {
      x: event.pageX,
      y: event.pageY
    };
    const bounds = element.getBoundingClientRect();
    const relmousepos = {
      x: mousepos.x - bounds.left,
      y: mousepos.y - bounds.top
    };
    const t = this.movement[name].translation;
    const r = this.movement[name].rotation;

    const setRange = function(obj) {
      for (const k in obj) {
        if (obj[k] === undefined) {
          obj[k] = [0, 0];
        } else if (typeof obj[k] === 'number') {
          obj[k] = [-1 * obj[k], obj[k]];
        }
      }
    };

    setRange(t);
    setRange(r);

    const transforms = {
      translation: {
        x: (t.x[1] - t.x[0]) / bounds.width * relmousepos.x + t.x[0],
        y: (t.y[1] - t.y[0]) / bounds.height * relmousepos.y + t.y[0],
        z: (t.z[1] - t.z[0]) / bounds.height * relmousepos.y + t.z[0]
      },
      rotation: {
        x: (r.x[1] - r.x[0]) / bounds.height * relmousepos.y + r.x[0],
        y: (r.y[1] - r.y[0]) / bounds.width * relmousepos.x + r.y[0],
        z: (r.z[1] - r.z[0]) / bounds.width * relmousepos.x + r.z[0]
      }
    };
    this.applyTransfrom(transforms, element);
  }

  applyTransfrom(transforms, element) {
    element.style.transform = `translateX(${transforms.translation.x}px)
       translateY(${transforms.translation.y}px)
       translateZ(${transforms.translation.z}px)
       rotateX(${transforms.rotation.x}deg)
       rotateY(${transforms.rotation.y}deg)
       rotateZ(${transforms.rotation.z}deg)`;
  }

  ngOnDestroy() {}
}
