import { fetchApi } from './MiuApi';

export async function logsFeatureEnabled(serverId: string): Promise<boolean> {
    const {
        servers: [server],
    } = await fetchApi(`{
        servers(where: {serverId: {_eq: "${serverId}"}}) {
            logson
        }
    }`);
    return server.logson;
}
