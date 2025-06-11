import {Octokit} from "@octokit/rest";
import {createAppAuth} from "@octokit/auth-app"

export const getAccessToken = async () => {

 const {GITHUB_APP_ID, GITHUB_APP_PRIVATE_KEY} = process.env

 const octoKitInstance = new Octokit({
  authStrategy: createAppAuth,
  auth: {
   appId: GITHUB_APP_ID,
   privateKey: GITHUB_APP_PRIVATE_KEY
  }
 });

 const {data: installations} = await octoKitInstance.rest.apps.listInstallations()

 console.log("installations -----", installations);
 

 if(!installations.length) {
   throw new Error("No Installations found for this github app")
 }

 const installationId = installations[0].id;

 const installationAccessToken = await octoKitInstance.rest.apps.createInstallationAccessToken({installation_id: installationId})

 return installationAccessToken.data.token
}