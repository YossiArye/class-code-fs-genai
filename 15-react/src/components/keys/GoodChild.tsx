interface Props {
  name: string
  id: number
}

export default function GoodChild({ name }: Props) {
  return (
    <div style={{ margin: '10px' }}>
      <label>{name}</label>
      <div>
        <input type="text" />
      </div>
    </div>
  )
}
