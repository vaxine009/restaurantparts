export class FileSystem {

    private fs = require("fs");
    
    SaveSync(filename:string, data:string) {
        this.fs.writeFileSync(filename, data);
    }
    
    AppendSync(filename:string, data:string) {
        this.fs.appendFileSync(filename, data);
    }

}

