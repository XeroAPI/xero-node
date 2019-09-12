import * as open from 'open';
import * as prompt from 'prompt';

import { XeroClient, IXeroClientConfig } from "..";

export async function getAuthorisedXeroClient(config: IXeroClientConfig) {
    const xeroClient = new XeroClient(config);

    let consentUrl = await xeroClient.buildConsentUrl();
    open(consentUrl);

    const url = await getUserInput('URL after redirect');
    await xeroClient.setAccessTokenFromRedirectUri(url);

    return xeroClient;
}

async function getUserInput(question: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        prompt.start();
        prompt.get(question, (err: any, result: Record<typeof question, string>) => {
            prompt.stop();
            if (err) {
                reject(err);
            } else {
                resolve(result[question]);
            }
        });
    });
}