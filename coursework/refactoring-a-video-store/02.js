function statement(customer, movies) {
  let totalAmount = 0;
  let frequentRenterPoints = 0;
  let result = `Rental Record for ${customer.name}\n`;

  for (let r of customer.rentals) {
    const thisAmount = amountFor(r);
    frequentRenterPoints(r);

    //print figures for this rental
    result += `\t${movieFor(r).title}\t${thisAmount}\n`;
    totalAmount += thisAmount;
  }
  // add footer lines
  result += `Amount owed is ${totalAmount}\n`;
  result += `You earned ${frequentRenterPoints} frequent renter points\n`;

  return result;
}

function movieFor(rental) {
  return movies[rental.movieID];
}

function amountFor(r) {
  let thisAmount = 0;

  // determine amount for each movie
  switch (movieFor(r).code) {
    case "regular":
      thisAmount = 2;
      if (r.days > 2) {
        thisAmount += (r.days - 2) * 1.5;
      }
      break;
    case "new":
      thisAmount = r.days * 3;
      break;
    case "childrens":
      thisAmount = 1.5;
      if (r.days > 3) {
        thisAmount += (r.days - 3) * 1.5;
      }
      break;
  }

  return thisAmount;
}

function frequentRenterPoints(r) {
    //add frequent renter points
    frequentRenterPoints++;
    // add bonus for a two day new release rental
    if (movieFor(r).code === "new" && r.days > 2) frequentRenterPoints++;


}