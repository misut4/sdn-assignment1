function solveRect(l, b) {
  perimeter = (x, y) => 2 * (x + y);
  area = (x, y) => x * y;
  
  console.log("Solving for rectangle with l = " + l + " and b = " + b);

  if (l <= 0 || b <= 0) {
    console.log(
      "Rectangle dimensions should be greater than zero:  l = " +
        l +
        ",  and b = " +
        b
    );
  } else {
    console.log("The area of the rectangle is " + area(l, b));
    console.log("The perimeter of the rectangle is " + perimeter(l, b));
  }
}

module.exports = {
  solveRect,
};
