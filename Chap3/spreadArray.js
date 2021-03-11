var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var SpreadArray;
(function (SpreadArray) {
    var a = [1, 2, 3];
    var b = [4, 5, 6];
    var c = __spreadArray(__spreadArray([], a), b);
    var d = a.concat(b);
    console.log('c before', c);
    console.log('d before', d);
    a.push(10);
    console.log('a', a);
    console.log('c after', c);
    console.log('d after', d);
})(SpreadArray || (SpreadArray = {}));
