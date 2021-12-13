export default class Food{
    //定义一个属性表示食物所对应的元素
    element:HTMLElement;
    constructor() {
        //获取页面中的food元素并将其赋值给element
        this.element = document.getElementById('food')!
        this.changePosition();
    }
    //获取食物的x轴位置
    get X(){
        return this.element.offsetLeft
    }
    //获取食物的y轴位置
    get Y(){
        return this.element.offsetTop
    }

    //修改食物随机的位置
    changePosition(){
        /*
        * 生成一个随机的位置
        * 食物的位置最小是0 最大是290
        * 蛇移动一次就是一格，一格大小是10，所有要求食物的位置是蛇大小的整数倍
        * */
        let left = Math.round(Math.random()*29)*10
        let top = Math.round(Math.random()*29)*10
        this.element.style.left = left +'px'
        this.element.style.top = top + 'px'


    }

}

