import { _decorator, Component, Enum, Node } from 'cc';
const { ccclass, property } = _decorator;

export enum RewardType{
    None,One,Two

}


@ccclass('Reward')
export class Reward extends Component {

    @property
    speed:number = 200;

    @property({type:Enum(RewardType)})
    rewardType:RewardType = RewardType.None;

    start() {

    }

    update(deltaTime: number) {
        
        let position = this.node.position;
        this.node.setPosition(position.x,position.y-this.speed*deltaTime);
    }
}


