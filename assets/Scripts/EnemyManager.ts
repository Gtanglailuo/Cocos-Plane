import { _decorator, Component, instantiate, math, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {

    @property
    enemy0SpawnRate:number = 1;
    @property(Prefab)
    enemy0Prefab:Prefab=null;


    @property
    enemy1SpawnRate:number = 1;
    @property(Prefab)
    enemy1Prefab:Prefab=null;


    
    @property
    enemy2SpawnRate:number = 1;
    @property(Prefab)
    enemy2Prefab:Prefab=null;


    //奖励物品生成
    @property
    rewardRate:number = 1;
    @property(Prefab)
    reward1Prefab:Prefab=null;
    @property(Prefab)
    reward2Prefab:Prefab=null;


    start() {
        this.schedule(this.enemy0Spwan,this.enemy0SpawnRate);
        this.schedule(this.enemy1Spwan,this.enemy1SpawnRate);
        this.schedule(this.enemy2Spwan,this.enemy2SpawnRate);
        this.schedule(this.rewardSpwan,this.rewardRate);
    }


    update(deltaTime: number) {
        
    }

    protected onDestroy(): void {
        this.unschedule(this.enemy0Spwan);
        this.unschedule(this.enemy1Spwan);
        this.unschedule(this.enemy2Spwan);
        this.unschedule(this.rewardSpwan);
    }

    enemy0Spwan()
    {
        this.enemySpawn(this.enemy0Prefab,-215,215,500);


    }
    enemy1Spwan()
    {
        this.enemySpawn(this.enemy1Prefab,-200,200,500);


    }
    enemy2Spwan()
    {
        this.enemySpawn(this.enemy2Prefab,-200,200,500);


    }

    rewardSpwan() {
        const randomNum = math.randomRangeInt(0,3);
        let p = null;
        if(randomNum == 1)
        {
            p = this.reward1Prefab;
        }
        else if(randomNum == 2)
        {
            p = this.reward2Prefab;
        }
        if(p)
        {
            this.enemySpawn(p,-207,207,474);
        }


    }

    enemySpawn(enemyPrefab:Prefab,minX:number,maxX:number,Y:number)
    {
        const enemy0 = instantiate(enemyPrefab);
        
        this.node.addChild(enemy0);

        const x = math.randomRangeInt(minX,maxX);

        enemy0.setPosition(x,Y,0);
    }



}


