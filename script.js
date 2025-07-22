document.addEventListener('DOMContentLoaded', function () {
  const steps = document.querySelectorAll('.step');
  const progressSteps = document.querySelectorAll('.progress-step');
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
      step.style.display = index === i ? 'block' : 'none';
    });

    progressSteps.forEach((step, index) => {
      step.classList.toggle('active', index === i);
    });

    if (i >= progressSteps.length) {
      progressSteps.forEach(step => step.classList.remove('active'));
    }

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

