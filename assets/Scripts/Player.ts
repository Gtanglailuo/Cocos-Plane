import { __private, _decorator, Animation, Collider2D, Component, Contact2DType, EventTouch, Input, input,instantiate,Node, Prefab, Vec3 } from 'cc';
import { Bullet } from './Bullet';

const { ccclass, property } = _decorator;

enum ShootType
{
    OneShoot,TwoShoot
,none};

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

    @property
    collider:Collider2D = null;

    @property
    lifeCount:number =1;
    @property(Animation)
    anim:Animation = null;
    @property
    anim_Hit:string = "";
    @property
    anim_Down:string = "";

    //无敌时间
    @property 
    invincibleTime:number = 1;

    //无敌
    isInvincible:boolean = false;
    //无敌时间计时器
    invincibleTimer:number = 0;


    
    protected onLoad():void{
        input.on(Input.EventType.TOUCH_MOVE,this.onTouchMove,this);

        this.collider = this.getComponent(Collider2D);
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

    }
    protected onDestroy():void{
        input.off(Input.EventType.TOUCH_MOVE,this.onTouchMove,this);

        if (this.collider) {
            this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onTouchMove(event:EventTouch) {
        if(this.lifeCount<1)
        {
            return;
        }

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

        if(this.isInvincible)
        {
            this.invincibleTimer+=dt;
            if(this.invincibleTimer>=this.invincibleTime)
            {
                this.invincibleTimer = 0;
                this.isInvincible = false;
            }
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
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
        
        if(this.isInvincible)
        {
            return;
        }
        this.isInvincible = true;
        this.lifeCount-=1;
        if(this.lifeCount>0)
        {
            this.anim.play(this.anim_Hit);
        }
        else
        {
            this.anim.play(this.anim_Down);
        }

        if(this.lifeCount<=0)
        {
            if(this.collider)
            {
                this.shootType = ShootType.none;
                this.collider.enabled=false;
            }

        }
    }


}


