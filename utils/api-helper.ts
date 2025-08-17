import axios, { AxiosResponse } from 'axios';
import * as fs from 'fs';
import * as path from 'path';

export class ApiHelper {
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