bar = {
    data: [],
    svg: document.getElementById("svg"),
    div: document.getElementById("show"),
    xWidth: 720,
    xHeight: 0,
    svgWidth: 800,
    svgHeight: 600,
    max: 0,
    str: "",
    color: "#37a2da",
    mons: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    line: function (x1, y1, x2, y2, color) {
        return "<line x1=" + x1 + " y1=" + y1 + " x2=" + x2 + " y2=" + y2 +
            " style='stroke:" + color + ";stroke-width:1'></line>";
    },
    printBarChart: function () {
        this.max = Math.max.apply(null, this.data) + 40;

        this.svg.style.width = this.svgWidth + "px";
        this.svg.style.height = this.svgHeight + "px";

        this.str += this.line(20, 20, 20, (this.max + 20), "#000") +
            this.line(20, (this.max + 20), (20 + this.xWidth), (this.max + 20), "#000");

        for (let i = 0; i < 10; i++) {
            this.str += this.line(20, (20 + i * this.max / 10), (20 +
                this.xWidth), (20 + i * this.max / 10), "#ccc");
        }

        for (let i = 0; i < 12; i++) {
            this.str += this.line((20 + this.xWidth / 12 * i), (this.max + 20), (20 +
                this.xWidth / 12 * i), (this.max + 24), "#000") +
                "<text x=" + (40 + this.xWidth / 12 * i) + " y=" + (this.max + 40) +
                ">" + this.mons[i] + "</text>";
        }

        for (let i = 0; i < this.data.length; i++) {
            this.str += "<rect x=" + (30 + this.xWidth / 12 * i ) + " y=" +
                (this.max - this.data[i] + 20) +
                " width='40' height=" + this.data[i] + " fill=" + this.color + "></rect>"
        }

        this.svg.innerHTML = this.str;
        this.div.setAttribute("xValue", this.xWidth + 20);
        this.div.setAttribute("yValue", this.max + 20);
        //this.svg.onmousemove = show;
    },
    setData: function (data) {
        this.str = "";
        this.data = data;
        this.printBarChart();
    }
};
