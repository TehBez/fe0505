onDeleteTask(taskId) {
    const newTasks = this._tasks.filter(task => task.id !== taskId);

    this.Tasks({
        tasks: newTasks
    });
}