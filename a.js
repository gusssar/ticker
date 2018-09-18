function Ticker() {
    this._i = 0
}

Ticker.prototype ={
    tick : function() {
        console.log(this._i++);
    }
};

let ticker = new Ticker();

setInterval(ticker.tick.bind(ticker), 1000);