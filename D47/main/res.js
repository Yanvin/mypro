//餐厅类
let setRestaurant = (function () {
    let res = null;

    function Restaurant({cash, seats, staff}) {
        this.cash = cash;
        this.seats = seats;
        this.staff = staff;
    }

    Restaurant.prototype = {
        constructor: Restaurant,
        hire: function (Staff) {
            this.staff.push(Staff.name);
        },
        fire: function (Staff) {
            this.staff.splice(this.staff.indexOf(Staff.name), 1);
        }
    };
    return {
        createRes: function ({cash, seats, staff}) {
            if (!res) {
                res = new Restaurant({cash, seats, staff});
            }
            return res;
        }
    }
})();
//继承类
function extend(fn, subClass, supClass) {
    let Fn = fn;
    Fn.prototype = supClass.prototype;
    subClass.prototype = new Fn;
    subClass.prototype.constructor = subClass;
    subClass.supClass = supClass.prototype;
}
//职员类
let setStaff = (function () {
    function Staff(name, money) {
        this.name = name;
        this.money = money;
        this.nextAction = null;
        this.finshCook = null;
        this.setNextAction = function (action) {
            this.nextAction = action;
        };
    }
    Staff.prototype.setNextAction = function() {};
    Staff.prototype.constructor = Staff;
    return {
        Staff: Staff
    }
})();
//服务员类
let setWaiter = (function () {
    let wai = null;
    function Waiter(name, price) {
        Waiter.supClass.constructor.call(this, name, price);
        this.dishList = [];
    }
    let fn =function() {
        this.setDishList = function (dish) {
            this.dishList = dish;
        };
        this.sendDish = function () {
            console.log("sengding");
            let list = this.dishList;
            this.dishList = [];
            return list;
        };
        this.work = function (dish) {
            if (this.nextAction !== null) {
                this.nextAction.work(dish);
            }
        }

    };
    extend(fn,Waiter, setStaff.Staff);
    return {
        Waiter: function (name, price) {
            if (!wai) {
                wai =  new Waiter(name, price);
            }
            return wai;
        }
    }
})();


//厨师类
let setCook = (function () {
    let cok = null;
    function Cook(name, money) {
        Cook.supClass.constructor.call(this, name, money);
        this.list = [];
    }
    let fn =function() {
        this.reciveDish = function (dish) {
            this.list = dish;
        };
        this.show = function () {
            let l = this.list;
            return l;
        }
        this.cookDish = function () {
            let dish = this.list.shift();
            this.finshCook = dish;
            return dish;
        };
        this.work = function () {
            if (this.nextAction !== null) {
                this.nextAction.work(this.finshCook);
            }
            this.finshCook = null;
        }
    };
    extend(fn, Cook, setStaff.Staff);
    return {
        createWaiter: function (name, money) {
            if (!cok) {
                cok = new Cook(name, money);
            }
            return cok;
        }
    }
})();

//顾客
let cus = (function () {
    function NewCus(name, dishs) {
        this.name = name;
        this.dishs = dishs;
        this.list = [];
    }
    NewCus.prototype = {
        dishRom: function () {
            return Math.round(Math.random() * (this.dishs.length - 2) + 1);
        },
        orderDish: function (command) {
            let arr = [];
            for (let i = 0; i < this.dishRom(); i++) {
                arr.push(this.dishs[this.dishRom()]);
            }
            this.list = arr.slice();
            command(arr);
        },
        work: function (dish) {
            console.log(dish)
        },
        eat: function (bol, t, i) {
            if (bol) {
                t(i);
            }
        }
    };

    return {
        NewCus: function (name, dishs) {
            return new NewCus(name, dishs);
        }
    }
})();

//command对象
let waiterCommand = function (receiver) {
    return function (dish) {
        receiver.setDishList(dish);
    }
};
let cookCommand = function (receiver) {
    return function (dishList) {
        receiver.reciveDish(dishList)
    }
};
//菜品类
let dishsList = (function () {
    let list = [];
    function AddDishs(dishName, cost, time) {
        this.dishName = dishName;
        this.cost = cost;
        this.time = time;
    }

    function dishList() {
        return list;
    }
    return {
        addDishs: function (dishName, cost, time) {
            list.push(new AddDishs(dishName, cost, time));
        },
        dishList: dishList
    }
})();

//客户队列
let queue = (function () {
    let q = null;
    function Que() {
        this.arr = [];
    }
    Que.prototype = {
        constructor: Que,
        addList: function (arr) {
            this.arr = arr.slice();
        },
        nowQue: function () {
            return this.arr.length !== 0 ? this.arr.shift() : false;
        }
    };
    return {
        setQue: function () {
            if (!q) {
                q = new Que;
            }
            return q;
        }
    }
})();





