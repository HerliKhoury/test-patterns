<template>
  <div class="container">
    <div class="signup-card">
      <h2 class="title">Create your account</h2>
      <form class="form" @submit.prevent="handleSubmit">
        <div class="input-group">
          <label for="first-name" class="sr-only">First name</label>
          <input
            id="first-name"
            name="firstName"
            type="text"
            v-model="firstName"
            required
            class="input"
            placeholder="First name"
          />
        </div>
        <div class="input-group">
          <label for="last-name" class="sr-only">Last name</label>
          <input
            id="last-name"
            name="lastName"
            type="text"
            v-model="lastName"
            required
            class="input"
            placeholder="Last name"
          />
        </div>
        <div class="input-group">
          <label for="email-address" class="sr-only">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            v-model="email"
            required
            class="input"
            placeholder="Email address"
          />
        </div>
        <div class="input-group">
          <label for="password" class="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            v-model="password"
            required
            class="input"
            placeholder="Password"
          />
        </div>
        <div class="input-group">
          <label for="confirm-password" class="sr-only">Confirm password</label>
          <input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            v-model="confirmPassword"
            required
            class="input"
            placeholder="Confirm password"
            :class="{ 'input-error': passwordMismatch }"
          />
          <span v-if="passwordMismatch" class="error-message">
            Passwords do not match
          </span>
        </div>
        <div class="options">
          <div class="checkbox-group">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              v-model="agreeToTerms"
              required
              class="checkbox"
            />
            <label for="agree-terms" class="checkbox-label">
              I agree to the <a href="#" class="link">Terms of Service</a> and <a href="#" class="link">Privacy Policy</a>
            </label>
          </div>
        </div>
        <button type="submit" class="button" :disabled="!canSubmit">
          Create Account
        </button>
      </form>
      <p class="signin-text">
        Already have an account? <a href="#" class="link" @click.prevent="handleLogin">Sign in</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const agreeToTerms = ref(false);

const passwordMismatch = computed(() => {
  return confirmPassword.value.length > 0 && password.value !== confirmPassword.value;
});

const canSubmit = computed(() => {
  return firstName.value && 
         lastName.value && 
         email.value && 
         password.value && 
         confirmPassword.value && 
         !passwordMismatch.value && 
         agreeToTerms.value;
});

const handleSubmit = () => {
  if (!canSubmit.value) return;
  
  // Add your registration logic here
  console.log('First Name:', firstName.value);
  console.log('Last Name:', lastName.value);
  console.log('Email:', email.value);
  console.log('Password:', password.value);
  console.log('Terms Agreed:', agreeToTerms.value);
  
  // Redirect to dashboard or welcome page after successful registration
  router.push('/dashboard');
};

const handleLogin = () => {
    router.push('/');
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(171, 63, 243);
}

.signup-card {
  max-width: 400px;
  width: 100%;
  background-color: #ffffff;
  padding: 2.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 1.875rem;
  font-weight: 800;
  color: #1f2937;
  text-align: center;
  margin-bottom: 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  position: relative;
}

.input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #1f2937;
  background-color: #ffffff;
}

.input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
}

.input::placeholder {
  color: #6b7280;
}

.input-error {
  border-color: #ef4444;
}

.input-error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

.error-message {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.options {
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
}

.checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.checkbox {
  width: 1rem;
  height: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  margin-top: 0.125rem;
  flex-shrink: 0;
}

.checkbox:checked {
  background-color: #4f46e5;
  border-color: #4f46e5;
}

.checkbox-label {
  color: #1f2937;
  line-height: 1.4;
}

.link {
  color: #4f46e5;
  text-decoration: none;
}

.link:hover {
  color: #4338ca;
  text-decoration: underline;
}

.button {
  width: 100%;
  padding: 0.75rem;
  background-color: #4f46e5;
  color: #ffffff;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.button:hover:not(:disabled) {
  background-color: #4338ca;
}

.button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.5);
}

.button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.signin-text {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

/* Responsive design */
@media (max-width: 640px) {
  .signup-card {
    padding: 1.5rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .input {
    padding: 0.5rem;
  }

  .button {
    padding: 0.5rem;
  }
}
</style>