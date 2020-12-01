const initialState = {
    showItem: {},
    editMode: false,
    todos: []
}

export default function rootReducer(state = initialState, action) {
    switch(action.type) {
        case "GET_ALL_TODOS":
            state.todos = action.todoLists;
            return {
                ...state,
            }
        case "ON_CHANGE_COLOR":
            let prevStete = state.showItem
            prevStete.color = action.color
            return {
                ...state,
                ...prevStete
            }
        case "CHANGE_DESCRIPTION":
            return {
                ...state,
                showItem: {...state.showItem, description: action.description}
            }
        case "CHANGE_TITLE":
            state.todos.map(item => {
                if(item.id === state.showItem.id){
                    return item
                }
            })
            return {
                ...state,
                showItem: {...state.showItem, title: action.title}
                    
            }
        case "CREATE_TODO":
            return {
                ...state,
                showItem: {title: "Title", description: "Description", color: "red"},
                editMode: true
            }
        case "SELECT":
            let newShowItem = state.todos.filter(item => item._id === action.selectedItem)
            return {
                ...state,
                editMode: false,                
                showItem: newShowItem[0]
            }
        case "EDIT":
            return {
                ...state,
                editMode: true
            }
        case "SAVE":
            if(action.edit){
                return{
                    ...state,
                    todos: [...action.newState],
                    editMode: false,
                }
            }else{
                return{
                    ...state,
                    todos: [...action.newState],
                    editMode: false,
                }
            }
        case "DELL":
            return {
                ...state,
                editMode: false,
                showItem: {},
                todos: [...action.newState]
            }
        default:
            return state
    }
}