import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    private static instance : GameManager;

    public static getInstance():GameManager{
        return this.instance;
    }
    @property
    private bombNum:number = 0;

    @property
    private score:number = 0;

    @property(Node)
    pauseNode:Node = null;
    @property(Node)
    resumeNode:Node = null;




    protected onLoad(): void {
        GameManager.instance = this;
    }

    public AddBomb(){
        this.bombNum+=1;

        this.node.emit("onBombChange");
    }

    public AddScore(s:number)
    {
        this.score+=s;
        this.node.emit("onScoreChange");
    }

    public GetBombNumber(): number {
        return this.bombNum;
    }
    public GetScoreNumber(): number {
        return this.score;
    }

    onPauseButtonClick(){
        director.pause();
        this.pauseNode.active = false;
        this.resumeNode.active = true;
    }
    onResumeButtonClick(){
        director.resume();
        this.pauseNode.active = true;
        this.resumeNode.active = false;
    }

    GameOver()
    {

        this.onPauseButtonClick();

        let hScore = localStorage.getItem("H");
        let hScoreInt = 0;

        if(hScore!=null)
        {
            hScoreInt = parseInt(hScore,10);
        }

        if(this.score>hScoreInt)
        {
            localStorage.setItem("H",this.score.toString());
        }


        this.node.emit("SetScoreText",hScoreInt,this.score);


    }

    onRestartButtonClick(){
        this.onRestartButtonClick();
        director.loadScene(director.getScene().name);

    }

    onQuitButtonClick(){

        
    }


}


