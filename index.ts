#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { titleTimer } from "./src/_AppTitle.js";

// counting no of words in a paragraph
class _wordCounter{

  constructor(){
    this.Run()
  }

  // runing the whole app
  async  Run() {
    await this.AppTitle();
    await this.Main();
  }

  // autor watermark on app at the begening
  private async AppTitle(): Promise<void> {
    const title = chalkAnimation.neon(`__________________Welcome to M.B Word Counter App__________________`);
    await titleTimer();
    title.stop();
    console.log(chalk.bgRed.italic(`                                                             Autor:"M.B"`));
    return;
  }

  private async Main(){
    await this.UserInput()
    // continue or exit
    const continueORexit=await inquirer.prompt([{
      type:"confirm",
      name:"runORexit",
      message:"Press Y to Countinue OR any key to exit"
    }]);
    if(continueORexit.runORexit===true){
      await this.Main()
    }else{
      console.log(chalk.bgCyan("                    Thanks for Using M.B Word Counter App                          "));
      
    }
  }

  private async UserInput():Promise<void>{
    // getting user input
    const userInput=await inquirer.prompt([{
        type:"input",
        name:"inputWord",
        validate:function inputNotEmpty(input:string):string|boolean{
          if(input.length===0){
            return "Please Enter some text to continue"
          }
          return true
        }
    }]);
    let paragraph=userInput.inputWord
    // converting string to array and counting the length of true returned by fillter
    function countWords(paragraph:string):number{
      return paragraph.split(' ').filter(function(num) {
       return num != ''
      }).length;
     }
    //displaying word count in paragraph  
     if(paragraph.length!==0){
      console.log(chalk.green(`Total Words Count: ${countWords(paragraph)}`));
     }
  
   
  }



}

let run=new _wordCounter();