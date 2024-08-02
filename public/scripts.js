// JavaScript for the password generator

/**
 * Sanitizes input to ensure it is within the specified bounds.
 * 
 * @param {string} value - The input value to sanitize.
 * @param {number} min - The minimum allowed value.
 * @param {number} max - The maximum allowed value.
 * @returns {number} - The sanitized value.
 */
function sanitizeInput(value, min, max) {
    const num = parseInt(value, 10);
    return (isNaN(num) || num < min || num > max) ? min : num;
}

/**
 * Generates a random password based on the selected criteria.
 */
function generatePassword() {
    const length = sanitizeInput(document.getElementById('length').value, 6, 120);
    const includeSpecial = document.getElementById('includeSpecial').checked;
    const includeVerySpecial = document.getElementById('includeVerySpecial').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;

    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
    const verySpecialChars = '£¥€§¶•ªº¿¬æŒÆœ';
    const numberChars = '0123456789';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';

    let allChars = '';
    if (includeSpecial) allChars += specialChars;
    if (includeVerySpecial) allChars += verySpecialChars;
    if (includeNumbers) allChars += numberChars;
    if (includeUppercase) allChars += uppercaseChars;
    if (includeLowercase) allChars += lowercaseChars;

    if (allChars === '') {
        alert('Please select at least one character set!');
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    // Sanitize and set password output to prevent XSS attacks
    document.getElementById('password').innerText = password.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Copies the generated password to the clipboard.
 */
function copyPassword() {
    const passwordText = document.getElementById('password').innerText;
    navigator.clipboard.writeText(passwordText).then(() => {
        alert('Password copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

/**
 * Updates the length value displayed next to the slider.
 */
function updateLengthValue() {
    const length = document.getElementById('length').value;
    document.getElementById('lengthValue').innerText = length;
}

/**
 * Decreases the length by 1.
 */
function decreaseLength() {
    const lengthSlider = document.getElementById('length');
    if (lengthSlider.value > 6) {
        lengthSlider.value = parseInt(lengthSlider.value, 10) - 1;
        updateLengthValue();
    }
}

/**
 * Increases the length by 1.
 */
function increaseLength() {
    const lengthSlider = document.getElementById('length');
    if (lengthSlider.value < 120) {
        lengthSlider.value = parseInt(lengthSlider.value, 10) + 1;
        updateLengthValue();
    }
}

// Add event listeners after the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('generateBtn').addEventListener('click', generatePassword);
    document.getElementById('copyBtn').addEventListener('click', copyPassword);
    document.getElementById('length').addEventListener('input', updateLengthValue);
    document.getElementById('decreaseLength').addEventListener('click', decreaseLength);
    document.getElementById('increaseLength').addEventListener('click', increaseLength);
    updateLengthValue(); // Initial update of the displayed length value


    try {
        let app = firebase.app();
        let features = [
          'auth', 
          'database', 
          'firestore',
          'functions',
          'messaging', 
          'storage', 
          'analytics', 
          'remoteConfig',
          'performance',
        ].filter(feature => typeof app[feature] === 'function');
      } catch (e) {
        console.error(e);
      }
});