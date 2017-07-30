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

var credentials ={

	credentials: {
		// Replace placeholder below by the Consumer Key and Consumer Secret you got from
		// http://developer.autodesk.com/ for the production server
		client_id: process.env.FORGE_CLIENT_ID || 'q8xYo5Rpe9CobVniWrdoKrkeomNGwQs8',
		client_secret: process.env.FORGE_CLIENT_SECRET || 'Ac96fd0cc8f90468',
		grant_type: 'client_credentials',
		scope: 'data:read data:write data:create data:search bucket:create bucket:read bucket:update bucket:delete', // Setup the needed scopes for authorizing your Token
		callbackUrl: process.env.CALLBACK_URL || 'http://localhost:3000/api/forge/callback/oauth'
	},
	
	// If you which to use the Autodesk View & Data API on the staging server, change this url
	BaseUrl: 'https://developer.api.autodesk.com',
	Version: 'v1'
} ;

credentials.Authentication =credentials.BaseUrl + '/authentication/' + credentials.Version + '/authenticate'


module.exports = credentials;
