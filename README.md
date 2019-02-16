# Ticker

__Почему this.\_i не увеличивается. Как исправить?__
В примере:
```
function Ticker() {
    this._i = 0
    };
Ticker.prototype = {
    tick: function() {
            console.log(this._i++);
            }
};
var ticker = new Ticker();

setInterval(ticker.tick, 1000);
```
_this.\_i_ не увеличивается из-за потери контекста:
_setInterval_ получил функцию _ticker.tick_ равной 
 ```
 ƒ () {
    console.log(this._i++)
 }
 ```
 но не её __контекст__.
 
 Есть несколько вариантов получения нужного результата:
 1. Используем встроенный метод _bind_ для привязки контекста
 ```
function Ticker() {
    this._i = 0
    };
Ticker.prototype = {
    tick: function() {
            console.log(this._i++);
            }
};
var ticker = new Ticker();

setInterval(ticker.tick.bind(ticker), 1000);
```
Здесь мы указываем, что к функции _ticker.tick_ привязывается контекст _ticker_
2. Оборачиваем вызов _ticker.tick_ в анонимную функцию:
```
function Ticker() {
    this._i = 0
    };
Ticker.prototype = {
    tick: function() {
            console.log(this._i++);
            }
};
var ticker = new Ticker();

setInterval(
    function (){
        ticker.tick()
    }, 1000);
```
здесь _ticker_ достаётся из замыкания.
3. С помощью вспомогательной функции HelpUs():
 ```
function Ticker() {
    this._i = 0
    };
Ticker.prototype = {
    tick: function() {
            console.log(this._i++);
            }
};
var ticker = new Ticker();

function HelpUs(func, context){
    return () => func.apply(context, arguments)
    }

setInterval(HelpUs(ticker.tick, ticker), 1000);
```
С помощью вспомогательной функции HelpUs получаем "обёртку", которая передаёт вызов в func (_ticker.tick_), с теми же аргументами, но фиксированным контекстом context (_ticker_)
