import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HpUI')
export class HpUI extends Component {

    @property(Label)
    hp:Label = null;

    //注册监听事件
    protected onLoad(): void {
        this.node.on("ChangeHPUI",this.ChangeHPUI,this);
    }
    ChangeHPUI(num:number)
    { console.log("收到血量更新:", num); 
        this.hp.string = num.toString();
    }

}


