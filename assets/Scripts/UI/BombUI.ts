import { _decorator, Component, Label, Node } from 'cc';
import { GameManager } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('BombUI')
export class BombUI extends Component {

    @property(Label)
    nums:Label = null;

    start() {
        GameManager.getInstance().node.on("onBombChange",this.onBombChange,this);
    }
    onBombChange() {
        this.nums.string = GameManager.getInstance().GetBombNumber().toString();
    }

    




}


