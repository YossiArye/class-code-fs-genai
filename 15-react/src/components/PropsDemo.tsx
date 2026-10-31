import { useState, type ReactNode } from 'react'

// 1. Props are the component's "arguments". The interface describes their shape.
interface UserCardProps {
  name: string
  age: number
  role?: string // optional prop
  onSelect: (name: string) => void // functions can be passed as props (child -> parent communication)
  children?: ReactNode // whatever is written between <UserCard> ... </UserCard>
}

// 2. Destructure props in the parameter list, and give optional ones a default value.
function UserCard({ name, age, role = 'Student', onSelect, children }: UserCardProps) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>
        Age: {age} · Role: {role}
      </p>
      {children}
      <button onClick={() => onSelect(name)}>Select</button>
    </div>
  )
}

export default function PropsDemo() {
  const [selected, setSelected] = useState('nobody')

  // Data flows DOWN through props, events flow UP through callback props.
  const students = [
    { id: 1, name: 'Dana', age: 24 },
    { id: 2, name: 'Avi', age: 31, role: 'Mentor' },
  ]

  return (
    <section>
      <h1>Props demo</h1>
      <p>
        Selected: <b>{selected}</b>
      </p>

      {/* Literal values: strings in quotes, everything else in {} */}
      <UserCard name="Yossi" age={35} role="Teacher" onSelect={setSelected}>
        <em>This text is the `children` prop.</em>
      </UserCard>

      {/* Rendering from data, and spreading an object as props */}
      {students.map((student) => (
        <UserCard key={student.id} {...student} onSelect={setSelected} />
      ))}

      <p className="hint">
        Props are read-only: a component must never modify its own props. To change what a child
        shows, the parent changes the value it passes down.
      </p>
    </section>
  )
}
