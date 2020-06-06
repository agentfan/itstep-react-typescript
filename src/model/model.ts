interface SubscribedOnTask {
    id: number,
    callBack: (id:number, item:ListItem) => void
}

interface SubscribedOnList {
    callBack: () => void
}

class Model {
    private id: number;
    private listOfTasks: ListItem[];
    private subscribedOnTaskChanged: SubscribedOnTask[];
    private subscribedOnListChanged: SubscribedOnList[];

    private onListChanged() {

    }

    private onTaskChanged(id: number) {
        
    }

    constructor(initList: ListItem[] = []) {
        this.id = -1;
        this.listOfTasks = [...initList];
        this.listOfTasks.forEach( item => { if(this.id<item.id) this.id = item.id });
        this.subscribedOnTaskChanged = [];
        this.subscribedOnListChanged = [];
    }

    public subscribeOnTaskChanged(id: number, callBack: (id:number, item: ListItem) => void):void {

    }

    public unsubscribeOnTaskChanged(id: number, callBack: (id:number, item: ListItem) => void):void {

    }

    public subscribeOnListChanged(callBack: () => void):void {

    }

    public unsubscribeOnListChanged(callBack: () => void):void {

    }

    public addTask(text: string) {
        this.listOfTasks.push(
            {
                id: ++this.id,
                text: text,
                done: false
            }
        );
        this.onListChanged();
    }

    public removeTask(id: number) {
        let i = this.listOfTasks.findIndex( item => item.id === id);
        if(i !== -1) {
            this.listOfTasks.splice(i,1);
            this.onListChanged();
        }
    }
}

export default Model;