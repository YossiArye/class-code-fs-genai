import { useState } from 'react'
import BadChild from './BadChild'
import GoodChild from './GoodChild'

interface Todo {
  name: string
  id: number
}

export default function Parent() {
  const [list, setList] = useState<Todo[]>([
    { name: 'Foo1444610101010', id: 1444610101010 },
    { name: 'Bar1444600000000', id: 1444600000000 },
  ])

  const addItem = () => {
    const id = +new Date()
    setList((prev) => [{ name: 'Baz' + id, id }, ...prev])
  }

  return (
    // We have 2 problems when we pass index as key, in case we adding element to the begining or deleting element from the middle, lets take the scenario of adding element to the begining after we enter a value to the original first element:
    // 1. Since the first element got always the 'key' 0, React will update the first element with the new element, but since it is an 'update' and not an 'insersion', the value of the input from the original firt element will stay in the input of the new first element
    // 2. Since we change the key for all the list element, it will lead to re-rendering of all elements instead of the only new one

    //When to use index as a key?
    //1. The items don't have unique id
    //2. The list static and won't be changed
    <div>
      <button onClick={addItem}>Add item to the beginning of the list</button>

      <h2>Index As A Key</h2>
      <form>
        {list.map((todo, index) => (
          <BadChild {...todo} key={index} />
        ))}
      </form>
      <h2>Id As A Key</h2>
      <form>
        {list.map((todo) => (
          <GoodChild {...todo} key={todo.id} />
        ))}
      </form>
    </div>
  )
}
