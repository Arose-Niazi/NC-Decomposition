class DoLittle {
    constructor(size, data) {

        printHeading("Do Little's Method", true, "h1");

        this.size = size;
        this.data = data;
        this.L = [
            [1,0,0],
            ["L<sub>21</sub>", 1, 0],
            ["L<sub>31</sub>", "L<sub>32</sub>", 1],
        ];

        this.U = [
            ["U<sub>11</sub>","U<sub>12</sub>","U<sub>13</sub>"],
            [0,"U<sub>22</sub>","U<sub>23</sub>"],
            [0,0,"U<sub>23</sub>"]
        ];

        this.LxU = [
            ["U<sub>11</sub>","U<sub>12</sub>","U<sub>13</sub>"],
            ["L<sub>21</sub>U<sub>11</sub>","L<sub>21</sub>U<sub>12</sub>+U<sub>22</sub>","L<sub>21</sub>U<sub>13</sub>+U<sub>23</sub>"],
            ["L<sub>31</sub>U<sub>11</sub>","L<sub>31</sub>U<sub>12</sub>+L<sub>32</sub>U<sub>22</sub>","L<sub>31</sub>U<sub>13</sub>+L<sub>32</sub>U<sub>23</sub>+U<sub>33</sub>"]
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

        this.U11 = data[0][0];
        this.U12 = data[0][1];
        this.U13 = data[0][2];
        this.L21 = math.evaluate(this.data[1][0]+"/"+this.U11);
        this.U22 = math.fraction(math.subtract(this.data[1][1], math.multiply(this.L21, this.U12)));
        this.U23 = math.fraction(math.subtract(this.data[1][2], math.multiply(this.L21, this.U13)));
        this.L31 = math.fraction(math.divide(this.data[2][0],this.U11));
        this.L32 = math.fraction(math.divide(math.subtract(this.data[2][1],math.multiply(this.L31,this.U12)),this.U22));
        this.U33 = math.subtract(this.data[2][2],math.add(math.multiply(this.L31, this.U13),math.multiply(this.L32, this.U23)));
        this.LSolved = [
            [1,0,0],
            [this.L21.toFraction(), 1, 0],
            [this.L31.toFraction(), this.L32.toFraction(), 1],
        ];

        this.USolved = [
            [this.U11,this.U12,this.U13],
            [0,this.U22.toFraction(),this.U23.toFraction()],
            [0,0,this.U33.toFraction()]
        ];

        this.LxUSolution = [
            [
                ["U<sub>11</sub> = " + this.U11],
                ["U<sub>12</sub> = " + this.U12],
                ["U<sub>13</sub> = " + this.U13]
            ],
            [
                [
                    "L<sub>21</sub>U<sub>11</sub> = " + this.data[1][0],
                    `L<sub>21</sub>(${this.U11}) = ` + this.data[1][0],
                    `L<sub>21</sub> = ` + this.data[1][0]+`/${this.U11}`,
                    `L<sub>21</sub> = ` + this.L21.toFraction()
                ],
                [
                    "L<sub>21</sub>U<sub>12</sub>+U<sub>22</sub> = " + this.data[1][1],
                    `(${this.L21.toFraction()})(${this.U12})+U<sub>22</sub> = ` + this.data[1][1],
                    math.fraction(math.multiply(this.L21, this.U12)).toFraction()+` + U<sub>22</sub> = ` + this.data[1][1],
                    `U<sub>22</sub> = ` + this.data[1][1]+" - "+math.fraction(math.multiply(this.L21, this.U12)).toFraction(),
                    `U<sub>22</sub> = ` + this.U22.toFraction()
                ],
                [
                    "L<sub>21</sub>U<sub>13</sub>+U<sub>22</sub> = " + this.data[1][2],
                    `(${this.L21.toFraction()})(${this.U13})+U<sub>23</sub> = ` + this.data[1][2],
                    math.fraction(math.multiply(this.L21, this.U13)).toFraction()+` + U<sub>23</sub> = ` + this.data[1][2],
                    `U<sub>23</sub> = ` + this.data[1][2]+"-"+math.fraction(math.multiply(this.L21, this.U13)).toFraction(),
                    `U<sub>23</sub> = ` + this.U23.toFraction()
                ]
            ],
            [
                [
                    "L<sub>31</sub>U<sub>11</sub = " + this.data[2][0],
                    `L<sub>31</sub>(${this.U11}) = ` + this.data[2][0],
                    `L<sub>31</sub> = ` + this.data[2][0]+`/${this.U11}`,
                    `L<sub>31</sub> = ` + this.L31.toFraction()
                ],
                [
                    "L<sub>31</sub>U<sub>12</sub>+L<sub>32</sub>U<sub>22</sub> = " + this.data[2][1],
                    `(${this.L31.toFraction()})(${this.U12})+L<sub>32</sub>(${this.U22.toFraction()}) = ` + this.data[2][1],
                    math.fraction(math.multiply(this.L31, this.U12)).toFraction()+` + L<sub>32</sub>(${this.U23.toFraction()}) = ` + this.data[2][1],
                    `L<sub>32</sub>(${this.U22.toFraction()}) = ` + this.data[2][1]+"-"+math.fraction(math.multiply(this.L31, this.U12)).toFraction(),
                    `L<sub>32</sub> = ` + this.L32.toFraction()
                ],
                [
                    "L<sub>31</sub>U<sub>13</sub>+L<sub>32</sub>U<sub>23</sub>+U<sub>33</sub> = " + this.data[2][2],
                    `(${this.L31.toFraction()})(${this.U13})+(${this.L32.toFraction()})(${this.U23.toFraction()})+U<sub>33</sub> = ` + this.data[2][2],
                    `${math.multiply(this.L31, this.U13).toFraction()} + ${math.multiply(this.L32, this.U23).toFraction()} +U<sub>33</sub> = ` + this.data[2][2],
                    `${math.add(math.multiply(this.L31, this.U13),math.multiply(this.L32, this.U23)).toFraction()} + U<sub>33</sub> = ` + this.data[2][2],
                    `U<sub>33</sub> = ${this.data[2][2]} - ${math.add(math.multiply(this.L31, this.U13),math.multiply(this.L32, this.U23)).toFraction()}`,
                    `U<sub>33</sub> = ${math.subtract(this.data[2][2],math.add(math.multiply(this.L31, this.U13),math.multiply(this.L32, this.U23))).toFraction()}`,
                    `U<sub>33</sub> = ` + this.U33.toFraction()
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

        printHeading("L and U after Do Little's Method", true, "h3");
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
