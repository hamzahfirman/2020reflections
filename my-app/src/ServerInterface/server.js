// A Function that will fecth all entries
import entries from "./entries";
let getEntries = (catName) => {
    // Later On: We will connect to a backend and fetch all the entries from it. 

    // alert(cat);
    let found = entries.find(x => x.type === catName.toLowerCase());
    return found;
}

// Object 
let server = {
    fetchEntries: getEntries
};

export default server;