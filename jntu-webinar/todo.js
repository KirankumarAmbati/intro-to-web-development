document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodo');
    const todoList = document.getElementById('todoList');
    const todoCount = document.getElementById('todoCount');
    const clearCompletedBtn = document.getElementById('clearCompleted');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let currentFilter = 'all';

    // Initialize
    renderTodos();
    updateTodoCount();

    // Add todo
    function addTodo(text) {
        if (text.trim() === '') return;
        
        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date()
        };

        todos.unshift(todo);
        saveTodos();
        renderTodos();
        updateTodoCount();
        todoInput.value = '';
    }

    // Delete todo
    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
        renderTodos();
        updateTodoCount();
    }

    // Toggle todo completion
    function toggleTodo(id) {
        todos = todos.map(todo => 
            todo.id === id ? {...todo, completed: !todo.completed} : todo
        );
        saveTodos();
        renderTodos();
        updateTodoCount();
    }

    // Render todos
    function renderTodos() {
        const filteredTodos = filterTodos();
        todoList.innerHTML = filteredTodos.map(todo => `
            <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="todo-text">${todo.text}</span>
                <button class="delete-todo">Delete</button>
            </li>
        `).join('');
    }

    // Filter todos
    function filterTodos() {
        switch(currentFilter) {
            case 'active':
                return todos.filter(todo => !todo.completed);
            case 'completed':
                return todos.filter(todo => todo.completed);
            default:
                return todos;
        }
    }

    // Update todo count
    function updateTodoCount() {
        const activeTodos = todos.filter(todo => !todo.completed).length;
        todoCount.textContent = `${activeTodos} item${activeTodos !== 1 ? 's' : ''} left`;
    }

    // Save todos to localStorage
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Event Listeners
    addTodoBtn.addEventListener('click', () => addTodo(todoInput.value));

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo(todoInput.value);
        }
    });

    todoList.addEventListener('click', (e) => {
        const todoItem = e.target.closest('.todo-item');
        if (!todoItem) return;

        const id = parseInt(todoItem.dataset.id);

        if (e.target.classList.contains('delete-todo')) {
            deleteTodo(id);
        } else if (e.target.classList.contains('todo-checkbox')) {
            toggleTodo(id);
        }
    });

    clearCompletedBtn.addEventListener('click', () => {
        todos = todos.filter(todo => !todo.completed);
        saveTodos();
        renderTodos();
        updateTodoCount();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTodos();
        });
    });
}); 