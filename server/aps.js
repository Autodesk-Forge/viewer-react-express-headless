const { SdkManagerBuilder } = require('@aps_sdk/autodesk-sdkmanager');
const { AuthenticationClient, Scopes } = require('@aps_sdk/authentication');
const { APS_CLIENT_ID, APS_CLIENT_SECRET } = require('./config.js');


const sdk = SdkManagerBuilder.create().build();
const authenticationClient = new AuthenticationClient(sdk);

const service = module.exports = {};


service.getPublicToken = async () => {
    const credentials = await authenticationClient.getTwoLeggedToken(APS_CLIENT_ID, APS_CLIENT_SECRET, [
        Scopes.DataRead
    ]);
    return credentials;
};