

     
//legacy code////////
const drawBoard = (xMid, yMid, numOfHexOnSides, size, board) => {
    //const xMaxStart = xMid - (Math.sqrt(3) * size * numOfHexSize);
    //xMaxEnd = xMid + (Math.sqrt(3) * size * numOfHexSize) + (Math.sqrt(3) * size)/2
    //rowStartPos = xMid + ((rowNum - numOfHexOnSides) * (Math.sqrt(3) * size));
    //colStartPos = yMid + ((rowNum - numOfHexOnSides) * (size * 2));

    //if less than mid row,
    //const startOffPoint = width - currRowNum * size;
    //center of hex board is width/2, heitht/2
    //left starr of top row is startWidth - startOffset for row

        //find x pos of each row
    const rowStartPos = (rowNum) => {
        return xMid+ ((rowNUm - numOfHexOnSides) * (size * (3/4)));
    }

        //find y pos of each col
    const colStartPos = (rowNum) => {
        return yMid + ((rowNum - numOfHexOnSides) * (size * 2));
    }

    const centerPoints = () => {
          for (let x = 0; x < board.length; x ++) {
              for (let y = 0; y < board[x].length; y ++) {
                  let center = {
                      x: rowStartPos(x),
                      y: colStartPos(y),
                  };
                  board.center = center;

              }
          }
    }

    const findPoint = (center, size, i) => {
        const angleDeg = 60 * i - 30;
        const angleRad = Math.PI / 180 * angleDeg;
        const x = center.x + size * Math.cos(angleRad);
        const y = center.y + size * Math.sin(angleRad);
        return {
          x,
          y,
        };
      }
      
      const makeHex = (center, size) => {
        const storePoints = [];
        for (let i = 0; i < 6; i ++) {
              storePoints.push(findPoint(center, size, i)); 
      }
        return storePoints;
      }
      
    //   function mouseHandler(e) {
        
    //   }

          
      
      //w = sqrt(3) * size = horizontal distance
      const horizontalDist = (size) => {
        return Math.sqrt(3) * size;
      }
      //h * 3/4 = vertical distance
      const vertDistance = (size) => {
        return (size * 2) * 3/4;
      }

      const findPointsFromCenter = (centers) => {
        const allCenters = [];
        for (let i = 0; i < centers; i ++) {
            allCenters.push(makeHex(centers[i]))
        }
        board.hexPoints = allCenters;
      }

      
    //   const drawMoreHex = (center, size, num) => {
    //     let newX = center.x;
    //     let newY= center.y;
    //     //using offset 
    //     for(let row = 0; row < num; row ++) {
    //       for (let col = 0; col < num; col ++ ) {
    //         newX = center.x + (col * horizontalDist(size));
    //         newY = center.y + (row * vertDistance(size));
    //         if (row % 2 === 1) {
    //           newX += (Math.sqrt(3) * size)/2;
    //         } 
    //         drawHex(newX, newY, size);
    //       }
    //     } 
    //   }

}




 //   const drawHex = (x, y, size) => {
    //     const points = makeHex( {x, y}, size);
    //     const mousePointer = 
    //     ctx.beginPath();
    //     ctx.moveTo(points[0].x, points[0].y);
      
    //     for (let i = 1; i < points.length; i ++) {
    //       ctx.lineTo(points[i].x, points[i].y);
    //     }
    //     console.log('points: ', points);
    //     ctx.closePath();
    //     if (!makeHex.fill) {
    //       ctx.stroke();
    //     } else {
    //      ctx.fillStyle = "blue";
    //   ctx.fill();
    //     }
    //}
