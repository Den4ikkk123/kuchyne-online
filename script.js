document.addEventListener('DOMContentLoaded', function () {
  const steps = document.querySelectorAll('.step');
  const progressBar = document.querySelector('.progress-bar');
  const progressLabels = document.querySelectorAll('.progress-label');
  let currentStep = 0;

  const nextButtons = document.querySelectorAll('.next');
  const prevButtons = document.querySelectorAll('.prev');

  function updateProgressBar() {
    const percent = (currentStep / (steps.length - 1)) * 100;
    progressBar.style.width = `${percent}%`;

    progressLabels.forEach((label, index) => {
      label.classList.toggle('active', index === currentStep);
    });
  }

  function updateSummary() {
    const fields = ['dispozice', 'trouba', 'digestor', 'lednice', 'dekor', 'cena'];
    fields.forEach(field => {
      const selected = document.querySelector(`input[name="${field}"]:checked`);
      const target = document.getElementById(`souhrn-${field}`);
      if (selected && target) target.textContent = selected.value;
    });
  }

  function showStep(i) {
    steps.forEach((step, index) => {
      step.classList.toggle('active', index === i);
    });
    updateProgressBar();
    toggleNextButtonState();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function toggleNextButtonState() {
    const current = steps[currentStep];
    const nextBtn = current.querySelector('.next');

    if (currentStep >= steps.length - 2) {
      if (nextBtn) nextBtn.disabled = false;
      return;
    }

    const checked = current.querySelector('input[type="radio"]:checked');
    if (nextBtn) {
      nextBtn.disabled = !checked;
    }
  }

  nextButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        if (currentStep === steps.length - 2) updateSummary(); // Update summary before last step
        showStep(currentStep);
      }
    });
  });

  prevButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  document.querySelectorAll('.option-card input[type="radio"]').forEach(input => {
    input.addEventListener('change', () => {
      toggleNextButtonState();
    });
  });

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const data = {
        partnerId: 99,
        studioCode: 1,
        customer: {
          firstName: form.firstName.value,
          lastName: form.lastName.value,
          title: "",
          phone: form.phone.value,
          email: form.email.value
        },
        segment: 1,
        comment: `Dispozice: ${document.querySelector('input[name="dispozice"]:checked')?.value}, Trouba: ${document.querySelector('input[name="trouba"]:checked')?.value}, Digestoř: ${document.querySelector('input[name="digestor"]:checked')?.value}, Lednice: ${document.querySelector('input[name="lednice"]:checked')?.value}, Dekor: ${document.querySelector('input[name="dekor"]:checked')?.value}, Rozpočet: ${document.querySelector('input[name="cena"]:checked')?.value}`
      };

      try {
        const res = await fetch('proxy.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'APIKey': '39498757-0426-4A99-919C-3265414E53F7'
          },
          body: JSON.stringify(data)
        });

        if (res.ok) {
          alert('Formulář byl úspěšně odeslán.');
          form.reset();
        } else {
          alert('Došlo k chybě při odesílání.');
        }
      } catch (error) {
        alert('Chyba připojení: ' + error);
      }
    });
  }

  showStep(currentStep);
});
