import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import SignupView from '../../views/SignupView.vue'

// Mock router for testing
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Login</div>' } },
    { path: '/dashboard', component: { template: '<div>Dashboard</div>' } }
  ]
})

describe("Testing -> SignupView", () => {
  
  it('should render all form elements correctly', () => {
    const wrapper = mount(SignupView, {
      global: {
        plugins: [router]
      }
    })
    
    // Check if main elements are present
    expect(wrapper.find('h2').text()).toBe('Create your account')
    expect(wrapper.find('input[type="text"][placeholder="First name"]').exists()).toBe(true)
    expect(wrapper.find('input[type="text"][placeholder="Last name"]').exists()).toBe(true)
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"][placeholder="Password"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"][placeholder="Confirm password"]').exists()).toBe(true)
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
    
    // Check placeholders
    expect(wrapper.find('input[type="text"][name="firstName"]').attributes('placeholder')).toBe('First name')
    expect(wrapper.find('input[type="text"][name="lastName"]').attributes('placeholder')).toBe('Last name')
    expect(wrapper.find('input[type="email"]').attributes('placeholder')).toBe('Email address')
    expect(wrapper.find('input[type="password"][name="password"]').attributes('placeholder')).toBe('Password')
    expect(wrapper.find('input[type="password"][name="confirmPassword"]').attributes('placeholder')).toBe('Confirm password')
  })

  it('should bind input values to reactive data', async () => {
    const wrapper = mount(SignupView, {
      global: {
        plugins: [router]
      }
    })
    
    const firstNameInput = wrapper.find('input[name="firstName"]')
    const lastNameInput = wrapper.find('input[name="lastName"]')
    const emailInput = wrapper.find('input[type="email"]')
    const passwordInput = wrapper.find('input[name="password"]')
    const confirmPasswordInput = wrapper.find('input[name="confirmPassword"]')
    
    // Test all input bindings
    await firstNameInput.setValue('John')
    expect((firstNameInput.element as HTMLInputElement).value).toBe('John')
    
    await lastNameInput.setValue('Doe')
    expect((lastNameInput.element as HTMLInputElement).value).toBe('Doe')
    
    await emailInput.setValue('john.doe@example.com')
    expect((emailInput.element as HTMLInputElement).value).toBe('john.doe@example.com')
    
    await passwordInput.setValue('password123')
    expect((passwordInput.element as HTMLInputElement).value).toBe('password123')
    
    await confirmPasswordInput.setValue('password123')
    expect((confirmPasswordInput.element as HTMLInputElement).value).toBe('password123')
  })

  it('should show password mismatch error when passwords do not match', async () => {
    const wrapper = mount(SignupView, {
      global: {
        plugins: [router]
      }
    })
    
    const passwordInput = wrapper.find('input[name="password"]')
    const confirmPasswordInput = wrapper.find('input[name="confirmPassword"]')
    
    // Set different passwords
    await passwordInput.setValue('password123')
    await confirmPasswordInput.setValue('different')
    
    // Check if error message appears
    expect(wrapper.find('.error-message').exists()).toBe(true)
    expect(wrapper.find('.error-message').text()).toBe('Passwords do not match')
    expect(confirmPasswordInput.classes()).toContain('input-error')
  })

  it('should not show password mismatch error when confirm password is empty', async () => {
    const wrapper = mount(SignupView, {
      global: {
        plugins: [router]
      }
    })
    
    const passwordInput = wrapper.find('input[name="password"]')
    
    // Set password but leave confirm password empty
    await passwordInput.setValue('password123')
    
    // Error message should not appear when confirm password is empty
    expect(wrapper.find('.error-message').exists()).toBe(false)
  })

  it('should disable submit button when form is incomplete', async () => {
    const wrapper = mount(SignupView, {
      global: {
        plugins: [router]
      }
    })
    
    const submitButton = wrapper.find('button[type="submit"]')
    
    // Button should be disabled initially
    expect(submitButton.attributes('disabled')).toBeDefined()
    
    // Fill only some fields
    await wrapper.find('input[name="firstName"]').setValue('John')
    await wrapper.find('input[name="lastName"]').setValue('Doe')
    
    // Button should still be disabled
    expect(submitButton.attributes('disabled')).toBeDefined()
  })

  it('should enable submit button when all form fields are valid', async () => {
    const wrapper = mount(SignupView, {
      global: {
        plugins: [router]
      }
    })
    
    const submitButton = wrapper.find('button[type="submit"]')
    
    // Fill all required fields correctly
    await wrapper.find('input[name="firstName"]').setValue('John')
    await wrapper.find('input[name="lastName"]').setValue('Doe')
    await wrapper.find('input[type="email"]').setValue('john.doe@example.com')
    await wrapper.find('input[name="password"]').setValue('password123')
    await wrapper.find('input[name="confirmPassword"]').setValue('password123')
    await wrapper.find('input[type="checkbox"]').setValue(true)
    
    // Button should be enabled
    expect(submitButton.attributes('disabled')).toBeUndefined()
  })

  it('should prevent form submission when required fields are empty', async () => {
    const wrapper = mount(SignupView, {
      global: {
        plugins: [router]
      }
    })
    
    // Check that all required inputs have required attribute
    const firstNameInput = wrapper.find('input[name="firstName"]')
    const lastNameInput = wrapper.find('input[name="lastName"]')
    const emailInput = wrapper.find('input[type="email"]')
    const passwordInput = wrapper.find('input[name="password"]')
    const confirmPasswordInput = wrapper.find('input[name="confirmPassword"]')
    const checkboxInput = wrapper.find('input[type="checkbox"]')
    
    expect(firstNameInput.attributes('required')).toBe('')
    expect(lastNameInput.attributes('required')).toBe('')
    expect(emailInput.attributes('required')).toBe('')
    expect(passwordInput.attributes('required')).toBe('')
    expect(confirmPasswordInput.attributes('required')).toBe('')
    expect(checkboxInput.attributes('required')).toBe('')
  })

  it('should call handleSubmit when form is submitted with valid data', async () => {
    // Mock console.log to verify it's called
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    
    const wrapper = mount(SignupView, {
      global: {
        plugins: [router]
      }
    })
    
    const form = wrapper.find('form')
    
    // Fill in all form fields
    await wrapper.find('input[name="firstName"]').setValue('John')
    await wrapper.find('input[name="lastName"]').setValue('Doe')
    await wrapper.find('input[type="email"]').setValue('john.doe@example.com')
    await wrapper.find('input[name="password"]').setValue('password123')
    await wrapper.find('input[name="confirmPassword"]').setValue('password123')
    await wrapper.find('input[type="checkbox"]').setValue(true)
    
    // Submit the form
    await form.trigger('submit')
    
    // Verify console.log was called with correct values
    expect(consoleSpy).toHaveBeenCalledWith('First Name:', 'John')
    expect(consoleSpy).toHaveBeenCalledWith('Last Name:', 'Doe')
    expect(consoleSpy).toHaveBeenCalledWith('Email:', 'john.doe@example.com')
    expect(consoleSpy).toHaveBeenCalledWith('Password:', 'password123')
    expect(consoleSpy).toHaveBeenCalledWith('Terms Agreed:', true)
    
    consoleSpy.mockRestore()
  })

  it('should navigate to dashboard after successful form submission', async () => {
    const routerPushSpy = vi.spyOn(router, 'push').mockImplementation(() => Promise.resolve())
    
    const wrapper = mount(SignupView, {
      global: {
        plugins: [router]
      }
    })
    
    const form = wrapper.find('form')
    
    // Fill in all form fields
    await wrapper.find('input[name="firstName"]').setValue('Jane')
    await wrapper.find('input[name="lastName"]').setValue('Smith')
    await wrapper.find('input[type="email"]').setValue('jane.smith@example.com')
    await wrapper.find('input[name="password"]').setValue('securepass')
    await wrapper.find('input[name="confirmPassword"]').setValue('securepass')
    await wrapper.find('input[type="checkbox"]').setValue(true)
    
    // Submit the form
    await form.trigger('submit')
    
    // Verify router.push was called with correct route
    expect(routerPushSpy).toHaveBeenCalledWith('/dashboard')
    
    routerPushSpy.mockRestore()
  })

  it('should navigate to login page when sign in link is clicked', async () => {
    const routerPushSpy = vi.spyOn(router, 'push').mockImplementation(() => Promise.resolve())
    
    const wrapper = mount(SignupView, {
      global: {
        plugins: [router]
      }
    })
    
    const signInLink = wrapper.find('.signin-text .link')
    
    // Click the sign in link
    await signInLink.trigger('click')
    
    // Verify router.push was called with login route
    expect(routerPushSpy).toHaveBeenCalledWith('/')
    
    routerPushSpy.mockRestore()
  })

  it('should have proper accessibility attributes and responsive classes', () => {
    const wrapper = mount(SignupView, {
      global: {
        plugins: [router]
      }
    })
    
    // Check accessibility attributes for all inputs
    const firstNameInput = wrapper.find('input[name="firstName"]')
    const lastNameInput = wrapper.find('input[name="lastName"]')
    const emailInput = wrapper.find('input[type="email"]')
    const passwordInput = wrapper.find('input[name="password"]')
    const confirmPasswordInput = wrapper.find('input[name="confirmPassword"]')
    const checkboxInput = wrapper.find('input[type="checkbox"]')
    
    // Check IDs
    expect(firstNameInput.attributes('id')).toBe('first-name')
    expect(lastNameInput.attributes('id')).toBe('last-name')
    expect(emailInput.attributes('id')).toBe('email-address')
    expect(passwordInput.attributes('id')).toBe('password')
    expect(confirmPasswordInput.attributes('id')).toBe('confirm-password')
    expect(checkboxInput.attributes('id')).toBe('agree-terms')
    
    // Check labels with sr-only class
    const labels = wrapper.findAll('label.sr-only')
    expect(labels.length).toBe(5) // 5 sr-only labels for inputs
    
    // Check main container classes
    expect(wrapper.find('.container').exists()).toBe(true)
    expect(wrapper.find('.signup-card').exists()).toBe(true)
    expect(wrapper.find('.form').exists()).toBe(true)
    
    // Check if terms and privacy links exist
    const termsLinks = wrapper.findAll('.checkbox-label .link')
    expect(termsLinks.length).toBe(2) // "Terms of Service" and "Privacy Policy" links
    
    // Check sign in link
    const signInLink = wrapper.find('.signin-text .link')
    expect(signInLink.exists()).toBe(true)
    expect(signInLink.text()).toBe('Sign in')
  })

  it('should not submit form when passwords do not match', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const routerPushSpy = vi.spyOn(router, 'push').mockImplementation(() => Promise.resolve())
    
    const wrapper = mount(SignupView, {
      global: {
        plugins: [router]
      }
    })
    
    const form = wrapper.find('form')
    
    // Fill form with mismatched passwords
    await wrapper.find('input[name="firstName"]').setValue('John')
    await wrapper.find('input[name="lastName"]').setValue('Doe')
    await wrapper.find('input[type="email"]').setValue('john.doe@example.com')
    await wrapper.find('input[name="password"]').setValue('password123')
    await wrapper.find('input[name="confirmPassword"]').setValue('different')
    await wrapper.find('input[type="checkbox"]').setValue(true)
    
    // Try to submit the form
    await form.trigger('submit')
    
    // Verify that form submission was blocked
    expect(consoleSpy).not.toHaveBeenCalled()
    expect(routerPushSpy).not.toHaveBeenCalled()
    
    consoleSpy.mockRestore()
    routerPushSpy.mockRestore()
  })

  it('should not submit form when terms are not agreed', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const routerPushSpy = vi.spyOn(router, 'push').mockImplementation(() => Promise.resolve())
    
    const wrapper = mount(SignupView, {
      global: {
        plugins: [router]
      }
    })
    
    const form = wrapper.find('form')
    
    // Fill form but don't agree to terms
    await wrapper.find('input[name="firstName"]').setValue('John')
    await wrapper.find('input[name="lastName"]').setValue('Doe')
    await wrapper.find('input[type="email"]').setValue('john.doe@example.com')
    await wrapper.find('input[name="password"]').setValue('password123')
    await wrapper.find('input[name="confirmPassword"]').setValue('password123')
    // Leave checkbox unchecked
    
    // Try to submit the form
    await form.trigger('submit')
    
    // Verify that form submission was blocked
    expect(consoleSpy).not.toHaveBeenCalled()
    expect(routerPushSpy).not.toHaveBeenCalled()
    
    consoleSpy.mockRestore()
    routerPushSpy.mockRestore()
  })

});