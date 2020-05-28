
////working code
const hexMapMaker = (n, size, midX, midY) => {
    class Hex {
          constructor(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.center = {};
            this.points = [];
            this.fill = false;
          };
        }
  
      class HexCoords {
          constructor(n) {
            this.coords = {};
            this.hexsFromCenter = n;
          }
        //test that hex coords equal zero. if they don't, discard
          hexCoordsEqualZero(x, y, z) {
            let bool = true;
            if (Math.round(x + y + z) !== 0) {
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
                    let hex = new Hex(i, j, y);
                    coords[`${hex.x},${hex.z}`] = hex;
                  }
                }
              }
            }
          }
          ///////////end of class hexcoords
        }
  
    class HexPoints {
      constructor(n, size, midX, midY) {
        this.n = n;
        this.size = size;
        this.midX = midX;
        this.midY = midY;
        this.offSet = (Math.sqrt(3) * size)/2;
        this.hexCoords = new HexCoords(n);

        this.hexCoords.makeCoords();
      }
  
      findPoint(center, i){
        const size = this.size;
        const angleDeg = 60 * i - 30;
        const angleRad = Math.PI / 180 * angleDeg;
        const x = center.col + size * Math.cos(angleRad);
        const y = center.row + size * Math.sin(angleRad);
        return {
          x,
          y,
        };
      }
  
      findAllHexPoints(curHex) {
        let point;
        for (let i = 0; i < 6; i ++) {
            point = this.findPoint(curHex.center, i);
            curHex.points.push(point);
          }
      }
  
      findHexCenterRow(z) {
        const {size, midY} = this;
        const h = (size * 2) * (3/4);
        return midY + (z * (h));
      }
  
      findHexCenterCol(x, z) {
        const {size, midX} = this;
        const h = size * 2;
        const offSet = (Math.sqrt(3) * size)/2 * -z;
        return midX - ((x) * (Math.sqrt(3) * size)) + offSet;
      }
  
  
      storeHexCenterAndPoints() {
        const map = this.hexCoords.coords;
        let curRow, curCol, curHex;
        for (let key in map) {
          curHex = map[key];
          curRow = this.findHexCenterRow(curHex.z);
          curCol = this.findHexCenterCol(curHex.x, curHex.z);
          curHex.center.row = curRow;
          curHex.center.col = curCol;
          this.findAllHexPoints(curHex);
        }
      }
  
   
      findNearestCenter(pointX, pointY) {
        //truePoint = pointY - 250 [centerY];
        const truePoint = pointY - this.midY;
        const z = Math.round(truePoint/((this.size * 2) *(3/4)));

        const trueOffSet = this.offSet * -z;
        const trueX = pointX - this.midX - trueOffSet;

        const div = (Math.sqrt(3) * size);
        const x = Math.round(trueX/div);
        console.log('trueX v x', trueX, x, 'div: ', div, 'z: ', z);
        return `${-x},${z}`;
      }
    
    }

    // const hexCoords = new HexCoords(n);
    // hexCoords.makeCoords();
    // console.log(hexCoords);
    const hexMap = new HexPoints(n, size, midX, midY);
    hexMap.storeHexCenterAndPoints();
    return hexMap;
  };


 