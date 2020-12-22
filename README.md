# 1. small-icon
借鉴大圣老师的思想，自己重写了一遍！

## 2.icon 播放视频
一步一步的实现，这样不会觉得很突然。
### 2.1 在网页上播放视频

```js
// video.js
class Video {
	constructor(url, width, height) {
		this.url = url;
		this.width = width;
		this.height = height;
		this.video = this.initVideo();
	}

	initVideo() {
		const video = document.createElement('video');
    video.src = this.url || 'https://v-cdn.zjol.com.cn/280443.mp4';
    video.autoplay = 'autoplay';
    video.controls = 'controls';
    video.width = this.width ||  32;
    video.height = this.height || 32;
    document.body.append(video);
    return video;
	}
}

export default Video;
```

```html
<script type="module">
  import Video from "../video.js";
  new Video('https://v-cdn.zjol.com.cn/276984.mp4', 100, 100);
</script>
```
### 2.2 实现快进快退、音量增减和显示当前进度
1. 实现快进快退和音量增减
也就是键盘事件，上下左右。
document.onkeydown 事件通过keycode来处理不同的事件
```js
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
```
2. 显示当前进度
```js
	showProgress() {
		let progress = this.video.currentTime / this.video.duration;
		const progressTxt = document.createElement('p');
		// progressTxt.innerHTML = isNaN(progress) ? 0 : progress;
		progressTxt.innerHTML = this.formatTime(this.video.currentTime) + '/' +  this.formatTime(this.video.duration);
		document.body.appendChild(progressTxt);
	}

	formatTime(second) {
		// 这里可更换为moment.js
		const m = Math.floor(second / 60) + ''
		const s = parseInt(second % 60) + ''
		return m.padStart(2,'0')+":"+s.padStart(2,'0')
	}

	onVideoEvent() {
		this.video.ontimeupdate = e => {
			this.showProgress();
		}
	}
```
### 2.3 一切准备就绪，将视频放到canvas中
```js
  videoToCanvas(){
    const context = this.canvas.getContext('2d');
    // 每次更新都先清空canvas
    context.clearRect(0, 0, this.width, this.height);
    // 将video渲染到canvas上
    context.drawImage(this.video, 0, 0, this.width, this.height);
  }
```
### 2.4 将canvas放到ico中
这里关键是canvas可以转化为icon可用的URL
```js
canvasToIcon() {
    const url = this.canvas.toDataURL('image/png');
    const link = Array.from(document.head.querySelectorAll('link'))
      .filter(l =>
        l.getAttribute('rel').indexOf('icon') > -1 
      );
    if(link.length) {
      link.forEach(l => {
        l.setAttribute('href', url);
      });
    }else {
      const l = document.createElement('link');
      l.setAttribute('href', url);
      l.setAttribute('rel', 'shortcut icon');
      l.setAttribute('type', 'image/x-icon');
      document.head.appendChild(l);
    }
  }
```
## 3. 摄像头
实现摄像头功能的思路是：将摄像头录制成视频流然后实时渲染到canvas然后实时渲染到ico
### 3.1 摄像头录制成视频
一个知识点，webrtc


## 贪食蛇
