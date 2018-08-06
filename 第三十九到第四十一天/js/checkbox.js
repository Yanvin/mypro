var region = document.getElementById("region-radio-wrapper"),
    product = document.getElementById("product-radio-wrapper"),
    hashBol = true;
function bebornCheckBox(checkBox, arr) {
    let curArr = [];
    curArr.push("<input type='checkbox' checkbox-type='all' value=" + checkBox.id.split("-")[0] + ">全选");
    arr.forEach(function (t) {
        curArr.push("<input type='checkbox' checkobx-type='son' value=" + t.text + ">" + t.text);
    });
    let bol = null;
    checkBox.innerHTML = curArr.join("");
    checkBox.index = 0;
    checkBox.onclick = function (t) {
        if (t.target.tagName.toLowerCase() === "input") {
            t.target.checked === true ? this.index += 1 : this.index -= 1;
            if (t.target.attributes[1].value === "all") {
                t.target.checked === true ? (bol = true, this.index = 4) : (bol = false, this.index = 0);
                let htmlCol = t.target.parentNode.children;
                [].forEach.call(htmlCol, function (t, i) {
                    i !== 0 ? t.checked = bol : null;
                });
            } else {
                hashBol = true;
                if (t.target.checked === false && this.index === 0) {
                    t.target.checked = true;
                    hashBol = false;
                    this.index += 1;
                }
                if (t.target.checked === false && this.index === 3) {
                    t.target.parentNode.firstChild.checked = false;
                    this.index -= 1;
                }
                if (t.target.parentNode.firstChild.checked === false && this.index === 3) {
                    t.target.parentNode.firstChild.checked = true;
                    this.index += 1;
                }
            }
        }
    }
}

bebornCheckBox(region, [{
    value: 1,
    text: "华东"
}, {
    value: 2,
    text: "华南"
}, {
    value: 3,
    text: "华北"
}]);
bebornCheckBox(product, [{
    value: 1,
    text: "手机"
}, {
    value: 2,
    text: "笔记本"
}, {
    value: 3,
    text: "智能音箱"
}]);
