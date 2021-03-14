const key = "_idMax"
let id: number = parseInt(window.localStorage.getItem(key) || '0') || 0

function createId(){
    id++
    window.localStorage.setItem(key, id.toString())
    return id

}
export default createId