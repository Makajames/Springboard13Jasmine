window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });

    const submitButton = document.getElementById("calc-submit");
    if (submitButton) {
      submitButton.addEventListener("click", function(e) {
        e.preventDefault();
        updateMonthly();
      });
    }
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  };
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues(amount = 10000, years = 5, rate = 0.25) {
  document.getElementById("loan-amount").value = amount;
  document.getElementById("loan-years").value = years;
  document.getElementById("loan-rate").value = rate;
  update();
}
// Get the current values from the UI
// Update the monthly payment
function update() {
  const {amount, years, rate} = getCurrentUIValues();
  return {amount , years, rate};
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.


function calculateMonthlyPayment() {
    const {amount, years, rate} = update();
    const monthlyRate = rate / 12;
    const numberOfPayments = years * 12;
    const numerator = amount * monthlyRate;
    const denominator = 1 - Math.pow(1 + monthlyRate, -numberOfPayments); //i dont fully understand how this works vs the written equation
    const monthlyPayment = numerator / denominator;
    return monthlyPayment.toFixed(2);
}


// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
    const monthlyPaymentSpan = document.getElementById("monthly-payment");
    const monthlyPayment = calculateMonthlyPayment();
    monthlyPaymentSpan.textContent = "$" + monthlyPayment;
}