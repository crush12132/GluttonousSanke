export default class Snake{
    //表示蛇头的元素
    head:HTMLElement;
    //表示蛇的身体（包括蛇头）
    bodies:HTMLCollection;
    //获取蛇的容器
    element:HTMLElement;

    constructor() {
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake > div') as HTMLElement;
        this.bodies = this.element.getElementsByTagName('div')

    }

    //获取蛇头x轴位置
    get X(){

        // return +this.head.style.left.split('px')[0] as number||0

        return this.head.offsetLeft
    }
    //获取蛇头Y轴位置
    get Y(){

        // return +this.head.style.top.split('px')[0] as number||0
        return this.head.offsetTop
    }
    //修改蛇头X轴位置
    set X(value:number){
        if(this.X===value){
            return
        }
        if(value<0||value>290){
           throw new Error('蛇出界了!!!')
        }

        //禁止蛇掉头
        //修改x时，是在修改水平坐标，蛇在左右移动，不能向右掉头，反之亦然
        if(this.bodies[1]&&(this.bodies[1] as HTMLElement).offsetLeft === value){
           //如果发生了掉头,让蛇向反方向继续移动
            if(value>this.X){
                //如果新值value大于旧值X，则说明蛇在向右走，此时发生掉头，应该让蛇继续向左走
                value = this.X - 10
            }else{
                value = this.X + 10
            }
        }

        this.moveBody()
        this.head.style.left = value+'px';
        //检查有没有撞自己
        this.checkHeadBody();

    }
    //修改蛇头Y轴位置
    set Y(value:number){
        if(this.Y === value){
            return
        }
        if(value<0||value>290){
            throw new Error('蛇出界了!!!')
        }

        //禁止蛇掉头
        //修改Y时，是在修改垂直坐标，蛇在上下移动，不能向下掉头，反之亦然
        if(this.bodies[1]&&(this.bodies[1] as HTMLElement).offsetTop === value){
            //如果发生了掉头,让蛇向反方向继续移动
            if(value>this.Y){
                //如果新值value大于旧值X，则说明蛇在向右走，此时发生掉头，应该让蛇继续向左走
                value = this.Y - 10
            }else{
                value = this.Y + 10
            }
        }
        this.moveBody()
        this.head.style.top = value+'px';
        //检查有没有撞自己
        this.checkHeadBody();
    }

    //增加蛇的长度
    addBody(){
        //向element中添加一个div
        this.element.insertAdjacentHTML("beforeend", "<div></div>");
    }

     //添加蛇身体移动的方法
    moveBody(){
        console.log(this.bodies.length)
        for(let i=this.bodies.length-1;i>0;--i){
            //获取前边身体的位置
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;

            //将值设置到当前身体上
            (this.bodies[i] as HTMLElement).style.left = X + "px";
            (this.bodies[i] as HTMLElement).style.top = Y + "px";

        }
    }

    checkHeadBody(){

        for(let i=1;i<this.bodies.length-1;++i){
            let bd = this.bodies[i] as HTMLElement
            if(bd.offsetLeft === this.X && bd.offsetTop === this.Y){
                throw new Error('蛇撞到自己啦！！')
            }
        }
    }
}