export class SymfonyProfile {
    constructor(
        public readonly token: string,
        public readonly ipAddress: string,
        public readonly httpMethod: string,
        public readonly url: string,
        public readonly statusCode: string,
        public readonly createdAt: Date
    ) {}

    getProfileWebLink() {
        return `${this.url}_profiler/${this.token}`;
    }
}