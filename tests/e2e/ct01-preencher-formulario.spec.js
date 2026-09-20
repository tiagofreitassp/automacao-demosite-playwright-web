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
        //
    }
}