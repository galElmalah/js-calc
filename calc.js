
document.getElementById("keys").addEventListener('click', (e) => {
  if (e.target.nodeName =="BUTTON"){
    let clear = null;
    const keyVal = e.target.textContent;
    // pass the clear screen variable
    if (e.target.id === "clear"){
      clear = true;
    }
    displayOnScreen(keyVal, clear);
  }
})

function calculate(expr){
  let expression  = expr.split(" ");
  
  if(expression.length % 2 == 0){
    throw "Bad input Error";
  }
  const operators = {
    "+":(x,y)=> Number(x)+Number(y),
    "-":(x,y)=> Number(x)-Number(y),
    "*":(x,y)=> Number(x)*Number(y),
    "/":(x,y)=> Number(x)/Number(y)
  }
  if(expression.length > 3  ){
    expression = calcPriority(expression);
  }
  while(expression.length > 3){
    expression[2] = operators[expression[1]](expression[0],expression[2]); 
    expression = expression.slice(2);
  }
  
    console.log(expression);

  return operators[expression[1]](expression[0],expression[2])
}

function displayOnScreen(val, clear = null){
  const screen = document.getElementById("screen");
  const operators = {
    "+":true,
    "-":true,
    "*":true,
    "/":true
  };
  if( clear ) {
    screen.textContent = "";
    return;
  }
  
  if ( val === "="){
    const calcValue = calculate(screen.textContent);
    screen.textContent = calcValue;
    return;
  }
  if( val in operators){
    screen.textContent += " " + val + " ";
    return;
  }
  screen.textContent += val;
}

function calcPriority(expression) {
  const operators = {
    "+":(x,y)=> Number(x)+Number(y),
    "-":(x,y)=> Number(x)-Number(y),
    "*":(x,y)=> Number(x)*Number(y),
    "/":(x,y)=> Number(x)/Number(y)
  }
  for(let i=0 ; i<expression.length;i++){
    if(expression[i+1] == "/" || expression[i+1]=="*"){
      expression[i] = operators[expression[i+1]](expression[i],expression[i+2]);
      expression.splice(i+1,2);
      i-=2;
      console.log(expression);
      if(expression.length === 3){
        break;
      }
    }
  }
  return expression;
}

calculate("7 + 7 * 7 * 5");