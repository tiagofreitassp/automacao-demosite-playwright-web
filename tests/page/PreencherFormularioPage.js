const { expect } = require('@playwright/test');
const { BasePage } = require('../support/base/BasePage')

require('dotenv').config()

let base

export class PreencherFormularioPage{
    constructor(page){
        this.page=page
        base = new BasePage(this.page);
    }
}