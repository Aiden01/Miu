import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://miu-database.herokuapp.com/v1alpha1/',
    headers: {
        'Content-Type': 'application/json',
        'X-Hasura-Access-Key': process.env.HASURA_GRAPHQL_ACCESS_KEY,
    },
});

export function fetchApi(query: string): Promise<any> {
    const graphqlQuery = JSON.stringify({ query });
    return instance
        .post('graphql', graphqlQuery)
        .then(response => {
            const data = response.data;
            return data.data;
        })
        .catch(({ response: { data } }) =>
            data.errors.map(({ message }: any) => message).join(', ')
        );
}
