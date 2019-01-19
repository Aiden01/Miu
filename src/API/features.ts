import { fetchApi } from './MiuApi';

const features = ['badwords'];

export async function enableFeature(
    feature: string,
    serverId: string
): Promise<any> {
    if (!features.includes(feature.toLowerCase())) {
        return Promise.reject(new Error(`Unknown feature ${feature}`));
    } else {
        return fetchApi(`
            mutation update_servers {
                update_servers(where: {serverId: {_eq: "${serverId}"}}, _set: {${feature.toLowerCase()}on: true}) {
                    affected_rows
                }
            }
        `);
    }
}
