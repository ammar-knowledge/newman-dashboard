const utils = require('../utils');

module.exports = (socket, id) => {
    return {
        handleStart: (err, args) => {
            if (err) return socket.close();

            socket.emit('start', utils.generateStartData(process.argv, id));
        },

        handleDone: (err, args) => {
            if (err) return socket.close();

            socket.emit('done', {
                id,
            });

            // close the client
            socket.close();
        },

        handlePause: (err, args) => {
            if (err) return socket.close();

            socket.emit('pause', {
                id,
            });
        },

        handleResume: (err, args) => {
            if (err) return socket.close();

            socket.emit('resume', {
                id,
            });
        },

        handleAbort: (err, args) => {
            if (err) return socket.close();

            socket.emit('abort', {
                id,
            });
        },

        handleRunEvent: (event) => {
            return (err, args) => {
                if (err) return socket.close();

                socket.emit('run-event', {
                    name: event,
                    id,
                    args,
                });
            };
        },
    };
};