import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import DashboardView from "../../views/DashboardView.vue";



describe("Testing -> DasboardView", () => {

    it("There must be a title on the screen", () => {
        const wrapper = mount(DashboardView)

        /* Wait for the component to mount and render */
        wrapper.vm.$nextTick()

        /* Check if the title exists */
        const title = wrapper.find('h1')
        expect(title.exists()).toBe(true)
        expect(title.text()).toBe('Pokemon Dashboard')
    })
})