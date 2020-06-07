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
        console.log(`Subscribe to task ${taskId} ${callback} => ${this.idOfSubscribedToTask}:`);
        console.log(this.ArrayOfSubscribedToTask);
        return this.idOfSubscribedToTask;
    }

    public detachFromTask(id:number):void {
        let i = this.ArrayOfSubscribedToTask.findIndex(a => a.id === id);
        if(i !== -1) {
            this.ArrayOfSubscribedToTask.splice(i,1);
            console.log(`Detach from task ${id}:`);
        }
        else console.log(`Detach from task ${id} failed!`);
        console.log(this.ArrayOfSubscribedToTask);
    }

    public subscribeToList(callback: () => void):number {
        this.ArrayOfSubscribedToList.push({id: ++this.idOfSubscribedToList, callback});
        console.log(`Subscribe to list ${callback} => ${this.idOfSubscribedToList}:`);
        console.log(this.ArrayOfSubscribedToList);
        return this.idOfSubscribedToList;        
    }

    public detachFromList(id:number):void {
        let i = this.ArrayOfSubscribedToList.findIndex(a => a.id === id);
        if(i !== -1) {
            this.ArrayOfSubscribedToList.splice(i,1);
            console.log(`Detach from list ${id}:`);
        }
        else console.log(`Detach from list ${id} failed!`);
        console.log(this.ArrayOfSubscribedToList);
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
        console.log("Changing text of task:",taskId,text);
        let task = this.listOfTasks.list.find( t => t.id === taskId);
        if(task) {
            console.log("Text changed");
            task.text = text;
            this.onTaskChanged(taskId);
        }
    }

    public changeDoneOfTask(taskId: number, done:boolean) {
        console.log("Changing done of task:",taskId,done);
        let task = this.listOfTasks.list.find( t => t.id === taskId);
        if(task) {
            console.log("Done changed");
            task.done = done;
            this.onTaskChanged(taskId);
        }
    }
}

export default Model;