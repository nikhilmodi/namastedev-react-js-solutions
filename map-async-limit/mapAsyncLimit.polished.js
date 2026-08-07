function mapAsyncLimit(arr, limit, asyncFn) {
    return new Promise((resolve, reject) => {
        const results = []
        let resolvedPromiseCount = 0;
        let onFlyPromiseCount = 0;
        const nextCall = () => {
            if (resolvedPromiseCount === arr.length) {
                resolve(results)
                return
            }
            while (onFlyPromiseCount < arr.length && (onFlyPromiseCount - resolvedPromiseCount) < limit) {
                let index = onFlyPromiseCount
                onFlyPromiseCount++;

                Promise.resolve((asyncFn(arr[index]))).then((val) => {
                    results[index] = val
                    resolvedPromiseCount++
                    nextCall();
                }).catch((e) => {
                    reject(e)
                })
            }
        }
        nextCall()
    })
}

module.exports = { mapAsyncLimit };
