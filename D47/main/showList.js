var restTools = (function () {
    var cusDiv = document.getElementById("cus-dishs");
    var timeColor = document.getElementById("timeColor");
    var waiterDiv = document.getElementById("waiter");
    var cList = document.getElementById("cList");
    var money = document.getElementById("money");
    var name = document.getElementById("name");
    function Tools(cus) {
        this.cus = cus;
    }
    function cusTime() {
        timeColor.style.width = "131px";
    }
    function showQueue(que) {
        let queList = document.getElementById("queList");
        let str = "<table>";
        str += "<tr><th>队列</th></tr>";
        que.arr.forEach(function (t, i) {
            str += "<tr><td>" + t.name + "</td></tr>"
        });
        str += "</table>";
        queList.innerHTML = str;
    }
    function setName(cus) {
        name.innerHTML = cus;
    }
    Tools.prototype = {
        construcotr: Tools,
        showList: function () {
            let str = "<table>";
            str += "<tr><th>菜名</th><th>是否上菜</th><th>吃</th></tr>";
            this.cus.list.forEach(function (t, i) {
                str += "<tr><td>" + t.dishName + "</td><td id=" + i + ">未上菜</td><td class='eat'><i id=" + (i + "e") + "></i></td></tr>"
            });
            str += "</table>";
            cusDiv.innerHTML = str;
        },
        cookList: function () {
            let str = "<table>";
            str += "<tr><th>菜名</th><th>进度</th></tr>";
            this.cus.list.forEach(function (t, i) {
                str += "<tr id=" + 10 * i + "><td>" + t.dishName + "</td><td class='dish'><i id=" + (i + "i") + "></i></td></tr>"
            });
            str += "</table>";
            cList.innerHTML = str;
        },
        isOn: function (i) {
            let td = document.getElementById(i);
            td.innerHTML = "已上菜";
        },
        bol: function (i) {
            let td = document.getElementById(i);
            if (td.innerHTML === "已上菜") {
                return true;
            } else {
                return false;
            }
        },
        setAll: function () {
            let sp = cList.getElementsByTagName("i");
            let time = 0;
            [].forEach.call(sp, (t, index) => {
                t.style.transition = "width " + (this.cus.list[index].time) + "s";
            });
        },
        money: function () {
            let mon = 0;
            this.cus.list.forEach(function (t) {
                mon += t.cost;
            })
            money.innerHTML = (mon + parseInt(money.innerHTML));
        },
        speed: function (i) {
            let sp = document.getElementById(i);
            sp.style.width = "70px";
        },
        waiterPic: function (num) {
            waiterDiv.style.transform = "translateX(" + num + "px)";
        },
        setDiv: function () {
            timeColor.style.width = "0";
        }
    };
    return {
        cusTime: cusTime,
        showQueue: showQueue,
        setName: setName,
        setTools: function (cu) {
            return new Tools(cu);
        }
    }
})();


// var utils = (function () {
//     var cusDiv = document.getElementById("cus-dishs");
//     var timeColor = document.getElementById("timeColor");
//     var waiterDiv = document.getElementById("waiter");
//     var cList = document.getElementById("cList");
//     function showList(dishs) {
//         let str = "<table>";
//         str += "<tr><th>菜名</th><th>是否上菜</th></tr>";
//         dishs.forEach(function (t, i) {
//             str += "<tr><td>" + t.dishName + "</td><td id=" + i + ">未上菜</td></tr>"
//         });
//         str += "</table>";
//         cusDiv.innerHTML = str;
//     }
//     function cookList(dishs) {
//         let str = "<table>";
//         str += "<tr><th>菜名</th><th>进度</th></tr>";
//         dishs.forEach(function (t, i) {
//             str += "<tr id=" + 10 * i + "><td>" + t.dishName + "</td><td class='dish'><i id=" + (i + "i") + "></i></td></tr>"
//         });
//         str += "</table>";
//         cList.innerHTML = str;
//     }
//
//     function isOn(i) {
//         let td = document.getElementById(i);
//         td.innerHTML = "已上菜";
//     }
//     function setAllt(iList) {
//         let list = iList.slice();
//         let sp = cList.getElementsByTagName("i");
//         [].forEach.call(sp, function (t, index) {
//             t.style.transition = "width " + list[index].time + "s";
//         })
//     }
//     function speed(i) {
//         let sp = document.getElementById(i);
//         sp.style.width = "70px";
//     }
//
//     function cusTime() {
//         timeColor.style.width = "131px";
//     }
//     function waiterPic(num) {
//         waiterDiv.style.transform = "translateX(" + num + "px)";
//     }
//     return {
//         showList: showList,
//         cusTime: cusTime,
//         waiterPic: waiterPic,
//         cookList: cookList,
//         setAllt: setAllt,
//         speed: speed,
//         isOn: isOn,
//     }
// })();

