# iconjs
:trollface: favico for fun

## Live Demo

[Live Demo](https://iconjs.now.sh/)

## Install 

```html
<script src="https://cdn.jsdelivr.net/gh/shengxinjing/iconjs@0.1/icon.js" ></script >
```


## Watch Video

↑↓ cotrols volumn
←→ seek the video
 
```js
    var m = new Icon()
    m.initVideo('http://image.shengxinjing.cn/moyu/video/ji.mp4')
```



![](./img/01-video.gif)

## Camera

无聊的功能，我还加了个滤镜

```js
var m = new Icon()
m.initCam()
```

![](./img/02-cam.gif)

Filter

![](./img/02-cam-filter.gif)

Filter

![](./img/02-cam-filter2.gif)

## Snake

↑↓←→

```js
var s = new Snake()
s.init()
```

![](./img/03-snake.gif)