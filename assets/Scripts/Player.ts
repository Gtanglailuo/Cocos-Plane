import { __private, _decorator, Component, EventTouch, Input, input,instantiate,Node, Prefab, Vec3 } from 'cc';

const { ccclass, property } = _decorator;

enum ShootType
{
    OneShoot,TwoShoot
};

@ccclass('Player')
export class Player extends Component {

    @property
    shootRate:number = 0.5;
    @property(Node)
    bulletParent:Node = null;
    @property(Prefab)
    bullet1Prefab:Prefab = null;
    @property(Node)
    pos1:Node = null;
    
    shootTimer:number =0;
    @property
    shootType:ShootType = ShootType.OneShoot;


    @property(Prefab)
    bullet2Prefab:Prefab = null;
    @property(Node)
    pos2:Node = null;
    @property(Node)
    pos3:Node = null;

    
    protected onLoad():void{
        input.on(Input.EventType.TOUCH_MOVE,this.onTouchMove,this);
    }
    protected onDestroy():void{
        input.off(Input.EventType.TOUCH_MOVE,this.onTouchMove,this);
    }

    onTouchMove(event:EventTouch) {
        const p = this.node.position;
        let targetPos = new Vec3(p.x+event.getDeltaX(),p.y+event.getDeltaY(),p.z);

        if(targetPos.x<-230)
        {
        targetPos.x = -230;
    
        }
        if(targetPos.x>230)
        {
        targetPos.x = 230;
        }

        if(targetPos.y>380)
        {
        targetPos.y = 380;
        }
        if(targetPos.y<-380)
        {
        targetPos.y = -380;

        }
        this.node.setPosition(targetPos);


    }

    protected update(dt: number): void {

        switch(this.shootType){
            case ShootType.OneShoot:
                this.oneShootFunc(dt);
                break;
            case ShootType.TwoShoot:
                this.twoShootFunc(dt);
                break;

        }

        
    }
    oneShootFunc(dt:number)
    {
        this.shootTimer+=dt;
        if(this.shootTimer>=this.shootRate)
        {
            this.shootTimer = 0;
            const bullet = instantiate(this.bullet1Prefab);
            this.bulletParent.addChild(bullet);
            bullet.setWorldPosition(this.pos1.worldPosition);

        }
    }
    twoShootFunc(dt:number){
        this.shootTimer+=dt;
        if(this.shootTimer>=this.shootRate)
        {
            this.shootTimer = 0;
            const bullet = instantiate(this.bullet2Prefab);
            this.bulletParent.addChild(bullet);
            bullet.setWorldPosition(this.pos2.worldPosition);

            const bullet1 = instantiate(this.bullet2Prefab);
            this.bulletParent.addChild(bullet1);
            bullet1.setWorldPosition(this.pos3.worldPosition);

        }
    }



}


