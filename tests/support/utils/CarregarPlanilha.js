import * as fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';

const excelFolderPath = 'test-data' + path.sep;

/*
  Como ler dados de teste de um arquivo Excel em JavaScript (para usar no Playwright/Cypress/etc.)
  
  https://www.youtube.com/watch?v=XJB39OOnHj0

  https://github.com/ViacheslavBulba/playwright-page-object-example
*/

export function readDataFromExcelFile(dirName, tabNumber) {
  let fullPath = ''
  console.log("Diretório externo da Variável de Ambiente CENARIOS: ", dirName)

  if(typeof dirName != "undefined"){
    fullPath = dirName + path.sep + process.env.NOME_PLANILHA;

    if (!fs.existsSync(fullPath)) {
      throw new Error(`Não foi encontrado o diretório ou o arquivo ${fullPath} informadas
        na variável de ambiente CENARIOS. Verifique se o caminho ou nome do arquivo estão 
        corretos!`);
    }
  }else{
    fullPath = excelFolderPath + process.env.NOME_PLANILHA;

    if (!fs.existsSync(fullPath)) {
      throw new Error(`Não é possível encontrar o arquivo ${fullPath}. Verificar 
        se o caminho ou nome do arquivo estão corretos!`);
    }
  }

  console.log(`Lendo arquivo ${fullPath}`)

  const workbook = XLSX.readFile(fullPath);
  const dataFromFirstSheet = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[tabNumber]]);
  return dataFromFirstSheet;
}
