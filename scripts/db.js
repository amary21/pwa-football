const dbPromised = idb.open("teams-fav", 1, upgradeDb =>{
    if(!upgradeDb.objectStoreNames.contains("teams")){
        upgradeDb.createObjectStore("teams", {keyPath: "id"});
    } 
});

const saveFavTeam = (team) =>{
    return new Promise((resolve, reject)=>{
        dbPromised
            .then(db => {
                const tx = db.transaction("teams", "readwrite");
                const store = tx.objectStore("teams");
                store.add(team);
                return tx;
            })
            .then(tx => {
                if (tx.complete) {
                    resolve(true);
                } else {
                    reject(new Error(transaction.onerror))
                }
            })
    })
};

const getFavTeam = () => {
    return new Promise((resolve, reject)=>{
        dbPromised
            .then(db =>{
                const tx = db.transaction("teams", "readonly");
                const store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(teams =>{
                if (teams !== undefined) {
                    resolve(teams)
                } else {
                    reject(new Error("Favorite not Found"))
                }
            })
    });
};

const deleteFavTeam = (id) => {
    return new Promise((resolve, reject) => {
        dbPromised.then(db => {
            const tx = db.transaction("teams", "readwrite");
            tx.objectStore("teams").delete(parseInt(id));
            return tx;
        }).then(tx => {
            if (tx.complete) {
                resolve(true)
            } else {
                reject(new Error(transaction.onerror))
            }
        })
    })
};

export {saveFavTeam, getFavTeam, deleteFavTeam};