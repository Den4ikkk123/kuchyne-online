document.addEventListener('DOMContentLoaded', function () {
  const steps = document.querySelectorAll('.step');
  const progressBar = document.querySelector('.progress-bar');
  const progressLabels = document.querySelectorAll('.progress-label');
  let currentStep = 0;

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

    progressLabels.forEach((label, index) => {
      label.classList.toggle('active', index === i);
      if (index < i) {
        label.classList.add('completed');
      } else {
        label.classList.remove('completed');
      }
    });


    const progress = (i / (progressLabels.length - 1)) * 100;
    progressBar.style.width = `${progress}%`;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.querySelectorAll('.next').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        if (currentStep === 6) updateSummary();
        showStep(currentStep);
      }
    });
  });

  document.querySelectorAll('.prev').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  document.querySelectorAll('input[type="radio"]').forEach(input => {
    input.addEventListener('change', () => {
      const parentStep = input.closest('.step');
      const nextButton = parentStep.querySelector('.next');
      if (nextButton) nextButton.disabled = false;
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

//mobv

function updateMobileProgress() {
  const counter = document.querySelector('.step.active .mobile-progress .step-counter');
  if (counter) {
    counter.textContent = `KROK ${currentStep + 1}/7`;
  }
}

// Оновлюємо після кожного показу кроку:
function showStep(i) {
  steps.forEach((step, index) => {
    step.classList.toggle('active', index === i);
  });

  progressLabels.forEach((label, index) => {
    label.classList.toggle('active', index === i);
    if (index < i) {
      label.classList.add('completed');
    } else {
      label.classList.remove('completed');
    }
  });

  const progress = (i / (steps.length - 1)) * 100;
  progressBar.style.width = `${progress}%`;

  updateMobileProgress();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Обробка стрілок у мобільному прогресі
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('prev-step') && currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
  if (e.target.classList.contains('next-step') && currentStep < steps.length - 1) {
    currentStep++;
    if (currentStep === 6) updateSummary();
    showStep(currentStep);
  }
});


