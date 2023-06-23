var c1;
var c2;
var arr=[];

console.log(arr);
function display(x)
{
    c1=document.getElementById("console").value;
    c1+=x.value;
    arr = Array.from(c1);
    document.getElementById("console").value=c1;
    console.log(arr);
}

function del()
{
    arr.pop();
    var temp="";
    for(let i=0;i<arr.length;i++){
        temp+=arr[i];
    }
    document.getElementById("console").value=temp;
    console.log(arr);
}

function clr(){
    arr=[];
    document.getElementById("console").value="";
    console.log(arr);
}

function eval(){
    c1=document.getElementById("console").value;
    const regex=/([-+*/^()])/g;
    arr=c1.split(regex).filter(Boolean);
    console.log(arr);
    function isOperator(char){
        return ['+', '-', '*', '/','^'].includes(char);
    }
  
    function getPrecedence(operator){
        switch(operator) {
            case '+':
            case '-':
                return 1;
            case '*':
            case '/':
                return 2;
            case '^':
                return 3;
            default:
                return 0;
        }
    }
  
    function applyOperator(operator, op1, op2) {
        switch (operator) {
            case '+':
                return op1+op2;
            case '-':
                return op1-op2;
            case '*':
                return op1*op2;
            case '/':
                return op1/op2;
            case '^':
                return Math.pow(op1,op2);
            default:
                return 0;
        }
    }

    const output=[];
    const stack=[];
  
    arr.forEach((e) => {
        if (isOperator(e)) {
            while (
                stack.length > 0 &&
                isOperator(stack[stack.length - 1]) &&
                getPrecedence(e) <= getPrecedence(stack[stack.length - 1])
                ){
                    const operator=stack.pop();
                    const op2=output.pop();
                    const op1=output.pop();
                    const result=applyOperator(operator, op1, op2);
                    output.push(result);
            }
            stack.push(e);
        }
        else if (e==='('){
            stack.push(e);
        }
        else if (e===')'){
            while (stack.length>0 && stack[stack.length - 1]!=='('){
                    const operator=stack.pop();
                    const op2=output.pop();
                    const op1=output.pop();
                    const result=applyOperator(operator, op1, op2);
                    output.push(result);
            }
            stack.pop();
      }
      else{
            output.push(parseFloat(e));
      }
    });
  
    while(stack.length>0){
        const operator=stack.pop();
        const op2=output.pop();
        const op1=output.pop();
        const result=applyOperator(operator, op1, op2);
        output.push(result);
    }

    c2=output[0];
    document.getElementById("console").value=output[0];
    document.getElementById("answer").value=output[0];

    console.log(c2);
}
