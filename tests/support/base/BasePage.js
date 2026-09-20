const { expect } = require('@playwright/test');

export class BasePage{

    constructor(page){
        this.page=page
    }

    async changeBorderElement(element){
        await element.evaluate(node => node.style.border = "4px, solid, #FF0000");
    }

    async goTo(url){
        await this.page.goto(url);
    }

    async click(element){
        const el = this.page.locator(element)
        await this.changeBorderElement(el)
        await el.click()
    }

    async clickForce(element){
        const el = this.page.locator(element)
        await this.changeBorderElement(el)
        await el.click({force: true})
    }

    async fill(element,text){
        const el = this.page.locator(element)
        await this.changeBorderElement(el)
        await el.fill(text)
    }

    async toBeVisible(element) {
        const el = this.page.locator(element)
        await expect(el).toBeVisible();
        await this.changeBorderElement(el)
    }

    async isVisible(element) {
        return await this.page.locator(element).isVisible()
    }

    async toHaveText(element,text) {
        const el = this.page.locator(element)
        await expect(el).toHaveText(text);
        await this.changeBorderElement(el)
    }

    async toHaveTitle(text) {
        await expect(this.page).toHaveTitle(text);
        await this.changeBorderElement(el)
    }

    async toContainText(element,text){
        const el = this.page.locator(element)
        await expect(el).toContainText(text);
        await this.changeBorderElement(el)
    }

    async selectOption(element,text){
        const el = this.page.locator(element)
        await this.changeBorderElement(el)
        await el.selectOption(text);
    }

    async clear(element){
        const el = this.page.locator(element)
        await this.changeBorderElement(el)
        await el.clear()
    }

    async innerText(element){
        const el = this.page.locator(element)
        await this.changeBorderElement(el)
        return await el.innerText()
    }

    async scrollIntoViewIfNeeded(element){
        await this.page.locator(element).scrollIntoViewIfNeeded();
    }

    async scrollToTheBottomOfThePage(){
        //rolar até o final da página
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    }

    async scroll(inicio,fim){
        await this.waitForTimeout(2000)
        await this.page.evaluate(() => window.scrollBy(inicio,fim));
        await this.waitForTimeout(2000)
    }

    async waitForTimeout(seconds){
        await this.page.waitForTimeout(seconds)
    }

    async waitForLoadState(state){
        await this.page.waitForLoadState(state)
    }

    async waitFor(element){
        await this.page.locator(element).waitFor();
    }

    async press(element,command){
        await this.page.locator(element).press(command);
    }

    async highlight(element){
        await this.page.locator(element).highlight()
    }
}