// Grid Gallery

import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',

  }
}

const tilesData = [
  {
    img: 'images/rhino-legocar.png',
    title: 'Rhino Lego', 
  },
  {
    img: 'images/inventor-racecar.png',
    title: 'Inventor Race Car',
  },
  {
    img: 'images/lambo.png',
    title: 'Fusion Lambo',
  },
  {
    img: 'images/revit-house.png',
    title: 'Revit House',
  },
  {
    img: 'images/engine.png',
    title: 'Fusion Engine',
  },
 ]

//  const Gallery = () => (
//   <div style={styles.root}>
//     <GridList style={styles.gridList} cols={2.2}>
//       {tilesData.map((tile) => (
//         <GridTile style={picStyle}
//           key={tile.img}
//           title={tile.title}
//         >
//           <img src={require('./images/rhino-legocar.png')} />
//         </GridTile>
//       ))}
//     </GridList>
//   </div>
// );

class Gallery extends Component {

   render() {
   	console.log('image path', tilesData)
    return (
    	<div style={styles.root}>
    		<GridList style={styles.gridList} cols={2.2} cellHeight={250}>
      			{tilesData.map((tile) => (
        		<GridTile
          			key={tile.img} 
          			title={tile.title}
          			titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          			>
       		   			<img src={tile.img} />
      			</GridTile>
     			))}
    		</GridList>
  		</div>
    )
	}
}

export default Gallery;
