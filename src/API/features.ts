import { fetchApi } from './MiuApi';

const features = ['badwords', 'logs'];

export async function enableOrDisableFeature(
    feature: string,
    serverId: string,
    enable: boolean = true
): Promise<any> {
    if (!features.includes(feature.toLowerCase())) {
        return Promise.reject(new Error(`Unknown feature ${feature}`));
    } else {
        const state = enable
            ? `${feature.toLowerCase()}on: true`
            : `${feature.toLowerCase()}on: false`;
        return fetchApi(`
            mutation update_servers {
                update_servers(where: {serverId: {_eq: "${serverId}"}}, _set: {${state}}) {
                    affected_rows
                }
            }
        `);
    }
}
