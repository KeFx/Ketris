const BrandName = "Toyota";

class Car {
    constructor(brand, engine, year) {
        this.brand = brand;
        this.engine = engine;
        this.year = year;
        this.miles = 0;
    }
    driveMiles(distance){
        this.miles += distance;
    }
    get distanceTraveled(){return this.miles;}
    set distanceTraveled(value){
        if (value < this.miles){
            throw new Error(`Sorry, can't set value to less than current distance traveled. `)
        }
        this.miles = value;
    }
    get age(){
        return new Date().getFullYear() - this.year;
    }
    checkBrand(){
        return this.brand;
    }
    swapEngine(newEngine){
        this.engine = newEngine;
    }
};

class Engine {
    constructor(hp, architecture){
        this.hp = hp;
        this.architecture = architecture;
    }
    
    sepcs() {
        return `Architech: ${this.architecture}, HP: ${this.hp}`
    }
}

let weakEngine = new Engine(195 , "V6");
let powerfulEngine = new Engine(495, "V8");
const manufactureYear = 1999

let myCar = new Car("Mustang", weakEngine, manufactureYear);

console.log(myCar.engine.sepcs());

myCar.swapEngine(powerfulEngine);

console.log(myCar.engine.sepcs());

console.log("Car brand:", myCar.checkBrand());

myCar.driveMiles(35);

console.log("before setting distanceTraveld value:", myCar.distanceTraveled);
myCar.distanceTraveled = 333;
console.log("after setting distanceTraveld value:",myCar.distanceTraveled);

// try {
    myCar.distanceTraveled = 1;
// } catch(ex) {
//     console.log(ex.message);
// }
