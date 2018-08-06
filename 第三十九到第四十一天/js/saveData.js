mySave = (function () {
    let flag = "getComputedStyle" in window;
    function listToArray(likeAry) {
        if (flag) {
            return Array.prototype.slice.call(likeAry, 0);
        }
        let ary = [];
        for (let i = 0; i < likeAry.length; i++) {
            ary[ary.length] = likeAry[i];
        }
        return ary;
    }
    function prev(curEle) {
        if (flag) {
            return curEle.previousElementSibling;
        }
        let pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    }
    function findInfo(curEle) {
        let par = curEle.parentNode;
        while (par && par.tagName.toLowerCase() !== "tr") {
            par = par.parentNode;
        }
        let product = par.children[0].innerHTML,
            region = par.children[0].innerHTML,
            proPar = par,
            regPar = par;
        while (product !== "手机" && product !== "笔记本" && product !== "智能音箱") {
            proPar = mySave.prev(proPar);
            product = proPar.children[0].innerHTML;
        }
        if (region !== "华东" && region !== "华南" && region !== "华北") {
            region = regPar.children[1].innerHTML;
            while (region !== "华东" && region !== "华南" && region !== "华北") {
                regPar = mySave.prev(regPar);
                region = regPar.children[1].innerHTML;
            }
        }
        return [product, region];
    }
    function saveInput(curEle) {
        let arr = this.listToArray(curEle.getElementsByTagName("td"));
        for (var i = 0; i < arr.length; i++) {
            if (!parseFloat(arr[i].innerHTML)) {
                arr.splice(i,1);
                i--;
            }
        }
        let months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
        let fp = null;
        let curArr = [];
            for (let i = 0; i < arr.length; i++) {
                if (i % 12 === 0) {
                    fp = this.findInfo(arr[i]);
                    curArr = [fp[0], fp[1], months[0]];
                } else {
                    curArr = [fp[0], fp[1], months[i % 12]]
                }
            localStorage.setItem(curArr, arr[i].innerHTML);
        }
        alert("保存成功!");
    }
    function getData(list) {
        let arr = [];
        let months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
        for (let key in list[0]) {
            if (key === "product" || key === "region") {
                continue;
            }
            for (let reg in list[1]) {
                if (reg === "product" || reg === "region") {
                    continue;
                }
                if (list[0][key] && list[1][reg]) {
                    if (!localStorage.getItem([list[0][key], list[1][reg], months[0]])) {
                        return false;
                    }
                    let sale = [],
                        obj = {};
                    for (let i = 0; i < months.length; i++) {
                        sale.push(parseFloat(localStorage.getItem([list[0][key], list[1][reg], months[i]])));
                    }
                    obj["product"] = list[0][key];
                    obj["region"] = list[1][reg];
                    obj["sale"] = sale;
                    arr.push(obj);
                }
            }
        }
        return arr;
    }
    return {
        listToArray: listToArray,
        prev: prev,
        findInfo: findInfo,
        saveInput: saveInput,
        getData: getData,
    };
})();
