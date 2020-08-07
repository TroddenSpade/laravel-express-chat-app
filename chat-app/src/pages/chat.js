import React, { useEffect, useState } from "react"
import io from "socket.io-client"
import queryString from "query-string"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SOCKET_ADDRESS = "http://localhost:6001"
let socket

const Chat = props => {
  const [name, setName] = useState("")
  const [room, setRoom] = useState("")
  const [msg, setMsg] = useState("")
  const [msgs, setMsgs] = useState([])

  useEffect(() => {
    const { room, name } = queryString.parse(props.location.search)

    setRoom(room)
    setName(name)

    socket = io(SOCKET_ADDRESS)
    socket.emit("join", { room })

    return () => {
      socket.emit("disconnect")
      socket.off()
    }
  }, [props.location.search])

  useEffect(() => {
    socket.on("get_message", msg => {
      setMsgs([...msgs, msg])
    })
  })

  return (
    <Layout>
      <SEO title="Page two" />
      <div>
        {msgs.map(e => (
          <h1>{e}</h1>
        ))}
      </div>
      <input
        type="text"
        value={msg}
        onChange={event => setMsg(event.target.value)}
        // placeholder="Name"
      />
      <button
        onClick={event =>
          msg.length
            ? socket.emit("send_message", { msg, room })
            : event.preventDefault()
        }
      >
        send
      </button>
    </Layout>
  )
}

export default Chat
