const TODO_KEY = 'Arr';

export function getInitialTodos() {
    const storageValue = localStorage.getItem(TODO_KEY);

    try {
        return storageValue ? JSON.parse(storageValue) : [];
    } catch {
        return [];
    }
}

export function setInitialTodos(currentValue) {
    localStorage.setItem(TODO_KEY, JSON.stringify(currentValue));
}