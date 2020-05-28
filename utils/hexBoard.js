/////////////legacy code

const hexagonMap = (sides, xMid, yMid, size) => {

    //creating our hex class
    class Hex {
      constructor(q, r, s) {
        this.q = q;
        this.s = s;
        this.r = r;
        this.fill = false;
      };
    }


  
    //creating our cubed coords for hex based on n (length of hex sides, or, number of hexes from side to one before center on longest row)
    class HexCoords {
      constructor(n) {
        this.coords = [];
        this.hexsFromCenter = n;
      }
    //test that hex coords equal zero. if they don't, discard
      hexCoordsEqualZero(q, r, s) {
        let bool = true;
        if (Math.round(q + r + s) !== 0) {
          bool = false;
        }
        return bool;
      }
      
    //create coordinates. not optimized. three nested loops
      makeCoords() {
        const coords = this.coords;
        const start = -this.hexsFromCenter;
        const end = this.hexsFromCenter;
        for (let i = start; i <= end; i ++ ) {
          for (let j = start; j <= end; j ++) {
            for (let y = start; y <= end; y ++) {
              if (this.hexCoordsEqualZero(i, j, y)) {
                coords.push(new Hex(i, j, y));
              }
            }
          }
        }
      }
      ///////////end of class hexcoords
    }
  
  
  ////////////makeMap class
    class MakeMap {
  
      constructor(n, xMid, yMid, size) {
        this.n = n;
        this.map = [];
        this.hexes = new HexCoords(n);
        this.hexLoc = [];
        this.yMid = yMid;
        this.xMid = xMid;
        this.size = size;

        this.hexCenterPoints = [];
  
        this.hexes.makeCoords();
      }
  
      createMap() {
        const n = (this.n * 2) + 1; 
        const arrMap = this.map;
        let i = 0;
        while(i < n) {
          arrMap.push([]);
          i ++;
        };
      }
  
      coordsToMatrix() {
        const cubedCoords = this.hexes.coords;
        const map = this.map;
        const n = this.n;
  
        let row, col, hex;
        for (let i = 0; i < cubedCoords.length; i ++) {
          hex = cubedCoords[i];
          row = hex.r - (-n);
          if (row <= n) {
            col = hex.q + (n - (-hex.r));
          }
          else { 
            col = hex.q + (n - (-hex.r)) - (row - n);
          }
          hex.row = row;
          hex.col = col;
          map[row][col] = hex;
        }
      }

      rowStartPos(x, y) {
          const {n, size} = this;
        //  console.log('n, size: ', n, size, rowNum, this.xMid);
            return this.xMid + (Math.abs(x - n) * (size * (3/4)) - (y * size));
        }


        colStartPos(y, x) {
           const {n, size} = this;
            return this.yMid + ((x - n) * (size * 2));
        }

        //////find center points of hexagons///////
        centerPoints() {
            const board = this.map;
            for (let x = 0; x < board.length; x ++) {
                for (let y = 0; y < board[x].length; y ++) {
                    let center = {
                        x: this.rowStartPos(x, y),
                        y: this.colStartPos(y, x),
                    };
                    //adds it to hex for future ref
                    board[x][y].centerPoint = center;
                    //adds it to hexLoc for drawing
                    //this.hexLoc.push(center);
                }
            }
        }

        /////find points from center in space
        findPoint (center, i) {
            const size = this.size;
            const angleDeg = 60 * i - 30;
            const angleRad = Math.PI / 180 * angleDeg;
            const x = center.x + size * Math.cos(angleRad);
            const y = center.y + size * Math.sin(angleRad);
            return {
              x,
              y,
            };
        }

        ////////
        makeHex(hex) {
            const pointsStore = [];
            for (let i = 0; i < 6; i ++) {
                pointsStore.push(this.findPoint(hex.centerPoint, i)); 
            }
            hex.pointsStore = pointsStore;
        }

        //uses centers to find all points
        findPointsFromCenter() {
            const allCenters = [];
            const board = this.map;
            for (let j = 0; j < board.length; j ++) {
                
              for (let i = 0; i < board[j].length; i ++) {
                  allCenters.push(this.makeHex(board[j][i]));
                }
            }
            this.hexCenterPoints = allCenters;
        }
        
        ////end of class map   
    }
  
    const gameMap = new MakeMap(sides, 250, 250, size);
    gameMap.createMap();
    gameMap.coordsToMatrix();
    gameMap.centerPoints();
    gameMap.findPointsFromCenter();
    return gameMap;
  }

  //xyz to point
    


  /////functiond to add to board class






  

  
// //   function mouseHandler(e) {
    
// //   }

      
  
//   //w = sqrt(3) * size = horizontal distance
//   const horizontalDist = (size) => {
//     return Math.sqrt(3) * size;
//   }
//   //h * 3/4 = vertical distance
//   const vertDistance = (size) => {
//     return (size * 2) * 3/4;
//   }



//calculate from xyz
