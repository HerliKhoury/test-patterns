import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../../views/LoginView.vue";

// Mock router for testing
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: { template: "<div>Home</div>" } },
    { path: "/dashboard", component: { template: "<div>Dashboard</div>" } },
  ],
});

describe("Testing -> LoginView", () => {
  it("should render all form elements correctly", () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router],
      },
    });

    // Check if main elements are present
    expect(wrapper.find("h2").text()).toBe("Sign in to your account");
    expect(wrapper.find('input[type="email"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);

    // Check placeholders
    expect(wrapper.find('input[type="email"]').attributes("placeholder")).toBe("Email address");
    expect(wrapper.find('input[type="password"]').attributes("placeholder")).toBe("Password");
  });

  it("should bind input values to reactive data", async () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router],
      },
    });

    const emailInput = wrapper.find('input[type="email"]');
    const passwordInput = wrapper.find('input[type="password"]');

    // Test email input binding
    await emailInput.setValue("test@example.com");
    expect((emailInput.element as HTMLInputElement).value).toBe("test@example.com");

    // Test password input binding
    await passwordInput.setValue("password123");
    expect((passwordInput.element as HTMLInputElement).value).toBe("password123");
  });

  it("should prevent form submission when fields are empty", async () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router],
      },
    });

    const form = wrapper.find("form");
    const submitButton = wrapper.find('button[type="submit"]');

    // Try to submit empty form
    await submitButton.trigger("click");

    // Form should not be submitted due to HTML5 validation (required attributes)
    const emailInput = wrapper.find('input[type="email"]');
    const passwordInput = wrapper.find('input[type="password"]');

    expect(emailInput.attributes("required")).toBe("");
    expect(passwordInput.attributes("required")).toBe("");
  });

  it("should call handleSubmit when form is submitted with valid data", async () => {
    // Mock console.log to verify it's called
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const wrapper = mount(LoginView, {
      global: {
        plugins: [router],
      },
    });

    const emailInput = wrapper.find('input[type="email"]');
    const passwordInput = wrapper.find('input[type="password"]');
    const form = wrapper.find("form");

    // Fill in the form
    await emailInput.setValue("test@example.com");
    await passwordInput.setValue("password123");

    // Submit the form
    await form.trigger("submit");

    // Verify console.log was called with correct values
    expect(consoleSpy).toHaveBeenCalledWith("Email:", "test@example.com");
    expect(consoleSpy).toHaveBeenCalledWith("Password:", "password123");

    consoleSpy.mockRestore();
  });

  it("should navigate to dashboard after successful form submission", async () => {
    const routerPushSpy = vi.spyOn(router, "push").mockImplementation(() => Promise.resolve());

    const wrapper = mount(LoginView, {
      global: {
        plugins: [router],
      },
    });

    const emailInput = wrapper.find('input[type="email"]');
    const passwordInput = wrapper.find('input[type="password"]');
    const form = wrapper.find("form");

    // Fill in the form
    await emailInput.setValue("user@example.com");
    await passwordInput.setValue("securepassword");

    // Submit the form
    await form.trigger("submit");

    // Verify router.push was called with correct route
    expect(routerPushSpy).toHaveBeenCalledWith("/dashboard");

    routerPushSpy.mockRestore();
  });

  it("should have proper accessibility attributes and responsive classes", () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router],
      },
    });

    // Check accessibility attributes
    const emailInput = wrapper.find('input[type="email"]');
    const passwordInput = wrapper.find('input[type="password"]');
    const emailLabel = wrapper.find('label[for="email-address"]');
    const passwordLabel = wrapper.find('label[for="password"]');

    expect(emailInput.attributes("id")).toBe("email-address");
    expect(passwordInput.attributes("id")).toBe("password");
    expect(emailLabel.classes()).toContain("sr-only");
    expect(passwordLabel.classes()).toContain("sr-only");

    // Check main container classes
    expect(wrapper.find(".container").exists()).toBe(true);
    expect(wrapper.find(".login-card").exists()).toBe(true);
    expect(wrapper.find(".form").exists()).toBe(true);

    // Check if links exist
    const links = wrapper.findAll(".link");
    expect(links.length).toBe(2); // "Forgot password" and "Sign up" links
  });
  
  it("should navigate to sign-up page when clicking the sign-up link", async () => {
    const routerPushSpy = vi.spyOn(router, "push").mockImplementation(() => Promise.resolve());

    const wrapper = mount(LoginView, {
      global: {
        plugins: [router],
      },
    });

    // Find the sign-up link by its text content
    const signUpText = wrapper.find(".signup-text");
    const signUpLink = signUpText.find(".link");

    // Verify the link text
    expect(signUpLink.text()).toBe("Sign up");

    // Click the sign-up link
    await signUpLink.trigger("click");

    // Verify router.push was called with correct route
    expect(routerPushSpy).toHaveBeenCalledWith("/signUp");

    routerPushSpy.mockRestore();
  });
});
