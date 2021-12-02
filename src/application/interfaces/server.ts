export interface WebServer {
    setup(): void;
    start(port: number): void;
    stop(error: any): void;
}
