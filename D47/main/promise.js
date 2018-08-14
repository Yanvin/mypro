dishsList.addDishs("鱼", 40, 4);
dishsList.addDishs("水煮菜心", 25, 7);
dishsList.addDishs("小炒肉片", 40, 4);
dishsList.addDishs("水煮鱼", 42, 4);
dishsList.addDishs("麻婆豆腐", 30, 5);
dishsList.addDishs("宫保鸡丁", 45, 6);


//初始化人物
let waiter1 = setWaiter.Waiter("菜服务生", 3000);
let cook1 = setCook.createWaiter("李大厨", 5500);
//初始化餐厅
let rest = setRestaurant.createRes({
    cash: 0,
    seats: 1,
    staff: [waiter1, cook1]
});
//初始化队列
let restQueue = queue.setQue();
restQueue.addList([
    cus.NewCus("小王", dishsList.dishList()),
    cus.NewCus("小李", dishsList.dishList()),
    cus.NewCus("小楼", dishsList.dishList()),
    cus.NewCus("小巨", dishsList.dishList()),
    cus.NewCus("小吧", dishsList.dishList()),
    cus.NewCus("小摆", dishsList.dishList()),
    cus.NewCus("小撒", dishsList.dishList())
]);

let cu = restQueue.nowQue();
restTools.setName(cu.name);
restTools.showQueue(restQueue);
//设置点餐的命令
let com = waiterCommand(waiter1);
//顾客点餐
//cu.orderDish(com);
//设置传达炒菜菜单的命令
let cookCom = cookCommand(cook1);
//传递炒菜菜单
//cookCom(waiter1.sendDish());

//厨师炒菜
//let dish = cook1.cookDish();
//设置上菜责任链
cook1.setNextAction(waiter1);
waiter1.setNextAction(cu);
//上菜
//cook1.work(dish);
let tools = null;
let promise = function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, time)
    })
};
function one(cu) {
    restTools.cusTime();
    promise(3000).then(function () {
        cu.orderDish(com);
        tools = restTools.setTools(cu);
        tools.showList();
        return promise(500)
    }).then(function () {
        tools.waiterPic(930);
        cookCom(waiter1.sendDish());
        return promise(500);
    }).then(function () {
        let d = cook1.show();
        tools.cookList();
        tools.setAll();
        let t1 = 0;
        let t2 = 0.01;
        for (let i = 0; i < d.length; i++) {
            t1 += d[i].time * 1000;
            i !== 0 ? t2 += d[i - 1].time : null;
            promise(t2 * 1000).then(function () {
                tools.speed(i + "i");
            });
            promise(t1).then(function () {
                cook1.cookDish();
                tools.waiterPic(0);
                return promise(500);
            }).then(function () {
                cook1.work();
                tools.isOn(i);
                cu.eat(tools.bol(i), tools.speed, (i + "e"));
                tools.setDiv();
                d.length !== 0 ? tools.waiterPic(930) : promise(3000).then(function () {
                    tools.money();
                    getCu();
                });
            })
        }
    });
}
function getCu() {
    cu = restQueue.nowQue();
    if (cu) {
        one(cu);
        restTools.setName(cu.name);
        restTools.showQueue(restQueue);
    }
}
one(cu);
