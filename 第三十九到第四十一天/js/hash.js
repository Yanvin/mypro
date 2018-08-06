var sethash = (function () {
    function mySetHash(value) {
        var oldHref = location.href.split("#");
        var oldTitle = document.title;
        var newTitle = null;
        var localHref = location.href;
        var newLocalHref = null;
        if (oldTitle === "销售情况") {
            document.title = newTitle = "销售情况-" + value;
            newLocalHref = localHref + "#" + value;
        } else {
            document.title = newTitle = oldTitle + value;
            newLocalHref = localHref.split("#")[0] + "#" +localHref.split("#")[1] + "&" + value;
        }
            history.pushState({title: newTitle}, null, newLocalHref);
    }
    function deleHash(value) {
        var oldHref = location.href.split("#");
        var list = oldHref[1].split("&");
        list.splice(list.indexOf(value),1);
        history.pushState({title: list.join("")}, null,oldHref[0] + "#" + list.join("&"));
        document.title = list.join("");
    }
    function initialize(value) {
        var obj = {"region":"EastChina&SouthChina&NorthChina",
            "product":"phone&notebook&voice",
            "华东":"EastChina","华南":"SouthChina","华北":"NorthChina",
            "手机":"phone","笔记本":"notebook","智能音箱":"voice"};
        var reg = new RegExp(obj[value]);
        if (reg.test(location.href)) {
            deleHash(value)
        } else {
            mySetHash(obj[value]);
        }
    }
    function getHash() {
        var oldHref = location.href.split("#");
        if (!oldHref[1]) {
            return false;
        }
        var obj = {"EastChina":"华东","SouthChina":"华南","NorthChina":"华北",
            "phone":"手机","notebook":"笔记本","voice":"智能音箱"};
        var list = oldHref[1].split("&");
        var obj1 = {"手机":"","笔记本":"","智能音箱":""};
        var obj2 = {"华东":"","华南":"","华北":""};
        document.title = "销售情况-" + list.join("");
        list.forEach(function (t) {
            if (obj[t] in obj1) {
                obj1[obj[t]] = obj[t];
            } else {
                obj2[obj[t]] = obj[t];
            }
        });
        return [obj1, obj2];
    }
    return {
        initialize: initialize,
        getHash: getHash
    }
})();
window.onload = function () {
    if (sethash.getHash()) {
        flow(sethash.getHash());
        setCheck(sethash.getHash());
    }
};
window.onpopstate = function(e) {
    if (e.state === null) {
        document.title = "销售情况";
    } else {
        document.title = e.state["title"];
        flow(sethash.getHash());
    }
    setCheck(sethash.getHash());
    if (product.index === 0 || region.index === 0) {
        clearInner();
    }
};


