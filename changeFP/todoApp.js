import {
  AddTaskForm
} from './addTaskForm.js';
import {
  Filter
} from './filter.js';
import {
  Task
} from './task.js';
import {
  List
} from './taskList.js';

const addTaskForm = new AddTaskForm({
  onSubmit: onAddTask
});

addTaskForm.events.addEventListener('complete', onAddTaskComplete);

const filter = new Filter({
  defaultFilter: '#/all',
  onChangeFilter: onFilterChange
});

const taskList = new List({
  filterItems: filteredTask
});

onFilterChange();

function filteredTask(task) {
  const currentFilterName = filter.getCurrentFilterName();

  switch (currentFilterName) {
    case '#/active':
      return task.getCompleted() === false;
    case '#/completed':
      return task.getCompleted() === true;
    default:
      return true;
  }
}

function onFilterChange() {
  taskList.render();
  filter.setItemsCount(taskList.getActiveTaskCount());
}

function onAddTask(task) {
  const taskComponent = new Task({
    task,
    tagName: 'li',
    onComplete: onTaskComplete,
    onChange: onTaskChange,
    onDestroy: onTaskDestroy
  });

  taskList.add(taskComponent);
  filter.setItemsCount(taskList.getActiveTaskCount());
}

function onTaskDestroy(taskId) {
  taskList.filterItems(task => task.getId() !== taskId);
  filter.setItemsCount(taskList.getActiveTaskCount());
}

function onTaskChange(taskId, newTitle) {
  const taskComponent = taskList.find(task => task.getId() === taskId);

  taskComponent.change({
    title: newTitle
  });
}

function onTaskComplete(taskId, completed) {
  const taskComponent = taskList.find(task => task.getId() === taskId);

  taskComponent.change({
    completed
  });
  filter.setItemsCount(taskList.getActiveTaskCount());
}

function onAddTaskComplete(completed) {
  console.log('onAddTaskComplete', completed);
}