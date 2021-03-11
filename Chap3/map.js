var employees = [
    { name: 'tim', id: 1 },
    { name: 'cindy', id: 2 },
    { name: 'rob', id: 3 },
];
var elements = employees.map(function (item, index) {
    return "<div>" + item.id + " - " + item.name + "</div>";
});
console.log(elements);
