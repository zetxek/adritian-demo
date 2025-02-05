declare module 'download-git-repo' {
    function download(
        repository: string,
        destination: string,
        options?: { clone?: boolean },
        callback?: (err?: Error) => void
    ): void;
    
    export default download;
} 