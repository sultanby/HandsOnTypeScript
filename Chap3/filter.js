var filterItems = [
    { name: 'jon', age: 20 },
    { name: 'linda', age: 22 },
    { name: 'jon', age: 40 }
];
var results = filterItems.filter(function (item, index) {
    return item.name === 'jon';
});
console.log(results);
