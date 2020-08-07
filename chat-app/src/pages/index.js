import React, { useState } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"

const IndexPage = () => {
  const [room, setRoom] = useState("")
  const [name, setName] = useState("")

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi,</h1>
      <p>Enter Your name and a Room.</p>
      <div>
        <input
          type="text"
          value={room}
          onChange={event => setRoom(event.target.value)}
          placeholder="Room"
        />
        <input
          type="text"
          value={name}
          onChange={event => setName(event.target.value)}
          placeholder="Name"
        />
        <Link
          onClick={event =>
            room.length && name.length ? null : event.preventDefault()
          }
          to={"/chat?room=" + room + "&name=" + name}
        >
          <button>Join</button>
        </Link>
      </div>
    </Layout>
  )
}

export default IndexPage
