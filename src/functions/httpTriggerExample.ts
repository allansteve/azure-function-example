import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { SecretClient } from "@azure/keyvault-secrets"
import { DefaultAzureCredential } from "@azure/identity"
import "dotenv/config";

export async function httpTriggerExample(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    
    const credential = new DefaultAzureCredential();
    const keyVaultUrl = process.env["KEY_VAULT_URI"];

    const keyVaultClient = new SecretClient(keyVaultUrl, credential);
    const secret = await keyVaultClient.getSecret(process.env["SECRET_NAME"])

    return { body: `This is the secret that returned: ${secret}` };
};

app.http('httpTriggerExample', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: httpTriggerExample
});