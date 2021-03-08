class Runner {
    static lastRunTypeName: string;
    constructor(private typeName: string) {}
    run() {
        Runner.lastRunTypeName = this.typeName;
    }
}
const a = new Runner("a");
const b = new Runner("b");
b.run();
a.run();
console.log(Runner.lastRunTypeName);