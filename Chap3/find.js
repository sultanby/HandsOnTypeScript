var items = [
    { name: 'jon', age: 20 },
    { name: 'linda', age: 22 },
    { name: 'jon', age: 40 }
];
var jon = items.find(function (item) {
    return item.name === 'jon';
});
console.log(jon);
