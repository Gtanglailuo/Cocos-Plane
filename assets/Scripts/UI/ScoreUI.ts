import { _decorator, Component, Label, Node } from 'cc';
import { GameManager } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('ScoreUI')
export class ScoreUI extends Component {
@property(Label)
    nums:Label = null;

    start() {
        GameManager.getInstance().node.on("onScoreChange",this.onScoreChange,this);
    }
    onScoreChange() {
        this.nums.string = GameManager.getInstance().GetScoreNumber().toString();
    }
}


