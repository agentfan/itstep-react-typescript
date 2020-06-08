interface SubscribedToTask {
    id: number,
    taskId: number,
    callback: (taskId:number, task:ListItem) => void
}

interface SubscribedToList {
    id: number,
    callback: () => void
}

class Model {
    private id: number;
    private listOfTasks: Items;
    private ArrayOfSubscribedToTask: SubscribedToTask[];
    private idOfSubscribedToTask: number;
    private ArrayOfSubscribedToList: SubscribedToList[];
    private idOfSubscribedToList: number;

    private onListChanged() {
        this.ArrayOfSubscribedToList.forEach(a => {a.callback();});
    }

    private onTaskChanged(taskId: number) {
        const task = this.listOfTasks.list.find(a => a.id === taskId);
        if(!task) return;
        this.ArrayOfSubscribedToTask.forEach(a => {if(a.taskId === taskId) a.callback(taskId, task)});
    }

    constructor(initList: ListItem[] = []) {
        this.id = -1;
        this.listOfTasks = {list: [...initList]};
        this.listOfTasks.list.forEach( item => { if(this.id<item.id) this.id = item.id });
        this.ArrayOfSubscribedToTask = [];
        this.idOfSubscribedToTask = -1;
        this.ArrayOfSubscribedToList = [];
        this.idOfSubscribedToList = -1;
    }

    get list():Items { return this.listOfTasks; }

    public subscribeToTask(taskId: number, callback: (id:number, item: ListItem) => void):number {
        this.ArrayOfSubscribedToTask.push({id: ++this.idOfSubscribedToTask, taskId, callback});
        return this.idOfSubscribedToTask;
    }

    public detachFromTask(id:number):void {
        let i = this.ArrayOfSubscribedToTask.findIndex(a => a.id === id);
        if(i !== -1) this.ArrayOfSubscribedToTask.splice(i,1);
    }

    public subscribeToList(callback: () => void):number {
        this.ArrayOfSubscribedToList.push({id: ++this.idOfSubscribedToList, callback});
        return this.idOfSubscribedToList;        
    }

    public detachFromList(id:number):void {
        let i = this.ArrayOfSubscribedToList.findIndex(a => a.id === id);
        if(i !== -1) this.ArrayOfSubscribedToList.splice(i,1);
    }

    public addTask(text: string | undefined) {
        if(!text) return;
        const newList:Items = {list: this.listOfTasks.list };
        newList.list.push(
            {
                id: ++this.id,
                text: text,
                done: false
            }
        );
        this.listOfTasks = newList;
        this.onListChanged();
    }

    public removeTask(taskId: number) {
        let i = this.listOfTasks.list.findIndex( item => item.id === taskId);
        if(i !== -1) {
            const newList:Items = {list: this.listOfTasks.list };           
            newList.list.splice(i,1);
            this.listOfTasks = newList;
            this.onListChanged();
        }
    }

    public changeTextOfTask(taskId: number, text:string) {
        let task = this.listOfTasks.list.find( t => t.id === taskId);
        if(task) {
            task.text = text;
            this.onTaskChanged(taskId);
        }
    }

    public changeDoneOfTask(taskId: number, done:boolean) {
        let task = this.listOfTasks.list.find( t => t.id === taskId);
        if(task) {
            task.done = done;
            this.onTaskChanged(taskId);
        }
    }

    public sortTextUp() {
        const newList:Items = {list: this.listOfTasks.list };
        newList.list.sort((a,b) => {
            if(a.text > b.text) return -1;
            if(a.text < b.text) return 1;
            return 0;
        });
        this.listOfTasks = newList;
        this.onListChanged();        
    }

    public sortTextDown() {
        const newList:Items = {list: this.listOfTasks.list };
        newList.list.sort((a,b) => {
            if(a.text > b.text) return 1;
            if(a.text < b.text) return -1;
            return 0;
        });
        this.listOfTasks = newList;
        this.onListChanged();        
    }

    public sortDoneUp() {
        const newList:Items = {list: this.listOfTasks.list };
        newList.list.sort((a,b) => {
            if(a.done > b.done) return -1;
            if(a.done < b.done) return 1;
            return 0;
        });
        this.listOfTasks = newList;
        this.onListChanged();        
    }
    
    public sortDoneDown() {
        const newList:Items = {list: this.listOfTasks.list };
        newList.list.sort((a,b) => {
            if(a.done > b.done) return 1;
            if(a.done < b.done) return -1;
            return 0;
        });
        this.listOfTasks = newList;
        this.onListChanged();        
    }   
    
    public sortIdUp() {
        const newList:Items = {list: this.listOfTasks.list };
        newList.list.sort((a,b) => a.id - b.id);
        this.listOfTasks = newList;
        this.onListChanged();        
    }    

    public sortIdDown() {
        const newList:Items = {list: this.listOfTasks.list };
        newList.list.sort((a,b) => b.id - a.id);
        this.listOfTasks = newList;
        this.onListChanged();        
    }    

}

export default Model;