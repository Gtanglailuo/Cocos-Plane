import { _decorator, Animation, Collider2D, Component, Contact2DType, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {
    @property
    speed:number = 200;
    @property(Animation)
    anim:Animation = null;
    @property
    hp:number = 1;

    @property
    collider:Collider2D = null;


    @property
    anim_Hit:string = "";
    @property
    anim_Down:string = "";

    private isContacting: boolean = false;

    start() {
        
        this.collider = this.getComponent(Collider2D);
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }


    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {


        this.hp-=1;
        if(this.hp>0)
        {
            this.anim.play(this.anim_Hit);
        }
        else
        {
            this.anim.play(this.anim_Down);
        }

        this.scheduleOnce(() => {
            if (otherCollider.node && otherCollider.node.isValid) {
                otherCollider.node.destroy();
            }
        }, 0);
    

        if(this.hp<=0)
        {
            if(this.collider)
            {
                this.collider.enabled=false;
            }
            this.scheduleOnce(function(){
                this.node.destroy();
            },1);
        }
    }

    update(deltaTime: number) {

        if(this.hp>0)
        {
            let position = this.node.position;
            this.node.setPosition(position.x,position.y-this.speed*deltaTime);
        }
        if(this.node.position.y<-580)
        {
            this.node.destroy();
        }


    }

    protected onDestroy(): void {
        if (this.collider) {
            this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }



}


