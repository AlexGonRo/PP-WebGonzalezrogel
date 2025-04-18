// Some validations for my forms
function onRecaptchaSuccess(token) {

    console.log('reCAPTCHA validated successfully.');

    const form = document.getElementById('contact-form');

    // Validate the form
    const isValid = validateForm(form);

    if (isValid) {
        // If valid, submit the form
        console.log('Form is valid. Submitting...');
        submitMyForm(form, token);
    } else {
        console.log('Form is invalid. Please correct the errors.');
    }

};

function validateForm(form) {
    let isValid = true;

    // Get form fields
    const nameField = form.querySelector('[name="emailSenderName"]');
    const emailField = form.querySelector('[name="emailSenderMail"]');
    const subjectField = form.querySelector('[name="emailSubject"]');
    const messageField = form.querySelector('[name="emailBody"]');

    // Clear previous error messages
    clearErrors(form);

    // Validate Name
    if (!nameField.value.trim()) {
        showError(nameField, 'Name is required.');
        isValid = false;
    }

    // Validate Email
    if (!emailField.value.trim()) {
        showError(emailField, 'Email is required.');
        isValid = false;
    } else if (!isValidEmail(emailField.value)) {
        showError(emailField, 'Please enter a valid email address.');
        isValid = false;
    }

    // Validate Subject
    if (!subjectField.value.trim()) {
        showError(subjectField, 'Subject is required.');
        isValid = false;
    }

    // Validate Message
    if (!messageField.value.trim()) {
        showError(messageField, 'Message is required.');
        isValid = false;
    }

    return isValid;
}

function isValidEmail(email) {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function clearErrors(form) {
    // Remove all error messages
    const errors = form.querySelectorAll('.invalid-feedback');
    errors.forEach(error => error.remove());

    // Remove invalid class from fields
    const invalidFields = form.querySelectorAll('.is-invalid');
    invalidFields.forEach(field => field.classList.remove('is-invalid'));
}

function showError(field, message) {
    // Highlight the field
    field.classList.add('is-invalid');

    // Add an error message
    const error = document.createElement('div');
    error.className = 'invalid-feedback';
    error.textContent = message;
    field.parentNode.appendChild(error);
}

function submitMyForm(form, token) {

    const formData = new FormData(form);
    formData.append('g-recaptcha-response', token);

    // Send the form data via AJAX
    fetch('send_message.php', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.text())
        .then(html => {
            // Inject the returned HTML into a container on the page
            const alertContainer = document.getElementById('alert-container');
            alertContainer.innerHTML = html;

            // Reset the form if the message was sent successfully
            if (html.includes('alert-success')) {
                form.reset();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An unexpected error occurred. Please try again later.');
        });


}