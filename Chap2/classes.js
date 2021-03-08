var Person = /** @class */ (function () {
    function Person(msg) {
        this.msg = msg;
    }
    //msg: string;
    Person.prototype.speak = function () {
        console.log(this.msg);
    };
    return Person;
}());
var tom = new Person("hello");
//tom.msg = "hello";
tom.speak();
