class Canvas {
  constructor(width, height) {
    this.width = width;
    this.height =height;
    this.initCanvas();
  }

  initCanvas(){
		this.canvas = document.createElement('canvas')
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    document.body.appendChild(this.canvas);
  }
  
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
}

export default Canvas;