class Crout {
    constructor(size, data) {

        printHeading("Crout's Method", true, "h1");

        this.size = size;
        this.data = data;
        this.L = [
            ["L<sub>11</sub>",0,0],
            ["L<sub>21</sub>", "L<sub>22</sub>", 0],
            ["L<sub>31</sub>", "L<sub>32</sub>", "L<sub>33</sub>"],
        ];

        this.U = [
            [1,"U<sub>12</sub>","U<sub>13</sub>"],
            [0,1,"U<sub>23</sub>"],
            [0,0,1]
        ];

        this.LxU = [
            ["L<sub>11</sub>","L<sub>11</sub>U<sub>12</sub>","L<sub>11</sub>U<sub>13</sub>"],
            ["L<sub>21</sub>","L<sub>21</sub>U<sub>12</sub>+L<sub>22</sub>","L<sub>21</sub>U<sub>13</sub>+L<sub>22</sub>U<sub>23</sub>"],
            ["L<sub>31","L<sub>31</sub>U<sub>12</sub>+L<sub>32</sub>","L<sub>31</>U<sub>13</sub>+L<sub>32</sub>U<sub>23</sub>+L<sub>33</sub>"]
        ]
        
        this.printSize([["","L",""]], true);
        this.printSize(this.L, false);
        
        this.printSize([["","U",""]], true);
        this.printSize(this.U, false);

        this.printSize([["","A = LxU",""]], true);
        this.printSize(this.LxU, false);
    
        this.printSize([["","Equations",""]], true);
        this.printWithData(this.LxU, false);

        math.config({number: 'Fraction'});

        this.L11 = data[0][0];
        this.L21 = data[1][0];
        this.L31 = data[2][0];
        this.U12 = math.evaluate(this.data[0][1]+"/"+this.L11);
        this.L22 = math.fraction(math.subtract(this.data[1][1], math.multiply(this.L21, this.U12)));
        this.L32 = math.fraction(math.subtract(this.data[2][1], math.multiply(this.L31, this.U12)));
        this.U13 = math.fraction(math.divide(this.data[0][2],this.L11));
        this.U23 = math.fraction(math.divide(math.subtract(this.data[1][2],math.multiply(this.L21,this.U13)),this.L22));
        this.L33 = math.subtract(this.data[2][2],math.add(math.multiply(this.L31, this.U13),math.multiply(this.L32, this.U23)));
        this.LSolved = [
            [this.L11,0,0],
            [this.L21, this.L22.toFraction(), 0],
            [this.L31, this.L32.toFraction(), this.L33.toFraction()],
        ];

        this.USolved = [
            [1,this.U12.toFraction(),this.U13.toFraction()],
            [0,1,this.U23.toFraction()],
            [0,0,1]
        ];

        this.LxUSolution = [
            [
                ["L<sub>11</sub> = " + this.L11],
                ["L<sub>21</sub> = " + this.L21],
                ["L<sub>31</sub> = " + this.L31]
            ],
            [
                [
                    "L<sub>11</sub>U<sub>12</sub> = " + this.data[0][1],
                    `(${this.L11})U<sub>12</sub> = ` + this.data[0][1],
                    `U<sub>12</sub> = ` + this.data[0][1]+`/${this.L11}`,
                    `U<sub>12</sub> = ` + this.U12.toFraction()
                ],
                [
                    "L<sub>21</sub>U<sub>12</sub>+L<sub>22</sub> = " + this.data[1][1],
                    `(${this.L21})(${this.U12.toFraction()})+L<sub>22</sub> = ` + this.data[1][1],
                    math.fraction(math.multiply(this.L21, this.U12)).toFraction()+` + L<sub>22</sub> = ` + this.data[1][1],
                    `L<sub>22</sub> = ` + this.data[1][1]+" - "+math.fraction(math.multiply(this.L21, this.U12)).toFraction(),
                    `L<sub>22</sub> = ` + this.L22.toFraction()
                ],
                [
                    "L<sub>31</sub>U<sub>12</sub>+L<sub>32</sub> = " + this.data[2][1],
                    `(${this.L31})(${this.U12.toFraction()})+U<sub>23</sub> = ` + this.data[2][1],
                    math.fraction(math.multiply(this.L31, this.U12)).toFraction()+` + L<sub>32</sub> = ` + this.data[2][1],
                    `L<sub>32</sub> = ` + this.data[2][1]+"-"+math.fraction(math.multiply(this.L31, this.U12)).toFraction(),
                    `L<sub>32</sub> = ` + this.L32.toFraction()
                ]
            ],
            [
                [
                    "L<sub>11</sub>U<sub>13</sub> = " + this.data[0][2],
                    `(${this.L11})U<sub>13</sub> = ` + this.data[0][2],
                    `U<sub>13</sub> = ` + this.U13.toFraction()
                ],
                [
                    "L<sub>21</sub>U<sub>13</sub>+L<sub>22</sub>U<sub>23</sub> = " + this.data[1][2],
                    `(${this.L21})(${this.U13.toFraction()})+(${this.L22.toFraction()})U<sub>23</sub> = ` + this.data[1][2],
                    math.fraction(math.multiply(this.L21, this.U13)).toFraction()+` + (${this.L22.toFraction()})U<sub>23</sub> = ` + this.data[1][2],
                    `(${this.L22.toFraction()})U<sub>23</sub> = ` + this.data[1][2]+"-"+math.fraction(math.multiply(this.L21, this.U13)).toFraction(),
                    `U<sub>23</sub> = ` + this.U23.toFraction()
                ],
                [
                    "L<sub>31</sub>U<sub>13</sub>+L<sub>32</sub>U<sub>23</sub>+L<sub>33</sub> = " + this.data[2][2],
                    `(${this.L31})(${this.U13.toFraction()})+(${this.L32.toFraction()})(${this.U23.toFraction()})+L<sub>33</sub> = ` + this.data[2][2],
                    `${math.multiply(this.L31, this.U13).toFraction()} + ${math.multiply(this.L32, this.U23).toFraction()} +L<sub>33</sub> = ` + this.data[2][2],
                    `${math.add(math.multiply(this.L31, this.U13),math.multiply(this.L32, this.U23)).toFraction()} + L<sub>33</sub> = ` + this.data[2][2],
                    `L<sub>33</sub> = ${this.data[2][2]} - ${math.add(math.multiply(this.L31, this.U13),math.multiply(this.L32, this.U23)).toFraction()}`,
                    `L<sub>33</sub> = ${math.subtract(this.data[2][2],math.add(math.multiply(this.L31, this.U13),math.multiply(this.L32, this.U23))).toFraction()}`,
                    `L<sub>33</sub> = ` + this.L33.toFraction()
                ],
            ]
        ]

        for(let i=0; i<this.LxUSolution.length; i++)
        {
            if(i >= this.size) break;
            println("<hr>")
            for(let j=0; j<this.LxUSolution[i].length; j++)
            {
                if(j >= this.size) break;
                for(let k=0; k<this.LxUSolution[i][j].length; k++)
                    println(this.LxUSolution[i][j][k]);

                println("<br>")
            }
        }

        printHeading("L and U after Crout's Method", true, "h3");
        this.printSize([["","L",""]], true);
        this.printSize(this.LSolved, false);
        LSolved = this.LSolved;

        this.printSize([["","U",""]], true);
        this.printSize(this.USolved, false);
        USolved = this.USolved;
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
