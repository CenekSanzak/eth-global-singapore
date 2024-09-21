import { near } from "near-sdk-js";

export class Tool {
    static schema = {
        query_url: 'string',
        json_schema: 'string',
        votes: 'u64',
    };
    query_url: string;
    json_schema: string;
    votes: number;

    constructor({  query_url = "", json_schema = "", votes = 0 } = {}) {
        this.query_url = query_url;
        this.json_schema = json_schema;
        this.votes = votes;
    }
}
