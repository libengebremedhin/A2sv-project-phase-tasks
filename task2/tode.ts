interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

class TodoList {
  private todos: TodoItem[] = [];
  private nextId: number = 1;

  add(task: string): void {
    this.todos.push({ id: this.nextId++, task, completed: false });
  }

  remove(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  display(): void {
    if (this.todos.length === 0) {
      console.log("No todo items.");
      return;
    }
    this.todos.forEach(todo => {
      const status = todo.completed ? "[x]" : "[ ]";
      console.log(`${status} (${todo.id}) ${todo.task}`);
    });
  }

  toggleComplete(id: number): void {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }
}



const todoList = new TodoList();

todoList.add("Finish TypeScript task");
todoList.add("Upload to GitHub");
todoList.display();

todoList.toggleComplete(1);
todoList.display();

todoList.remove(2);
todoList.display();
