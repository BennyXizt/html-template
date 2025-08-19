import readline from 'node:readline';
import fs from 'fs'
import { resolve } from 'path';
import { createEJSFile, createSCSSFile, updateMainEJSFile, updateMainSCSS, updateTestEJSFile } from './utils/utils';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Придумайте название секции: ', (componentName) => {
  const 
    ejsDir = resolve(process.cwd(), "src/ejs"),
    scssDir = resolve(process.cwd(), "src/assets/styles"),
    blockType = 'layout'
   
    if(fs.existsSync(`${ejsDir}/${blockType}/${componentName}`)) 
    {
        console.log(`Ошибка: Секция ${componentName} уже существует!`);
        
        rl.close()
        return
    }

    createSCSSFile({scssDir, blockType, componentName, fs})
    createEJSFile({ejsDir, blockType, componentName, fs})
    updateMainSCSS({scssDir, blockType, componentName, fs})
    updateMainEJSFile({ejsDir, componentName, fs})
    
    console.log(`Секция ${componentName} создана!`)
    rl.close()
});