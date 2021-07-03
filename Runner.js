let MaxSize = 3;
let matrixSizeElement;
let matrixStructure = [
    ["zby0", "zby1", "zby2"],
    ["oby0", "oby1", "oby2"],
    ["tby0", "tby1", "tby2"],
];

matrixSizeElement = document.getElementById("MatSize");
matrixSizeElement.onchange = UpdateMatrixSize;


let LinearSolutionElement = document.getElementById("SolveFurther");
LinearSolutionElement.onchange = UpdateBMatrix;

UpdateMatrixSize();

function UpdateMatrixSize() {
    let val = matrixSizeElement.value;
    for(let i=0; i<matrixStructure.length; i++)
    {
        for(let j=0; j<matrixStructure[i].length; j++)
        {
            var loc = document.getElementById(matrixStructure[i][j]);
            loc.disabled = (i >= val || j >= val);
        }
    }
    UpdateBMatrix();
}

function UpdateBMatrix() {
    if(LinearSolutionElement.value == "1")
    {
        document.getElementById("b0").disabled = false;
        document.getElementById("b1").disabled = false;
        document.getElementById("b2").disabled = !(matrixSizeElement.value > 2);
    }
    else
    {
        document.getElementById("b0").disabled = true;
        document.getElementById("b1").disabled = true;
        document.getElementById("b2").disabled = true;
    }
}

//Variables to be used
let fixedLength = 5;
let a = b = c = d = e = f = 0;
let toCheckLength = 5;
let scope;
let equation;
let derivative;
const allConstants = ["a","b", "c", "d", "e", "f"];
let bMatrix = [0,0,0];
let LSolved,USolved;

const keyValue = (input) => Object.entries(input).forEach(([key,value]) => {
    println(key +" = "+ value);
});

function Caculate(Method)
{
    let data = [];
    for(let i=0; i<matrixStructure.length; i++)
    {
        let row = [];
        for(let j=0; j<matrixStructure[i].length; j++)
        {
            var loc = document.getElementById(matrixStructure[i][j]).value;
            row[j] = loc;   
        }
        data[i] = row;
    }

    bMatrix[0] = document.getElementById("b0").value;
    bMatrix[1] = document.getElementById("b1").value;
    bMatrix[2] = document.getElementById("b2").value;


    if(Method.value == 0)
        new DoLittle(matrixSizeElement.value, data);
    else
        new Crout(matrixSizeElement.value, data);

    if(LinearSolutionElement.value == "1")
        new SolveEquation(matrixSizeElement.value);
}

function equationSolve(x)
{
    return math.evaluate(equation, {x}).toFixed(fixedLength);  
}

function getDerivaite()
{
    return math.simplify(math.derivative(equation, "x")).toString();
}

function equationDerivativeSolve(x)
{
    return math.evaluate(derivative, {x}).toFixed(fixedLength);  
}

function clearOutput()
{
    document.getElementById("Output").innerHTML="";
}

function rootResultChecker(value)
{
    //console.log("before ->" + value);
    value = value.toString().slice(0, value.toString().length - (fixedLength - toCheckLength));
    //console.log("after ->" + value);
    value = parseFloat(value);

    if(!(value < 0 || value > 0))
        return true;
    return false;
}

