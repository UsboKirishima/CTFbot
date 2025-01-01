import { QuickDB,IQuickDBOptions } from "quick.db";

export default class CTFDatabase extends QuickDB {

    public constructor(options?: IQuickDBOptions) {
        super(options);
    }

    public eraseAllData = async () => {
        return this.deleteAll();
    } 
}
