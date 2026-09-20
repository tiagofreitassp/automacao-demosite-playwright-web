// @ts-check
const { test, expect } = require('@playwright/test');
const { PreencherFormularioPage } = require('../page/PreencherFormularioPage');

import { readDataFromExcelFile } from '../support/utils/CarregarPlanilha';

require('dotenv').config()

const ExcelDataProvider = readDataFromExcelFile(process.env.CENARIOS, 0)

let preencherFormularioPage;
var num = 0;

for (const lineFromExcel of ExcelDataProvider) {
    if(lineFromExcel.Execute == 'Sim'){
        test.beforeEach(async ({}, testInfo) => {
            // You can access testInfo.retry in any hook or fixture.
            if (testInfo.retry > 0)
              console.log(`Retrying!`);
        });

        test(`${lineFromExcel.Epico} - ${lineFromExcel.Tarefa} - ${lineFromExcel.Cenario} ${num++}`, 
            {
                tag: [
                    '@form',
                    '@regressivo',
                    '@cenario1'
                ],
            }, async ({ page }) => {

            preencherFormularioPage = new PreencherFormularioPage(page);
        });
    }
}