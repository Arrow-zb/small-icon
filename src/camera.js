import Canvas from "./canvas.js";

class Camera {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.video = '';
    this.canvasObject = new Canvas(width, height);
    this.canvas = this.canvasObject.canvas;
    this.initCamera();
  }

  async initCamera() {
    const video = document.createElement('video');
    video.width = this.width;
    video.height = this.height;
    video.autoplay="autoplay";
    document.body.appendChild(video);
    this.video = video;
    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
    this.video.srcObject = mediaStream;

    this.video.ontimeupdate = () => {
        // this.videoToImageByFilter();
        this.videoToCanvas();
    }
  }

  videoToCanvas(){
		const context = this.canvas.getContext('2d');
		// 每次更新都先清空canvas
		context.clearRect(0, 0, this.width, this.height);
		// 将video渲染到canvas上
		context.drawImage(this.video, 0, 0, this.width, this.height);
		this.canvasObject.canvasToIcon();
	}
}

export default Camera;