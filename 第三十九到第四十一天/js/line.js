linePragh = {
    picData: [],
    canvasHeight: 600,
    canvasWidth: 800,
    xHeight: 0,
    yWidth: 660,
    dataPointDia: 5,
    dataColor: ["#37a2da","#FFC1C1","#FF3030","#ADFF2F","#A020F0","#9FB6CD","#8B6508","#515151","#0000FF"],
    lineColor: ["#37a2da","#FFC1C1","#FF3030","#ADFF2F","#A020F0","#9FB6CD","#8B6508","#515151","#0000FF"],
    subLineColor: "#ccc",
    pointWidth: 60,
    canvas: document.getElementById("canvas"),
    ctx: canvas.getContext("2d"),

    printForm: function () {
        this.xHeight = Math.max.apply(null, this.picData) + 40;

        this.canvas.height = this.canvasHeight;
        this.canvas.width = this.canvasWidth;

        this.ctx.beginPath();
        this.ctx.moveTo(20, 20);
        this.ctx.lineTo(20, this.xHeight + 20);
        this.ctx.lineTo(20 + this.yWidth, this.xHeight + 20);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.strokeStyle = this.subLineColor;
        for (let i = 0; i < 10; i++) {
            this.ctx.moveTo(20, 20 + i * this.xHeight / 10);
            this.ctx.lineTo(20 + this.yWidth,20 + i * this.xHeight / 10)
        }
        this.ctx.stroke();

        for (let i = 0; i < this.picData.length; i++) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = this.ctx.fillStyle = this.dataColor[Math.floor(i / 12)];
            this.ctx.arc(20 + this.pointWidth * Math.floor(i % 12), (this.xHeight + 20 - this.picData[i]), this.dataPointDia / 2, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
        }

        for (let i = 0; i < this.picData.length; i++) {
            if (Math.floor(i % 12) === 0) {
                this.ctx.beginPath();
                this.ctx.strokeStyle = this.lineColor[Math.floor(i / 12)];
                this.ctx.moveTo(20, (this.xHeight + 20 - this.picData[i]));
            } else {
                this.ctx.lineTo(20 + this.pointWidth * Math.floor(i % 12), (this.xHeight + 20 - this.picData[i]));
            }
            if (Math.floor(i % 12) === 11) {
                this.ctx.stroke();
            }
        }
    },

    setData: function (data) {
        this.picData = data;
        this.printForm();
    }
};

// linePragh.setData(data);
