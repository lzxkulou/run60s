/**
 * 游戏主场景
 * Created by mcz on 2017/10/30.
 */
class GameScene extends egret.DisplayObjectContainer{
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createScene, this);
    }

    private home:Home;
    private readyRoom:ReadyRoom;
    private raceCourse:RaceCourse;

    //创建初始化场景，默认为home
    private createScene(event:egret.Event):void
    {
        console.log(Config.USER_CREDIT);
        this.createHome();
    }

    //创建主页
    private createHome():void
    {
        this.home = new Home();
        this.addChild(this.home);
        this.home.basicCourt_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoBasicReadyRoom, this);

    }

    //前往押注页
    private gotoBasicReadyRoom(event:egret.TouchEvent):void
    {
        this.home.basicCourt_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoBasicReadyRoom, this);
        this.createBasicReadyRoom();
        this.removeChild(this.home);
    }

    //创建初级场投注界面
    private createBasicReadyRoom():void
    {
        this.readyRoom = new ReadyRoom();
        this.addChild(this.readyRoom);

        this.readyRoom.backHome.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoBackHome, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.isReadyStart, this);
        // this.isReadyStart();
    }

    //等待投注和开始比赛
    private isReadyStart(event:egret.Event):void
    {
        if(this.readyRoom.isStartGame)
        {
            this.createRaceCourse();
        }
    }

    //返回home页面
    private gotoBackHome(event:egret.TouchEvent):void
    {
        this.readyRoom.backHome.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoBackHome, this);
        this.createHome();
        this.readyRoom.timer.reset();
        this.removeChild(this.readyRoom);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.isReadyStart, this);
    }

    //进入比赛场地
    private createRaceCourse():void
    {
        this.raceCourse = new RaceCourse();
        this.addChild(this.raceCourse);
        this.removeChild(this.readyRoom);
        this.raceCourse.backReadyRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoBackBasicReadyRoom, this);
    }

    //返回押注页
    private gotoBackBasicReadyRoom(event:egret.TouchEvent):void
    {
        this.raceCourse.backReadyRoom.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoBackBasicReadyRoom, this);
        this.createBasicReadyRoom();
        this.removeChild(this.raceCourse);
    }
}