$(document).ready(function() {
  $("form").on("submit", function(e) {
    var $form = $(this),
      numerator = +$form.find("#numerator").val(),
      denominator = +$form.find("#denominator").val(),
      operator = $form.find("#operator").val();
      result = 0;

    e.preventDefault();

    if (operator === "+") {
      result = numerator + denominator;
    }

    if (operator === "-" ) {
      result = numerator - denominator;
    }

    if (operator === "*" ) {
      result = numerator * denominator;
    }

    if (operator === "/") {
      result = numerator / denominator;
    }

    $("#result").text(result);
  });
});

