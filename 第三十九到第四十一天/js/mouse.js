setMouse = (function (){
    let table = document.getElementById("table-wrapper"),
        input = document.getElementsByTagName("input"),
        img = document.getElementById("img"),
        textContext = null,
        oldData = null,
        curTag = null,
        curValue = null,
        oldValue = null;
    function dataDispose(data) {
        let newData = data,
            num = 1;
        if (Math.max.apply(null, data) <= 50) {
            num = 10;
        }
        if (Math.max.apply(null, data) > 500) {
            num = .5;
        }
        newData = data.map(function (t) {
            return t * num;
        });
        return newData;
    }
    function dataArr(data) {
        let arr = [],
            str = "",
            newArr = [];
        for (let i = 0; i < data.length; i++) {
            str += data[i].sale.join();
            i !== data.length - 1 ? str += "," : null;
        }
        arr = str.split(",");
        newArr = this.dataDispose(arr);
        oldData = newArr;
        arr = null;
        newArr = null;
        return oldData;
    }
    function moveFun(t) {
        if (t.target.tagName.toLowerCase() === "td") {
            if (textContext !== t.target.parentNode) {
                textContext = t.target.parentNode;
                let curList = t.target.parentNode.children,
                    arr = [];
                for (let i = 0; i < curList.length; i++) {
                    parseInt(curList[i].innerHTML )? arr.push(curList[i].innerHTML) : null;
                }
                let newData = dataDispose(arr);
                linePragh.setData(newData);
                bar.setData(newData);
                window.onmousemove = mouseout;
            }
        }
        if (Number(t.target.innerHTML)) {
            img.style.display = "inline-block";
            img.style.top = t.clientY - 10 + "px";
            img.style.left = t.clientX + 15 + "px";
        } else {
            img.style.display = "none";
        }
    }
    function clickFun(t) {
        if (t.target.tagName.toLowerCase() === "td" && Number(t.target.innerHTML)) {
            if (curTag !== null && t.target !== curTag) {
                curTag.innerHTML = curValue;
            }
            curTag = t.target;
            oldValue = curValue = t.target.innerHTML;
            table.onmousemove = null;
            t.target.innerHTML = "<input id='ip'><button id='b1'>确认</button><button id='b2'>取消</button>";
            t.target.firstChild.focus();
            btClick(t.target, oldValue);
            window.onclick = winClickFun;
        }
    }
    function btClick(curEle, value) {
        let b1 = document.getElementById("b1"),
            b2 = document.getElementById("b2"),
            ip = document.getElementById("ip");
        ip.onkeydown = function (t) {
            if (t.keyCode === 13) {
                b1Click();
            }
            if (t.keyCode === 27) {
                b2Click();
            }
        };
        function b1Click() {
            if (!(/^\d+$/).test(curEle.firstChild.value)) {
                alert("输入的数据不是数字");
                curEle.firstChild.focus();
            } else {
                setValue(curEle, curEle.firstChild.value);
            }
            window.onclick = null;
        }
        function b2Click() {
            setValue(curEle, value);
            window.onclick = null;
        }
        b1.onclick = b1Click;
        b2.onclick = b2Click;
    }
    function setValue(curEle, value) {
        curEle.innerHTML = value;
        setMouse.table.onmousemove = moveFun;
    }
    function mouseout(t) {
        if (t.target.tagName.toLowerCase() !== "td" && t.target.tagName.toLowerCase() !== "th") {
            linePragh.setData(oldData);
            img.style.display = "none";
            window.onmouseout = null;
        }
    }
    function winClickFun(t) {
        if (t.target.children.length !== 3 && t.target.tagName.toLowerCase() !== "input" && t.target.tagName.toLowerCase() !== "button") {
            setValue(curTag, oldValue);
            window.onclick = null;
        }
    }
    return {
        dataDispose: dataDispose,
        dataArr: dataArr,
        moveFun: moveFun,
        clickFun: clickFun,
        table: table
    }
})();

setMouse.table.onmousemove = setMouse.moveFun;
setMouse.table.onclick = setMouse.clickFun;



