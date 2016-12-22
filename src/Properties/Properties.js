/////////////////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Jaime Rosales 2016 - Forge Developer Partner Services
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import './properties.css';

class Properties extends Component {
	render() {
		return(
			<table className="tg">
				<tbody>
  					<tr>
    					<th className="tg-yw4l">Category</th>
  					</tr>
  					<tr>
    					<td className="tg-yw4l">one</td>
  					</tr>
  					<tr>
    					<td className="tg-yw4l">two</td>
  					</tr>
  					<tr>
    					<td className="tg-yw4l">tres</td>
  					</tr>
  				</tbody>
			</table>
			
		)
	}
}


export default Properties;
