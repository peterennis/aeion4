import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }

  // Define interval in milliseconds
  intervalMs = 10;

  doLogin() {
    console.log('HomePage.doLogin');
  }

  doStars() {
    // Ref: http://www.petercollingridge.co.uk/tutorials/svg/animation/starfield/

    const svgDocument = document.getElementById('starfield');
    const svgNS = 'http://www.w3.org/2000/svg';
    const xlinkNS = 'http://www.w3.org/1999/xlink';

    const angles = [];
    const distances = [];
    const nStars = 32;

    const centerX = +svgDocument.getAttributeNS(null, 'width') / 2;
    const centerY = +svgDocument.getAttributeNS(null, 'height') / 2;
    const maxD = Math.sqrt(centerX * centerX + centerY * centerY) + 40;

    createStars(nStars);
    runAnimation('start');

    function createStars(n) {
      for (let i = 1; i <= n; i++) {
        const star = document.createElementNS(svgNS, 'use');
        star.setAttributeNS(null, 'id', 'star' + i);
        star.setAttributeNS(xlinkNS, 'href', '#star');
        document.getElementById('star-group').appendChild(star);
        angles.push(Math.PI * 2 * Math.random());
        distances.push(maxD * Math.random());
      }
    }

    function drawField() {
      for (let i = 0; i < nStars; i++) {
        const star = document.getElementById('star' + (i + 1));
        const d = distances[i];
        const x = centerX + d * Math.sin(angles[i]);
        const y = centerY + d * Math.cos(angles[i]);
        const scale = 2 * (1 - (maxD / (d + maxD)));

        star.setAttributeNS(null, 'transform', 'translate(' + x + ',' + y + ') scale(' + scale * scale + ')');
      }
    }

    function updateImage() {
      for (let i = 0; i < nStars; i++) {
        distances[i]++;
        if (distances[i] > maxD) {
          distances[i] = 0;
        }
      }
      drawField();
    }

    function runAnimation(signal: string) {
      const timeout = setInterval(updateImage, 10);
    }
  }

  randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave HomePage');
    // TURN OFF this.doStars();
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter HomePage');
  }

  ngOnInit() {
    console.log('ngOnInit HomePage');
    this.doStars();

    /*
      Create an observable that emits 'Hello', 'World' etc. on subscription
      Ref: http://www.jiodev.com/angular/learn-rxjs/create
      Ref: https://brianflove.com/2018/03/04/rxjs-the-basics/
    */
    const hello: Observable<string> = new Observable(observer => {
      observer.next('Hello');
      observer.next('World');
      observer.next('A small step for man');
      observer.next('A giant leap for mankind');
    });

    // output: 'Hello', 'World', ...
    const subscribeHello$ = hello.subscribe(val => console.log(val));

    const rnd: Observable<number> = new Observable(observer => {
      const interval = setInterval(() => {
        observer.next(this.randomIntFromInterval(1, 100));
      }, 1000);

      // teardown
      return () => {
        clearInterval(interval);
      };
    });

    // output: 'Hello', 'World', ...
    const subscribeRnd$ = rnd.subscribe(val => console.log(val));
  }

}
