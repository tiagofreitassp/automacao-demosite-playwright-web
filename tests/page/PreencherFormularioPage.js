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
        await this.page.goto(url, { waitUntil: 'networkidle' });
        await expect(this.page).toHaveTitle(/demosite/);
    }

    async preencherFormulario(FIRST_NAME, LAST_NAME, EMAIL, GENDER, MOBILE_NUMBER, DAY_OF_BIRTH, MONTH_OF_BIRTH, YEAR_OF_BIRTH, SUBJECTS, HOBBIES, PICTURE, ADDRESS, STATE, CITY){
        await this.validarTituloFormulario();
        await this.validarSubtituloFormulario();
        await this.inserirPrimeiroNome(FIRST_NAME);
        await this.inserirUltimoNome(LAST_NAME);
        await this.inserirEmail(EMAIL);
        await this.inserirGenero(GENDER);
        await this.inserirNumeroCelular(MOBILE_NUMBER);
        await this.inserirDataDeNascimento(DAY_OF_BIRTH, MONTH_OF_BIRTH, YEAR_OF_BIRTH);
        //await this.inserirSubjects(SUBJECTS);
        await this.inserirHobbies(HOBBIES);
        //await this.inserirPicture(PICTURE);
        await this.inserirAddress(ADDRESS);
        await this.inserirState(STATE);
        await this.inserirCity(CITY);
    }

    async validarTituloFormulario(){
        await base.toBeVisible('//h1[normalize-space(text())=\'Practice Form\']');
    }

    async validarSubtituloFormulario(){
        await base.toBeVisible('//h5[normalize-space(text())=\'Student Registration Form\']');
    }

    async inserirPrimeiroNome(FIRST_NAME){
        await base.fill('//input[@id=\'firstName\']', FIRST_NAME);
    }
    
    async inserirUltimoNome(LAST_NAME){
        await base.fill('//input[@id=\'lastName\']', LAST_NAME);
    }
    
    async inserirEmail(EMAIL){
        await base.fill('//input[@id=\'userEmail\']', EMAIL);
    }

    async inserirGenero(GENDER){
        await base.click(`//input[@name='gender' and @value='${GENDER}']`);
    }

    async inserirNumeroCelular(MOBILE_NUMBER){
        await base.fill('#userNumber', MOBILE_NUMBER.toString());
    }

    async inserirDataDeNascimento(DAY_OF_BIRTH, MONTH_OF_BIRTH, YEAR_OF_BIRTH){
        await base.click('#dateOfBirthInput');
        await base.selectOption('.react-datepicker__month-select', `${MONTH_OF_BIRTH}`);
        await base.selectOption('.react-datepicker__year-select', `${YEAR_OF_BIRTH}`);
        await base.click(`.react-datepicker__day--0${DAY_OF_BIRTH}`);
    }

    async inserirSubjects(SUBJECTS){
        await base.fill('#subjectsInput', SUBJECTS);
    }

    async inserirHobbies(HOBBIES){
        for(const hobby of HOBBIES.split(',')){
            await base.click(`//label[normalize-space(text())='${hobby.trim()}']`);
        }
    }

    async inserirPicture(PICTURE){
        await base.setInputFiles('//input[@id=\'uploadPicture\']', PICTURE);
    }

    async inserirAddress(ADDRESS){
        await base.fill('//textarea[@id=\'currentAddress\']', ADDRESS);
    }

    async inserirState(STATE){
        await base.click('//div[@id=\'state\']');
        await base.click(`//div[@id='state']//div[text()='${STATE}']`);
    }

    async inserirCity(CITY){
        await base.click('//div[@id=\'city\']');
        await base.click(`//div[@id='city']//div[text()='${CITY}']`);
    }

    async clicarBotaoSubmit(){
        await base.click('#submit');
    }

    async validarFormularioSubmetido(FIRST_NAME, LAST_NAME, EMAIL, GENDER, MOBILE_NUMBER, DAY_OF_BIRTH, MONTH_OF_BIRTH, YEAR_OF_BIRTH, SUBJECTS, HOBBIES, PICTURE, ADDRESS, STATE, CITY){
        await base.toBeVisible(`//td[normalize-space(text())='${FIRST_NAME} ${LAST_NAME}']`);
        await base.toBeVisible(`//td[normalize-space(text())='${EMAIL}']`);
        await base.toBeVisible(`//td[normalize-space(text())='${GENDER}']`);
        await base.toBeVisible(`//td[normalize-space(text())='${MOBILE_NUMBER}']`);
        await base.toBeVisible(`//td[normalize-space(text())='${DAY_OF_BIRTH} ${MONTH_OF_BIRTH},${YEAR_OF_BIRTH}']`);
        //await base.toBeVisible(`//td[normalize-space(text())='${SUBJECTS}']`);
        await base.toBeVisible(`//td[normalize-space(text())='${HOBBIES}']`);
        //await base.toBeVisible(`//td[normalize-space(text())='${PICTURE}']`);
        await base.toBeVisible(`//td[normalize-space(text())='${ADDRESS}']`);
        await base.toBeVisible(`//td[normalize-space(text())='${STATE} ${CITY}']`);
    }
}