import readline from 'node:readline';
import fs from 'fs'
import { resolve } from 'path';
import { createEJSFile, createSCSSFile, updateMainSCSS } from './utils/utils';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Придумайте название компонента: ', (componentName) => {
  const 
    ejsDir = resolve(`${process.cwd()}/src/ejs/components`, componentName),
    scssDir = resolve(`${process.cwd()}/src/assets/styles/`)
   
    if(fs.existsSync(ejsDir)) 
    {
        console.log(`Ошибка: Компонент ${componentName} уже существует!`);
        
        rl.close()
        return
    }

    createSCSSFile({scssDir, componentName, fs})
    createEJSFile({ejsDir, componentName, fs})
    updateMainSCSS({scssDir, componentName, fs})
    

    console.log(`Компонент ${componentName} создан!`)
    rl.close()
});