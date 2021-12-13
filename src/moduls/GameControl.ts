import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";
//游戏控制器。控制其他的所有类
export default class GameControl{
 // 食物
 food:Food;
 //记分牌
 scorePanel:ScorePanel;
 //蛇
 snake:Snake;
 //创建一个属性来存储蛇的移动方向（按键的方向）
 direction:string="";

 isLive:boolean=true;
 constructor() {
     this.food = new Food();
     this.scorePanel = new ScorePanel();
     this.snake = new Snake();

     this.init()
 }
  //游戏初始化方法，调用游戏即开始
     init(){
     //绑定键盘按键下的事件
         document.addEventListener('keydown',this.keydownHandler.bind(this))
         this.run();
     }
    /*
    * 创建一个键盘按下的响应函数
    * ArrowUp
    * ArrowDown
    * ArrowLeft
    * ArrowRight
    * */
    keydownHandler(event:KeyboardEvent){
        this.direction = event.key;

    }
    //改变蛇的位置
    run(){
        let X = this.snake.X;
        let Y = this.snake.Y;

        switch (this.direction){
            case "ArrowUp":
            case "Up":
                Y-=10;
                break;
            case "ArrowDown":
            case "Down":
                Y+=10;
                break;
            case "ArrowLeft":
            case "Left":
                X-=10;
                break;
            case "ArrowRight":
            case "Right":
                X+=10;
                break;
        }
        this.checkEat(X,Y)
        try{
            this.snake.X = X;
            this.snake.Y = Y;
        }catch(e){

            alert(e+"GAME OVER")
            this.isLive = false;
        }
        this.isLive&&setTimeout(this.run.bind(this),300-(this.scorePanel.level-1)*30)
    }
    checkEat(X:number,Y:number){
       if(this.food.X===X&& this.food.Y===Y ){
           this.food.changePosition()
           this.scorePanel.addScore();
           this.snake.addBody();
       }
       //食物不能出现在蛇的身体上
        for(let i=1;i<this.snake.bodies.length-1;++i){
            let bd = this.snake.bodies[i] as HTMLElement
            if((this.food.X===bd.offsetLeft)&&(this.food.Y===bd.offsetTop)){

                this.food.changePosition()
            }
        }
    }
}