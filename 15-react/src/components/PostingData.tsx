import { useEffect, useState } from "react"
import axios from "axios"

interface User {
  id: number
  first_name: string
  last_name: string
}

interface DataState {
  isLoading: boolean
  users: User[]
  error: string
}

export default function PostingData() {
  const [ids, setIds] = useState<number[]>([])
  const [checks, setChecks] = useState([
    { id: 1, checked: false },
    { id: 2, checked: false },
    { id: 3, checked: false },
    { id: 4, checked: false },
    { id: 5, checked: false },
    { id: 6, checked: false },
  ])
  const [dataState, setDataState] = useState<DataState>({
    isLoading: false,
    users: [],
    error: "",
  })

  async function postUsers() {
    try {
      setDataState((prevState) => ({ ...prevState, isLoading: true }))

      const res = await axios.post<User[]>(
        "http://localhost:3000/bulk-politicians",
        ids,
      )
      console.log("res")
      console.log(res)
      setDataState({
        error: "",
        isLoading: false,
        users: res.data,
      })
    } catch (error) {
      setDataState({
        users: [],
        isLoading: false,
        // in a catch block `error` is `unknown`, so check its type before reading .message
        error: error instanceof Error ? error.message : "Unknown error",
      })
    }
  }

  useEffect(() => {
    postUsers()
  }, [ids])

  const pushIds = () => {
    const filtered = checks.filter((obj) => obj.checked)
    console.log(filtered)
    const mapped = filtered.map((obj) => obj.id)
    console.log(mapped)
    setIds(mapped)
  }

  
  return (
    <div>
      <form>
        {checks.map((check, index) => (
          <div key={check.id}>
            <label>ID {check.id}</label>
            <input
              type="checkbox"
              checked={checks[index].checked}
              onChange={(event) => {
                setChecks(
                  [
                    ...checks.filter((obj) => obj.id !== check.id),
                    { id: check.id, checked: event.target.checked },
                  ].sort((a, b) => a.id - b.id),
                )
              }}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            pushIds()
          }}
        >
          Submit
        </button>
      </form>

      <div>
        <div>{dataState.isLoading && "Loading..."}</div>
        <div>{dataState.error}</div>
        <ul>
          {dataState.users.map((user) => (
            <li key={user.id}>
              Full Name: {user.first_name} {user.last_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
