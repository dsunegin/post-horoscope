function terminate ( options = { coredump: false, timeout: 500 }) {
    // Exit function
    const exit = (code: number ) => {
        options.coredump ? process.abort() : process.exit(code)
    }

    return (code: number, reason: any) => (err: Error, promise: Promise<any>) => {
        if (err && err instanceof Error) {
            // Log error information, use a proper logging library here :)
            console.log(err.message, err.stack)
        }


        setTimeout(exit, options.timeout).unref()
    }
}

module.exports = terminate;