import { useState } from 'react'

export default function PersonForm() {
  const [person, setPerson] = useState({ name: '', age: '' })

  return (
    <div>
      <input
        placeholder="Name"
        value={person.name}
        onChange={e => setPerson({ ...person, name: e.target.value })}
      />
      <input
        placeholder="Age"
        type="number"
        value={person.age}
        onChange={e => setPerson({ ...person, age: e.target.value })}
      />
      <p>
        {person.name} {person.age}
      </p>
    </div>
  )
}
