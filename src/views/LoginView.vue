<template>
  <div class="container">
    <div class="login-card">
      <h2 class="title">Sign in to your account</h2>
      <form class="form" @submit.prevent="handleSubmit">
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
        <div class="options">
          <div class="checkbox-group">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="checkbox"
            />
            <label for="remember-me" class="checkbox-label">Remember me</label>
          </div>
          <a href="#" class="link">Forgot your password?</a>
        </div>
        <button type="submit" class="button">Sign in</button>
      </form>
      <p class="signup-text">
        Don't have an account? <a href="#" class="link">Sign up</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const email = ref('');
const password = ref('');

const handleSubmit = () => {
  // Add your authentication logic here
  console.log('Email:', email.value);
  console.log('Password:', password.value);
  router.push('/dashboard')
};
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

.login-card {
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

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
}

.checkbox-group {
  display: flex;
  align-items: center;
}

.checkbox {
  width: 1rem;
  height: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
}

.checkbox:checked {
  background-color: #4f46e5;
  border-color: #4f46e5;
}

.checkbox-label {
  margin-left: 0.5rem;
  color: #1f2937;
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

.button:hover {
  background-color: #4338ca;
}

.button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.5);
}

.signup-text {
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
  .login-card {
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