document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("emailForm");
  var nameEl = document.getElementById("nameInput");
  var compEl = document.getElementById("companyInput");
  var emailEl = document.getElementById("emailInput");
  var interest = document.getElementById("interestType");

  var RECIPIENT_EMAIL = "elin.gunnarsson@lnu.se";

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();


    if (!nameEl.value.trim() || !compEl.value.trim() || !emailEl.value.trim() || !interest.value.trim()) {
      alert("Fyll i alla obligatoriska fält.");
      return;
    }

    var subject = "Intresseanmälan – " + compEl.value.trim();
    var body =
      "Intresseanmälan från IoT-Lab 2.0-sidan\n\n" +
      "Namn: " + nameEl.value.trim() + "\n" +
      "Företag: " + compEl.value.trim() + "\n" +
      "E-post: " + emailEl.value.trim() + "\n" +
      "Intresserad av: " + interest.value.trim() + "\n";

    var mailtoLink =
      "mailto:" + encodeURIComponent(RECIPIENT_EMAIL) +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);


    window.location.href = mailtoLink;


    form.reset();
  });
});

