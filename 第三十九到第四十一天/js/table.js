let sourceData = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
    product: "手机",
    region: "华南",
    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
    product: "笔记本",
    region: "华东",
    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
    product: "笔记本",
    region: "华北",
    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
    product: "笔记本",
    region: "华南",
    sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
    product: "智能音箱",
    region: "华东",
    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
    product: "智能音箱",
    region: "华北",
    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
    product: "智能音箱",
    region: "华南",
    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}];
let select = document.getElementById("select"),
    selectRegion = document.getElementById("region-radio-wrapper"),
    selectProduct = document.getElementById("product-radio-wrapper"),
    table = document.getElementById("table-wrapper"),
    saveBt = document.getElementById("savaBt"),
    obj = {},
    obj2 = {},
    key1 = 0,
    key2 = 0;

function setCheck(value) {
    var regChild = selectRegion.children;
    var proChild = selectProduct.children;
    var regindex = 0;
    var proindex = 0;
    if (!value) {
        value = [];
        value[0]=value[1]={};
    }
    console.log(value[0])
    obj2 = value[0];
    obj = value[1];
    for (let i = 0; i < proChild.length; i++) {
        if (value[0][proChild[i].value] === proChild[i].value) {
            proChild[i].checked = "checked";
            key1 = 1;
            proindex += 1;
        } else {
            proChild[i].checked = false;
        }
    }
    for (let j = 0; j < regChild.length; j++) {
        if (value[1][regChild[j].value] === regChild[j].value) {
            regChild[j].checked = "checked";
            key2 = 1;
            regindex += 1;
        } else {
            regChild[j].checked = false;
        }
    }
    region.index = regindex;
    product.index = proindex;
}

select.addEventListener("change", function (event) {
    if (event.target.parentNode.id === "region-radio-wrapper") {
        if (hashBol) {
            sethash.initialize(event.target.value);
        }
        let arr = event.target.parentNode.children;
        [].forEach.call(arr, function (t) {
            if (t.checked === true) {
                obj[t.value] = t.value;
                key1 = 1;
            } else {
                obj[t.value] = "";
            }
        });
    }
    if (event.target.parentNode.id === "product-radio-wrapper") {
        let arr = event.target.parentNode.children;
        if (hashBol) {
            sethash.initialize(event.target.value);
        }
        [].forEach.call(arr, function (t) {
            if (t.checked === true) {
                obj2[t.value] = t.value;
                key2 = 1;
            } else {
                obj2[t.value] = "";
            }
        });
    }
    if (key1 && key2) {
        flow([obj2, obj]);
    }
});

function flow(value) {
    let list = mySave.getData(value);
    if (!list) {
        list = reChose(value);
    }
    let str = applyForm(list);
    let curArr = setMouse.dataArr(list);
    saveBt.style.display = "inline-block";
    saveBt.onclick = function () {
        mySave.saveInput(table);
    };
    linePragh.setData(curArr);
    table.innerHTML = str;
}

function reChose(obj) {
    let list = [],
        index = 0,
        len = obj.length,
        selectList = [],
        arr = ["product", "region"];
    for (let i = 0; i < len; i++) {
        if (i === 0) {
            sourceData.forEach(function (t) {
                t[arr[i]] === obj[i][t[arr[i]]] ? list.push(t) : index += 1;
            });
            sourceData.length === index ? list = sourceData.slice() : null;
        } else {
            list.forEach(function (t) {
                t[arr[i]] === obj[i][t[arr[i]]] ? selectList.push(t) : null;
            })
        }

    }
    return selectList.length === 0 ? list : selectList;
}

function clearInner() {
    linePragh.ctx.clearRect(0, 0, 800, 600);
    table.innerHTML = "";
    saveBt.style.display = "none";
}

function applyForm(list) {
    let arr = ["商品", "地区", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        obj = {"手机": 0, "笔记本": 0, "智能音箱": 0, "华东": 0, "华北": 0, "华南": 0},
        str = "",
        index = 0;
    str += "<table>" + "<tr>";
    arr.forEach(function (t) {
        str += "<th>" + t + "</th>";
    });
    str += "</tr>";
    list.forEach(function (t) {
        obj[t.product] += 1;
        obj[t.region] += 1;
    });

    list.forEach(function (t) {
        str += "<tr>";
        if (obj[t.product] !== 0 && obj[t.product] !== 1) {
            str += "<td rowspan=" + obj[t.product] + ">" + t.product + "</td>";
            obj[t.product] = 0;
            index = 1;
        } else if (obj[t.product] === 1) {
            str += "<td>" + t.product + "</td>";
        }

        if (obj[t.region] !== 0 && obj[t.region] !== 1 && index !== 1) {
            str += "<td rowspan=" + obj[t.region] + ">" + t.region + "</td>";
            obj[t.region] = 0;
        } else if (index === 1 || obj[t.region] === 1) {
            str += "<td>" + t.region + "</td>";
        }
        for (let i = 0; i < t.sale.length; i++) {
            // str += "<td><input type='text' name=" + arr[i + 2] + " value=" + t.sale[i] + "></td>";
            str += "<td>" + t.sale[i] + "</td>"
        }
        str += "</tr>";
    });
    str += "</table>";
    return str;
}

