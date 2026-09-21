const { expect } = require('@playwright/test');
const { BasePage } = require('../support/base/BasePage')

require('dotenv').config()

let base

export class PreencherFormularioPage{
    constructor(page){
        this.page=page
        base = new BasePage(this.page);
    }

    async abrirNavegador(url){
        await this.page.goto(url);
        await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveTitle(/demosite/);
    }
}