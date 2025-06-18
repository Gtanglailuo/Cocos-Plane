import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {

    @property
    speed:number = 200;


    start() {

        

    }

    update(deltaTime: number) {

        let position = this.node.position;
        this.node.setPosition(position.x,position.y+this.speed*deltaTime);
        if(position.y>430)
        {
            this.node.destroy();
        }
        
    }
}


