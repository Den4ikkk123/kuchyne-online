document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");
  const nextButtons = document.querySelectorAll(".next");
  const prevButtons = document.querySelectorAll(".prev");
  const progressBar = document.querySelector(".progress-bar");
  const progressLabels = document.querySelectorAll(".progress-label");
  let currentStep = 0;

  const totalSteps = steps.length;

  function updateProgress() {
    const percent = (currentStep / (totalSteps - 1)) * 100;
    progressBar.style.width = percent + "%";

    progressLabels.forEach((label, index) => {
      label.classList.remove("active", "completed");
      if (index < currentStep) {
        label.classList.add("completed");
      }
      if (index === currentStep) {
        label.classList.add("active");
      }
    });
  }

  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      step.classList.toggle("active", index === stepIndex);
    });
    updateProgress();
    toggleNextButton();
  }

  function toggleNextButton() {
    const activeStep = steps[currentStep];
    const radios = activeStep.querySelectorAll('input[type="radio"]');
    const nextBtn = activeStep.querySelector(".next");

    if (!nextBtn) return;

    if (currentStep >= totalSteps - 2) {
      nextBtn.disabled = false;
      return;
    }

    let isChecked = false;
    radios.forEach(radio => {
      if (radio.checked) isChecked = true;
    });

    nextBtn.disabled = !isChecked;
  }

  nextButtons.forEach(button => {
    button.addEventListener("click", () => {
      if (currentStep < totalSteps - 1) {
        currentStep++;
        if (currentStep === 6) {
        
          document.getElementById("souhrn-dispozice").textContent =
            document.querySelector('input[name="dispozice"]:checked')?.value || '';
          document.getElementById("souhrn-trouba").textContent =
            document.querySelector('input[name="trouba"]:checked')?.value || '';
          document.getElementById("souhrn-digestor").textContent =
            document.querySelector('input[name="digestor"]:checked')?.value || '';
          document.getElementById("souhrn-lednice").textContent =
            document.querySelector('input[name="lednice"]:checked')?.value || '';
          document.getElementById("souhrn-dekor").textContent =
            document.querySelector('input[name="dekor"]:checked')?.value || '';
          document.getElementById("souhrn-cena").textContent =
            document.querySelector('input[name="cena"]:checked')?.value || '';
        }
        showStep(currentStep);
      }
    });
  });

  prevButtons.forEach(button => {
    button.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener("change", () => {
      toggleNextButton();
    });
  });

  const form = document.getElementById("contact-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    data.append("dispozice", document.querySelector('input[name="dispozice"]:checked')?.value || '');
    data.append("trouba", document.querySelector('input[name="trouba"]:checked')?.value || '');
    data.append("digestor", document.querySelector('input[name="digestor"]:checked')?.value || '');
    data.append("lednice", document.querySelector('input[name="lednice"]:checked')?.value || '');
    data.append("dekor", document.querySelector('input[name="dekor"]:checked')?.value || '');
    data.append("cena", document.querySelector('input[name="cena"]:checked')?.value || '');

    fetch("proxy.php", {
      method: "POST",
      body: data
    })
    .then(response => response.text())
    .then(result => {
      alert("Formulář byl úspěšně odeslán!");
      console.log(result);
    })
    .catch(error => {
      alert("Chyba při odesílání formuláře!");
      console.error(error);
    });
  });

  showStep(currentStep);
});
