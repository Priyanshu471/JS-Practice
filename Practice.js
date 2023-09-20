console.clear();

// Event Bubbling and Capturing
{
  document.querySelector("#grandparent").addEventListener(
    "click",
    (e) => {
      e.stopPropagation();
      console.log("Grandparent clicked");
    },
    false // if true, then event is captured
  );
  document.querySelector("#parent").addEventListener(
    "click",
    (e) => {
      e.stopPropagation();
      console.log("Parent clicked");
    },
    false // if false, then event is bubbled
  );
  document.querySelector("#child").addEventListener(
    "click",
    (e) => {
      console.log("Child clicked");
      e.stopPropagation();
    },
    false // if true, then event is captured
  );
}
// Event Delegation
{
  document.querySelector("#category") /
    addEventListener("click", (e) => {
      console.log(e);
      if (e.target.id === "category") return;
      if (e.target.tagName === "LI")
        window.location.href = `./${e.target.id}.html`;
      console.log("Category Parent Clicked");
    });
}

// call,apply,bind methods
{
  const name1 = {
    firstname: "Sachin",
    lastname: "Tendulkar",
    // printFullName: function () {
    //   console.log(this.firstname + " " + this.lastname);
    // },
  };

  const printFullName = function (hometown, team, type) {
    console.log(
      this.firstname +
        " " +
        this.lastname +
        ", " +
        hometown +
        " plays for " +
        team +
        " he is a " +
        type
    );
  };

  const name2 = {
    firstname: "Virat",
    lastname: "Kohli",
  };

  // call
  {
    console.log("Using Call()");
    printFullName.call(name1, "Mumbai", "MI", "Batsman");
    printFullName.call(name2, "Delhi", "RCB", "Batsman");
  }

  // apply
  {
    // The only difference between calḷ and apply is the way we pass arguments
    console.log("Using Appy()");
    printFullName.apply(name1, ["Mumbai", "MI", "Batsman"]);
  }

  // bind
  {
    // The bind methods behaves similar to call method but the only difference is that it binds the function with a object and returns it copy
    // bind method does not call the function rather it returns the copy of the function which can be invoked later
    console.log("Using Bind()");
    const printMyName = printFullName.bind(name2, "Delhi", "RCB", "Batsman");
    // console.log(printMyName);
    printMyName();

    let printname = printFullName.bind(name1, "Mumbai", "MI", "Batsman");
    printname("Batsman");
  }

  // Polyfill for bind method
  Function.prototype.mybind = function (...args) {
    let obj = this;
    //   console.log(obj);
    let params = args.slice(1);
    //   console.log(params);
    return function (...args2) {
      obj.apply(args[0], [...params, ...args2]);
    };
  };
  console.log("Using mybind()");
  let printname2 = printFullName.mybind(name2, "Delhi", "RCB", "Batsman");
  printname2();
}

// Function currying
{
  let multiply = function (x, y) {
    console.log("Currying using bind() : ", x * y);
  };
  let multiplyByTwo = multiply.bind(this, 2);
  multiplyByTwo(5);
  let multiplyByThree = multiply.bind(this, 3);
  // multiplyByThree(5);

  function sum(x) {
    let acc = x;
    return (y) => {
      if (y === undefined) {
        return acc;
      } else {
        acc += y;
        return sum(acc);
      }
    };
  }
  console.log("Currying using closure : ", sum(2)(10)(20)(30)());
}

// Map, Filter, Reduce methods
{
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  console.log("nums : ", nums);

  const multiplyThree = nums.map((num, i, arr) => {
    return arr[i] * 3 || num * 3;
  });
  console.log("map : ", multiplyThree);

  const moreThanFour = nums.filter((num, i, arr) => {
    return num > 4;
  });
  console.log("filter : ", moreThanFour);

  const total = nums.reduce((acc, num, i, arr) => {
    return acc + num;
  }, 0);
  console.log("reduce : ", total);

  // Polyfill for Map
  {
    Array.prototype.mymap = function (cb) {
      let temp = [];
      for (let i = 0; i < this.length; i++) {
        const ele = this[i];
        temp.push(cb(ele, i, this));
      }
      return temp;
    };
    const add100 = nums.mymap((num, i, arr) => {
      return num + 100;
    });
    console.log("mymap : ", add100);
  }

  // Polyfill for filter
  {
    Array.prototype.myfilter = function (cb) {
      let temp = [];
      for (let i = 0; i < this.length; i++) {
        const ele = this[i];
        if (cb(ele, i, this)) {
          temp.push(ele);
        }
      }
      return temp;
    };
    const moreThanFive = nums.myfilter((num, i, ele) => {
      return num > 5;
    });
    console.log("myfilter : ", moreThanFive);
  }

  // Polyfill for reduce
  {
    Array.prototype.myreduce = function (cb, initialValue) {
      let acc = initialValue || this[0];
      for (let i = 0; i < this.length; i++) {
        const ele = this[i];
        acc = cb(acc, ele, i, this[i]);
      }
      return acc;
    };
    const product = nums.myreduce((acc, num, i, arr) => {
      return acc * num;
    });
    console.log("myreduce : ", product);
  }
}

// What is the difference between map and forEach
// map returns a new array as a result but forEach doesn't return anything it just modifies the arr
// another difference is we can chain map as it returns array but we can't chain filter as it doesn't return anything
{
  const arr = [2, 5, 3, 4, 7];
  console.log("Original : ", arr);

  arr.map((ar) => {
    return ar + 2;
  });
  console.log("After map : ", arr);

  arr.forEach((ar, i, arr) => {
    arr[i] = ar + 2;
  });
  console.log("After forEach : ", arr);
}

// 1.Return an array containing cars name in uppercase
// 2.Return only details of car whose price is more than 70Lakhs
// 3.Return the totol price of all cars
// 4.Return only the name of car whose price is more than 80Lakhs
// 5.Return total price fot cars with price more than 80 after 20 have been added to those  who have price less than 80
{
  let cars = [
    { name: "Bmw", carnNumber: 21, price: 80 },
    { name: "Audi", carnNumber: 16, price: 70 },
    { name: "Volvo", carnNumber: 42, price: 90 },
    { name: "Ferrari", carnNumber: 23, price: 100 },
  ];

  let carName = [];
  let carMoreThan70 = [];
  let totalPrice = 0;

  // 1.Using for loop for Q1,Q2,Q3
  for (let i = 0; i < cars.length; i++) {
    carName.push(cars[i].name.toUpperCase());
    if (cars[i].price > 70) carMoreThan70.push(cars[i]);
    totalPrice += cars[i].price;
  }

  // 2.Using map for Q1
  carName = cars.map((car, i, arr) => {
    return car.name.toUpperCase();
  });
  // 2.Using filter for Q2
  carMoreThan70 = cars.filter((car, i, arr) => {
    return car.price > 70;
  });
  // 2.Using reduce for Q3
  totalPrice = cars.reduce((price, car, i, arr) => {
    return price + car.price;
  }, 0);
  console.log("Car Name : ", carName);
  console.log("Car Details : ", carMoreThan70);
  console.log("Total Price : ", totalPrice);

  // Q4
  const cardetails = cars
    .filter((car) => car.price > 80)
    .map((car) => car.name.toUpperCase());
  console.log("Car names more than 80 lakhs : ", cardetails);

  // Q5
  let Price = 0;
  Price = cars
    .map((car) => {
      if (car.price <= 80) return (car.price += 20);
      return car.price;
    })
    .filter((pri) => {
      return pri > 80;
    })
    .reduce((acc, pri) => acc + pri, 0);

  console.log(Price);
}
