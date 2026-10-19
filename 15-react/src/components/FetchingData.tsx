import { useEffect, useState } from "react"
import axios from "axios"

interface User {
  id: number
  first_name: string
  last_name: string
  email: string
}

interface UsersState {
  users: User[]
  error: string
  loading: boolean
}

export default function FetchingData() {
  const [usersState, setUsersState] = useState<UsersState>({
    users: [],
    error: "",
    loading: false,
  })

  async function fetchUsers() {
    try {
      // use prevUse and not usersState to avoid dependency warning
      setUsersState((prevState) => {
        return {
          ...prevState,
          loading: true,
        }
      })
      const res = await axios.get<User[]>("http://127.0.0.1:3000/")
      setUsersState(() => {
        return {
          users: res.data,
          loading: false,
          error: "",
        }
      })
    } catch (error) {
      setUsersState(() => {
        return {
          users: [],
          loading: false,
          // in a catch block `error` is `unknown`, so check its type before reading .message
          error: error instanceof Error ? error.message : "Unknown error",
        }
      })
    }
  }

  
  useEffect(() => {
    fetchUsers()
  }, [])


  return (
    <div>
      <div>{usersState.loading && "Loading..."}</div>
      <div>{usersState.error}</div>
      <ul>
        {usersState.users.map((user) => (
          <li key={user.id}>
            ID: <b>{user.id}</b>, Full Name:{" "}
            <b>
              {user.first_name} {user.last_name}
            </b>
            , Email: <b>{user.email}</b>
          </li>
        ))}
      </ul>
    </div>
  )
}
