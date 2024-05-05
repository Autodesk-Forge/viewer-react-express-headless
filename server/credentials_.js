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
		client_id: process.env.FORGE_CLIENT_ID || 'a8y1Hg34MyzXIM2DIX2tNeoGpph0e1fi',
		client_secret: process.env.FORGE_CLIENT_SECRET || '3evz9U5dkmsNnYHO',
		grant_type: 'client_credentials',
		scope: 'viewables:read', // Setup the needed scopes for authorizing your Token
		callbackUrl: process.env.CALLBACK_URL || 'http://localhost:3000/oauth/callback'
	},
	
	// If you which to use the Autodesk View & Data API on the staging server, change this url
	BaseUrl: 'https://developer.api.autodesk.com',
	Version: 'v2' // Need to migrate to v2 
} ;

credentials.Authentication =credentials.BaseUrl + '/authentication/' + credentials.Version + '/token'
                                                     

module.exports = credentials;