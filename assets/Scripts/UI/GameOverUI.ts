import { _decorator, Component, Label, Node } from 'cc';
import { GameManager } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('GameOverUI')
export class GameOverUI extends Component {
    @property(Label)
    highestScoreText:Label = null;

    @property(Label)
    currentScoreText:Label = null;

    //注册监听事件
    protected onLoad(): void {
        GameManager.getInstance().node.on("SetScoreText",this.SetScoreText,this);
        this.node.active= false;
    }
    SetScoreText(hinghestNum:number,currentNum:number) {
        this.node.active= true;
        this.highestScoreText.string = hinghestNum.toString();
        this.currentScoreText.string = currentNum.toString();

    }
    

}


