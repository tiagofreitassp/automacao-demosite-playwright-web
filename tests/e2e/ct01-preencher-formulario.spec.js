// @ts-check
const { test, expect } = require('@playwright/test');
const { PreencherFormularioPage } = require('../page/PreencherFormularioPage');

import { readDataFromExcelFile } from '../support/utils/CarregarPlanilha';

require('dotenv').config()

const ExcelDataProvider = readDataFromExcelFile(process.env.CENARIOS, 0)

let preencherFormularioPage;
var num = 0;

for (const lineFromExcel of ExcelDataProvider) {
    if(lineFromExcel.EXECUTE == 'Sim'){
        test.beforeEach(async ({}, testInfo) => {
            // You can access testInfo.retry in any hook or fixture.
            if (testInfo.retry > 0)
              console.log(`Retrying!`);
        });

        test(`${lineFromExcel.ID} - ${lineFromExcel.CENARIO} ${num++}`, 
            {
                tag: [
                    '@ct01',
                    '@regressivo',
                    '@form'
                ],
            }, async ({ page }) => {

            preencherFormularioPage = new PreencherFormularioPage(page);
            await preencherFormularioPage.abrirNavegador(process.env.BASE_URL);
            await preencherFormularioPage.preencherFormulario(
                lineFromExcel.FIRST_NAME,
                lineFromExcel.LAST_NAME,
                lineFromExcel.EMAIL,
                lineFromExcel.GENDER,
                lineFromExcel.MOBILE_NUMBER,
                lineFromExcel.DAY_OF_BIRTH,
                lineFromExcel.MONTH_OF_BIRTH,
                lineFromExcel.YEAR_OF_BIRTH,
                lineFromExcel.SUBJECTS,
                lineFromExcel.HOBBIES,
                lineFromExcel.PICTURE,
                lineFromExcel.ADDRESS,
                lineFromExcel.STATE,
                lineFromExcel.CITY
            );
            await preencherFormularioPage.clicarBotaoSubmit();
            await preencherFormularioPage.validarFormularioSubmetido(
                lineFromExcel.FIRST_NAME,
                lineFromExcel.LAST_NAME,
                lineFromExcel.EMAIL,
                lineFromExcel.GENDER,
                lineFromExcel.MOBILE_NUMBER,
                lineFromExcel.DAY_OF_BIRTH,
                lineFromExcel.MONTH_OF_BIRTH,
                lineFromExcel.YEAR_OF_BIRTH,
                lineFromExcel.SUBJECTS,
                lineFromExcel.HOBBIES,
                lineFromExcel.PICTURE,
                lineFromExcel.ADDRESS,
                lineFromExcel.STATE,
                lineFromExcel.CITY
            );
        });
    }
}