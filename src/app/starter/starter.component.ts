import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  templateUrl: './starter.component.html'
})
export class StarterComponent implements AfterViewInit {
  subtitle: string;

  title = 'ictdv';
  image;
  flag = 0;

  list = [
    {
      name: "assets/images/fire1.jpg",
      x: 270,
      y: 120,
      w: 50,
      h: 50,
    },
    {
      name: "assets/images/fire2.jpg",
      x: 260,
      y: 150,
      w: 50,
      h: 160,
    },
    {
      name: "assets/images/fire3.png",
      x: 190,
      y: 250,
      w: 150,
      h: 50,
    }
  ]

  faceInfo: any = {
    imgUrl: '해당 이미지 url',
    faceLoc: [{
      x: 0,
      y: 0,
      w: 30,
      h: 30,
      color: '#FF00FF',
      personNm: '화재현장'
    }]
  }

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.subtitle = 'This is some text within a card block.';
  }

  ngAfterViewInit() {
    // setInterval(() => {
    //   this.http.get('http://165.246.193.128:5000')
    //     .subscribe((res) => {
    //       console.log(res);
    //     })
    // }, 5000);

    setInterval(() => {
      this.toastr.success('서버로 부터 재난 신고를 받았습니다.', '요청');

      console.log(this.list[this.flag].name);
      this.setCanvas({
        imgUrl: this.list[this.flag].name,
        faceLoc: [{
          x: this.list[this.flag].x,
          y: this.list[this.flag].y,
          w: this.list[this.flag].w,
          h: this.list[this.flag].h,
          color: 'yellow',
          personNm: '화재현장'
        }]
      });

      this.flag++;
      if (this.flag > this.list.length - 1) {
        this.flag = 0;
      }


    }, 3000);

  }

  setCanvas(faceInfo: any) {
    var canvas: any = document.getElementById('canvas');
    if (canvas.getContext) {

      var ctx = canvas.getContext('2d');
      var imageObj = new Image();
      imageObj.onload = function () {
        canvas.width = 600;
        canvas.height = 430;
        ctx.drawImage(imageObj, 0, 0, 600, 430);

        // multi boxing 처리
        $.each(faceInfo.faceLoc, function (key, item) {
          ctx.strokeStyle = item.color;
          ctx.lineWidth = 3;
          ctx.strokeRect(item.x, item.y, item.w, item.h);

          // Text 처리 
          ctx.textBaseline = 'top';
          ctx.font = "13px Verdana";
          ctx.fillStyle = "white";
          ctx.fillText(item.personNm, item.x, item.y + item.h + 5);
          ctx.fill();
        });
      };
      imageObj.src = faceInfo.imgUrl;
      console.log("imageObj.src : ", imageObj.src);
    }
  }

  changeListener($event): void {
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {

      this.image = myReader.result; // base64 
      this.setCanvas(this.faceInfo);

    }
    myReader.readAsDataURL(file);
  }
}
