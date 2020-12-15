import Canvas from './canvas.js';

class Video {
	constructor(url, width, height) {
		this.url = url;
		this.width = width;
		this.height = height;
		this.video = "";
		this.initVideo();
		this.canvasObject = new Canvas(width, height);
		this.canvas = this.canvasObject.canvas;
	}

	// 初始化视频，设置视频的基本属性
	initVideo() {
		const video = document.createElement('video');
    video.src = this.url || 'https://v-cdn.zjol.com.cn/280443.mp4';
    video.autoplay = 'autoplay';
		video.controls = 'controls';
		// Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported
		video.crossOrigin = "anonymous"
		video.volume = 1;
		// video.muted = 'muted'; // 自动播放
    video.width = this.width ||  32;
    video.height = this.height || 32;
		document.body.appendChild(video);
		this.video = video;
		this.initKeybordEvents();
		this.showProgress();
		this.onVideoEvent();
	}

	initKeybordEvents() {
		const keyCodeToDirection = {
			38: () => {
				if(this.video.volume >= 1){
					return;
				}else {
					this.video.volume += 0.1
				}
			},
			40: () => {
				if(this.video.volume < 0.1){
					return;
				}else {
					this.video.volume -= 0.1
				}
			},
			37: () => this.video.currentTime -= 5,
			39: () => this.video.currentTime += 5
		}
		document.onkeydown = e => {
			if(keyCodeToDirection.hasOwnProperty(e.keyCode)){
				keyCodeToDirection[e.keyCode]()
			}
		}
	}

	onVideoEvent() {
		this.video.ontimeupdate = e => {
			this.showProgress();
			this.videoToCanvas();
		}
	}

	showProgress() {
		const current = this.video.currentTime;
		const total = this.video.duration || 0;
		const per = Math.floor((current / total) * 4) || 0;
		const p = ['🌑', '🌒', '🌓', '🌔', '🌝'][per];
		document.title = `${p} ${this.formatTime(current)} / ${this.formatTime(total)}`;
	}

	formatTime(second) {
		// 这里可更换为moment.js
		const m = Math.floor(second / 60) + '';
		const s = parseInt(second % 60) + '';
		return m.padStart(2,'0')+":"+s.padStart(2,'0');
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

export default Video;