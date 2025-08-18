import axios, { AxiosResponse } from 'axios';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Author: Avinash Kumar
 * Date: 2025-08-18
 * Description: Helper class to send API calls for RudderStack Http Source endpoints.
 */
export class ApiHelper {
    /**
     * Sends an event payload to the specified RudderStack data plane endpoint.
     * 
     * Reads the payload from a JSON file located in the `./test-data/api-payload/` directory,
     * constructs the API request, and sends it using Axios with basic authentication.
     * 
     * @param writeKey - The RudderStack write key for authentication.
     * @param dataPlaneUrl - The base URL of the RudderStack data plane.
     * @param payloadType - The type of payload/event, used to resolve the JSON file and endpoint.
     * @returns A promise that resolves to the Axios response from the API call.
     * @throws If the payload file does not exist or the API call fails.
     */
    static async sendEvent(writeKey: string, dataPlaneUrl: string, payloadType: string): Promise<AxiosResponse> {
        // Resolve the payload file path
        const filePath = path.join(process.cwd(), "./test-data/api-payload/"+payloadType+".json");
        if (!fs.existsSync(filePath)) {
            throw new Error(`Payload file not found: ${filePath}`);
        }

        const payload = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Send API request
        try {
            const response = await axios.post(`${dataPlaneUrl}/v1/${payloadType}`, payload, {
                auth: {
                    username: writeKey,
                    password: ''
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response;
        } catch (error: any) {
            console.error('API call failed:', error.message);
            throw error;
        }
    }
}