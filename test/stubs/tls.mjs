// Stand-in for node:tls in tests. connect() "succeeds" with a certificate
// that expires on globalThis.__certValidTo.
export const connect = (_opts, onConnect) => {
    const socket = {
        getPeerCertificate: () => ({ valid_to: globalThis.__certValidTo }),
        end: () => {},
        on: () => socket,
        destroy: () => {},
    };
    queueMicrotask(onConnect);
    return socket;
};
