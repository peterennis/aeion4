import { Component } from '@angular/core';

@Component({
  selector: 'app-page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( ) { }

  doLogin() {
    console.log('HomePage.doLogin');
  }

  doStars() {
    // Ref: http://www.petercollingridge.co.uk/tutorials/svg/animation/starfield/

    let svgDocument = document.getElementById('starfield');
    let svgNS = "http://www.w3.org/2000/svg";
    let xlinkNS = "http://www.w3.org/1999/xlink";

    let angles = [];
    let distances = [];
    let nStars = 32;

    let centerX = +svgDocument.getAttributeNS(null, 'width') / 2;
    let centerY = +svgDocument.getAttributeNS(null, 'height') / 2;
    let maxD = Math.sqrt(centerX * centerX + centerY * centerY) + 40;

    createStars(nStars);
    beginAnimation();

    function createStars(n) {
      for (let i = 1; i <= n; i++) {
        let star = document.createElementNS(svgNS, "use");
        star.setAttributeNS(null, "id", "star" + i);
        star.setAttributeNS(xlinkNS, "href", "#star");
        document.getElementById("star-group").appendChild(star);
        angles.push(Math.PI * 2 * Math.random());
        distances.push(maxD * Math.random());
      }
    }

    function drawField() {
      for (let i = 0; i < nStars; i++) {
        let star = document.getElementById('star' + (i + 1));
        let d = distances[i];
        let x = centerX + d * Math.sin(angles[i]);
        let y = centerY + d * Math.cos(angles[i]);
        let scale = 2 * (1 - (maxD / (d + maxD)));

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

    function beginAnimation() {
      let timeout = setInterval(updateImage, 10);
    }    
  }
  
}
