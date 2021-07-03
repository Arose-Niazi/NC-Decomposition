class SolveEquation {
    constructor(size, data) {

        printHeading("Solving Linear Equation", true, "h1");
        printHeading("Ly = b", true, "h1");

        this.size = size;
        this.data = data;
        this.y = [
            ["y<sub>1</sub>", "=" , bMatrix[0]],
            ["y<sub>2</sub>", "=" , bMatrix[1]],
            ["y<sub>3</sub>", "=" , bMatrix[2]]
        ]

        
        this.printSize([["","L",""]], true);
        this.printSize(LSolved, false);
        this.printSize([["y","=","b"]], true);
        this.printSize(this.y, false);

        math.config({number: 'Fraction'});

        this.y1 = math.fraction(math.divide(bMatrix[0],LSolved[0][0]));
        this.y2 = math.fraction(math.divide(math.subtract(bMatrix[1],math.multiply(LSolved[1][0],this.y1)),LSolved[1][1]));
        this.y3 = math.fraction(math.divide(math.subtract(math.subtract(bMatrix[2],math.multiply(LSolved[2][0],this.y1)), math.multiply(LSolved[2][1],this.y2)),LSolved[2][2]));

        this.ForwardSolution = [
            [
                [
                    LSolved[0][0]+"y<sub>1</sub> = " + bMatrix[0],
                    "y<sub>1</sub> = " + this.y1.toFraction(),
                    LSolved[1][0]+"y<sub>1</sub> + "+LSolved[1][1]+"y<sub>2</sub> = " + bMatrix[1],
                    LSolved[2][0]+"y<sub>1</sub> + "+ LSolved[2][1]+"y<sub>2</sub> + "+LSolved[2][2]+"y<sub>3</sub> = " + bMatrix[2]
                ]
            ],
            [
                [
                    LSolved[1][0]+"y<sub>1</sub> + "+LSolved[1][1]+"y<sub>2</sub> = " + bMatrix[1],
                    `${LSolved[1][0]}(${this.y1.toFraction()}) + ${LSolved[1][1]}y<sub>2</sub> = ` + bMatrix[1],
                    `${math.multiply(LSolved[1][0],this.y1).toFraction()} + y<sub>2</sub> = ` + bMatrix[1],
                    `${LSolved[1][1]}y<sub>2</sub> =  ${bMatrix[1]} -  ${math.multiply(LSolved[1][0],this.y1).toFraction()}`,
                    `${LSolved[1][1]}y<sub>2</sub> = ${math.subtract(bMatrix[1],math.multiply(LSolved[1][0],this.y1)).toFraction()}`,
                    `y<sub>2</sub> = ${this.y2}`
                ],
            ],
            [
                [
                    LSolved[2][0]+"y<sub>1</sub> + "+ LSolved[2][1]+"y<sub>2</sub> + "+LSolved[2][2]+"y<sub>3</sub> = " + bMatrix[2],
                    `${LSolved[2][0]}(${this.y1.toFraction()}) + ${LSolved[2][1]}(${this.y2.toFraction()}) + ${LSolved[2][2]}y<sub>3</sub> = ${bMatrix[2]}`,
                    `${math.multiply(LSolved[2][0],this.y1).toFraction()} + ${math.multiply(LSolved[2][1],this.y2).toFraction()} + ${LSolved[2][2]}y<sub>3</sub>  = ${bMatrix[2]}`,
                    `${math.add(math.multiply(LSolved[2][0],this.y1),math.multiply(LSolved[2][1],this.y2)).toFraction()} + ${LSolved[2][2]}y<sub>3</sub>  = ${bMatrix[2]}`,
                    `${LSolved[2][2]}y<sub>3</sub> =  ${bMatrix[2]} -  ${math.add(math.multiply(LSolved[2][0],this.y1),math.multiply(LSolved[2][1],this.y2)).toFraction()}`,
                    `${LSolved[2][2]}y<sub>3</sub> = ${math.subtract(math.subtract(bMatrix[2],math.multiply(LSolved[2][0],this.y1)), math.multiply(LSolved[2][1],this.y2)).toFraction()}`,
                    `y<sub>3</sub> = ${this.y3}`
                ],
            ]
        ]

        for(let i=0; i<this.ForwardSolution.length; i++)
        {
            if(i >= this.size) break;
            println("<hr>")
            for(let j=0; j<this.ForwardSolution[i].length; j++)
            {
                if(j >= this.size) break;
                for(let k=0; k<this.ForwardSolution[i][j].length; k++)
                    println(this.ForwardSolution[i][j][k]);

                println("<br>")
            }
        }

        printHeading("Ux = y", true, "h1");
        this.x = [
            ["x<sub>1</sub>", "=" , this.y1],
            ["x<sub>2</sub>", "=" , this.y2],
            ["x<sub>3</sub>", "=" , this.y3]
        ]

        
        this.printSize([["","U",""]], true);
        this.printSize(USolved, false);
        this.printSize([["x","=","y"]], true);
        this.printSize(this.x, false);

        this.x3 = math.fraction(math.divide(this.y3,USolved[2][2]));
        this.x2 = math.fraction(math.divide(math.subtract(this.y2,math.multiply(USolved[1][2],this.x3)),USolved[1][1]));
        this.x1 = math.fraction(math.divide(math.subtract(this.y1,math.add(math.multiply(USolved[0][1],this.x2),math.multiply(USolved[0][2],this.x3))), USolved[0][0]));

        this.BackwardSolution = [
            [
                [
                    USolved[0][0]+"x<sub>1</sub> + "+ USolved[0][1]+"x<sub>2</sub> +"+USolved[0][2]+"x<sub>3</sub> = " + this.y1,
                    USolved[1][1]+"x<sub>2</sub> + "+ USolved[1][2]+"x<sub>3</sub> = " + this.y2,
                    USolved[2][2]+"x<sub>3</sub> = " + this.y3,
                    "x<sub>3</sub> = " + this.x3.toFraction(),
                ]
            ],
            [
                [
                    USolved[1][1]+"x<sub>2</sub> + "+ USolved[1][2]+"x<sub>3</sub> = " + this.y2,
                    `${USolved[1][1]}x<sub>2</sub> + ${USolved[1][2]}(${this.x3.toFraction()}) = ${this.y2}`,
                    `${USolved[1][1]}x<sub>2</sub> + ${math.fraction(math.multiply(USolved[1][2],this.x3)).toFraction()} = ${this.y2}`,
                    `${USolved[1][1]}x<sub>2</sub> = ${this.y2} - ${math.fraction(math.multiply(USolved[1][2],this.x3)).toFraction()}`,
                    `${USolved[1][1]}x<sub>2</sub> = ${math.fraction(math.subtract(this.y2,math.multiply(USolved[1][2],this.x3))).toFraction()}`,
                    `x<sub>2</sub> = ${this.x2.toFraction()}`,
                ],
            ],
            [
                [
                    USolved[0][0]+"x<sub>1</sub> + "+ USolved[0][1]+"x<sub>2</sub> +"+USolved[0][2]+"x<sub>3</sub> = " + this.y1.toFraction(),
                    `${USolved[0][0]}x<sub>1</sub> + ${USolved[0][1]}(${this.x2.toFraction()}) + ${USolved[0][2]}(${this.x3.toFraction()}) = ${this.y1.toFraction()}`,
                    `${USolved[0][0]}x<sub>1</sub> + ${math.multiply(USolved[0][1],this.x2).toFraction()} + ${math.multiply(USolved[0][2],this.x3).toFraction()} = ${this.y1.toFraction()}`,
                    `${USolved[0][0]}x<sub>1</sub> + ${math.add(math.multiply(USolved[0][1],this.x2),math.multiply(USolved[0][2],this.x3)).toFraction()} = ${this.y1.toFraction()}`,
                    `${USolved[0][0]}x<sub>1</sub> = ${this.y1.toFraction()} - ${math.add(math.multiply(USolved[0][1],this.x2),math.multiply(USolved[0][2],this.x3)).toFraction()}`,
                    `${USolved[0][0]}x<sub>1</sub> = ${math.subtract(this.y1,math.add(math.multiply(USolved[0][1],this.x2),math.multiply(USolved[0][2],this.x3))).toFraction()}`,
                    `x<sub>1</sub> = ${this.x1.toFraction()}`,
                ],
            ]
        ]

        for(let i=0; i<this.BackwardSolution.length; i++)
        {
            if(i >= this.size) break;
            println("<hr>")
            for(let j=0; j<this.BackwardSolution[i].length; j++)
            {
                if(j >= this.size) break;
                for(let k=0; k<this.BackwardSolution[i][j].length; k++)
                    println(this.BackwardSolution[i][j][k]);

                println("<br>")
            }
        }

        printHeading("The solution is", true, "h3");
        createTable(["x"], true);
        addTableRow([this.x1.toFraction(), this.x2.toFraction(), this.x3.toFraction()], false);
    }

    printSize(data, heading = false)
    {
        for(let i=0; i<data.length; i++)
        {
            if(i >= this.size) break;
            var dis = []
            for(let j=0; j<data[i].length; j++)
            {
                if(j >= this.size) break;
                dis[j] = data[i][j];
            }
            if(heading)
                createTable(dis);
            else
                addTableRow(dis);
        }
    }

    printWithData(data, heading = false)
    {
        for(let i=0; i<data.length; i++)
        {
            if(i >= this.size) break;
            var dis = []
            for(let j=0; j<data[i].length; j++)
            {
                if(j >= this.size) break;
                dis[j] = data[i][j]+" = "+ this.data[i][j];
            }
            if(heading)
                createTable(dis);
            else
                addTableRow(dis);
        }
    }

}
