import Canvas from './canvas.js';

class GreedySnake {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.LINE_WIDTH = 1;
		this.SIZE = 6;
		this.WIDTH = 20;
		this.score = 0;
		this.max = localStorage.getItem('greedySnakeMax') || 0;
		this.DIRECTION = {
			37: 'left',
			38: 'up',
			39: 'right',
			40: 'down',
		};
		this.directions = {
			left: { x: -1, y: 0 },	// 左
			up: { x: 0, y: -1 },		// 上 
			right: { x: 1, y: 0 },	// 右
			down: { x: 0, y: 1 }		// 下
		},
		this.Canvas = new Canvas(this.width, this.height);
		this.canvas = this.Canvas.canvas;
	}

	initGrid() {
		this.grid = [];
		while(this.grid.length < this.WIDTH) {
			this.grid.push(new Array(this.WIDTH).fill(0));
		}
	}

	// 初始化小蛇蛇
	initSnake() {
		this.snake = [];
		// 初始值长度为3 位置在左侧中间
		let y = 4;
		let x = 0;
		let snakeLength = 3;
		while(snakeLength > 0) {
			this.snake.push({ x, y });
			this.grid[y][x] = '1';
			snakeLength--;
			x++;
		}
		// 小蛇的初始方向是最右边
		this.current = this.directions.right;
	}

	bindEvents() {
		document.onkeydown = e => {
			let key = e.keyCode;
			if(key in this.DIRECTION) {
				this.current = this.directions[this.DIRECTION[key]];
			}
		};
		this.timer = setInterval(() => {
			this.move();
		}, 1000)
	}

	setTitle() {
		document.title = `[${this.score}: score][max: ${this.max}]`;
	}

	// 小蛇移动
	move() {
		// 1. 根据方向，计算出下一个蛇头所在位置
		// 蛇头设为
		const head = this.snake[this.snake.length - 1];
		const tail = this.snake[0];
		const nextX = head.x + this.current.x;
		const nextY = head.y + this.current.y;

		// 2. 判断蛇头是不是出界 是不是碰着自己了 
		const isOut = nextX < 0 || nextX >= this.WIDTH || nextY < 0 || nextY >= this.WIDTH;
		if(isOut) {
			this.initGame();
			return;
		}

		const isSelf = (this.grid[nextY][nextX] === '1' && !(nextX === tail.x && nextY === tail.y));

		if(isSelf) {
			this.initGame();
			return;
		}

		const isFood = this.grid[nextY][nextX] === '2'
		if(!isFood) {
			// 所谓蛇往前走，就是把尾巴去掉，新增 nextX nextY
			// 去尾巴  有事务的时候不用去尾巴
			this.snake.shift();
			this.grid[tail.y][tail.x] = 0;
		}else {
			// 食物吃掉了，在放一个
			this.setFood();
			this.score++;
			this.setTitle();
		}

		// 新增头部
		this.snake.push({ x: nextX, y: nextY });
		this.grid[nextY][nextX] = '1';
		this.drawCanvas();
	}

	// 放吃的
	setFood() {
		while(true) {
			const x = Math.floor(Math.random() * this.WIDTH);
			const y = Math.floor(Math.random() * this.WIDTH);
			if(this.grid[y][x] === '1') {
				continue;
			}else {
				this.grid[y][x] = '2';
				break;
			}
		}
	}

	drawCanvas() {
		const context = this.canvas.getContext('2d')  //getContext() 方法可返回一个对象  
    context.clearRect(0, 0, this.width, this.height)
    context.strokeStyle = 'green'
    context.lineWidth = this.LINE_WIDTH
    context.fillStyle = "red"  // 设置或返回用于填充绘画的颜色、渐变或模式              
    context.strokeRect(0, 0, this.width, this.height)

    this.grid.forEach((row, y) => {
      row.forEach((g, x) => {
        if (g !== 0) {
          // 食物或者是蛇
          context.fillRect(this.LINE_WIDTH + x * this.SIZE, this.LINE_WIDTH + y * this.SIZE, this.SIZE, this.SIZE)  // x轴 y轴 宽 和 高 ,绘制“被填充”的矩形  
        }
      })
		});
		this.Canvas.canvasToIcon();
	}

	initGame() {
    if (this.score > this.max) {
      // 破纪录了
      localStorage.setItem('greedySnakeMax', this.score)
      this.max = this.score
      this.score = 0
    }
    this.setTitle()
    this.initGrid()
    this.initSnake()
    this.setFood()
    console.table(this.grid)
    this.drawCanvas()
  }
  init() {
    this.initGame()
    this.bindEvents()
  }
}

export default GreedySnake;