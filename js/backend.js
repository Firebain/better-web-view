import uuidv4 from "uuid/v4";

window.backend = {
    resolvers: {},
    invoke: function(route, data = null) {
        let hash = uuidv4();
        while (hash in this.resolvers) {
            hash = uuidv4();
        }

        external.invoke(JSON.stringify({
            "hash": hash,
            "route": route,
            "data": data 
        }));

        return new Promise((res, rej) => {
            this.resolvers[hash] = {
                res: res,
                rej: rej
            };
        });
    },
    handle: function(res) {
        let promise_actions = this.resolvers[res.hash];

        if (promise_actions === undefined) {
            alert("Something went wrong");
        }

        if ('Ok' in res.data) {
            promise_actions.res(res.data.Ok);
        }

        if ('Err' in res.data) {
            promise_actions.rej(res.data.Err);
        }

        delete this.resolvers[res.hash];
    }
};
