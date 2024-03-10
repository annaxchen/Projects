//testing syncronous For Loop
console.log(`I'm learning about`);

for (let idx=0; idx < 999999999; idx++) {}

// The second console.log() statement is
// delayed by the for loop's execution
console.log("the Event Loop");

//testing Event Loops
console.log(`I’m learning about`);
//Set Timeout
setTimeout(() => { console.log("Event Loop");}, 2000);
console.log("the");

//testing more Event Loops
console.log("This is the first line of code in app.js.");
//added to the stack, executes, then pops off stack.

function usingsetTimeout() {
    console.log("I'm going to be queued in the Event Loop.");
}
setTimeout(usingsetTimeout, 3000);
//callback is passed to be executed by web API.Timer runs for 3 seconds (3000 milisecs) and then function usingsetTimeout is pushed into the Event Queue
//Timeout is added to the stack

console.log("This is the last line of code in app.js.");

///////////
//different exercise
const shopForBeans = () => {
    return new Promise((resolve, reject) => {
      const beanTypes = ['kidney', 'fava', 'pinto', 'black', 'garbanzo'];
      setTimeout(() => {
        let randomIndex = Math.floor(Math.random() * beanTypes.length);
        let beanType = beanTypes[randomIndex];
        console.log(`2. I bought ${beanType} beans because they were on sale.`);
        resolve(beanType);
      }, 1000);
    });
  }
   
  async function getBeans() {
    console.log(`1. Heading to the store to buy beans...`);
    let value = await shopForBeans();
    console.log(`3. Great! I'm making ${value} beans for dinner tonight!`);
  }
   
  getBeans();
  console.log("Describe what happens with this `console.log()` statement as well.");