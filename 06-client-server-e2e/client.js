document.getElementById("btn").addEventListener("click", async (e) => {
  try {
    const finalData = []

    console.log({
      message: "Trying to get houses from server",
      elemId: "btn",
      event: "click",
    })
    const housesHeaders = await fetch("http://localhost:3000/houses", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    const houses = await housesHeaders.json()
    console.log({
      message: "Successfully got houses from server",
      elemId: "btn",
      event: "click",
      data: houses,
    })

    const politiciansRequestsArr = []
    for (const house of houses) {
      const { name: houseName } = house
      finalData.push({ houseName })

      politiciansRequestsArr.push(
        fetch("http://localhost:3000/bulk-politicians", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(house.politicians),
        }),
      )
    }

    console.log(finalData)

    console.log({
      message: "Trying to get politicians from server",
      elemId: "btn",
      event: "click",
    })

    const politiciansHeaders = await Promise.all(politiciansRequestsArr)

    const politiciansBodyReq = []
    for (const politicianHeader of politiciansHeaders) {
      politiciansBodyReq.push(politicianHeader.json())
    }

    const politiciansResponse = await Promise.all(politiciansBodyReq)

    console.log({
      message: "Successfully got politicians from server",
      elemId: "btn",
      event: "click",
      data: politiciansResponse,
    })

    const rolesToFetch = []
    for (const politiciansArrIndex in politiciansResponse) {
      finalData[politiciansArrIndex].politicians =
        politiciansResponse[politiciansArrIndex]
      for (const politician of politiciansResponse[politiciansArrIndex]) {
        if (!rolesToFetch.includes(politician.role)) {
          rolesToFetch.push(politician.role)
        }
      }
    }

    console.log(finalData)

    console.log({
      message: "Trying to get roles from server",
      elemId: "btn",
      event: "click",
    })

    const rolesHeaders = await fetch("http://localhost:3000/bulk-roles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rolesToFetch),
    })

    const roles = await rolesHeaders.json()

    console.log({
      message: "Successfully got roles from server",
      elemId: "btn",
      event: "click",
      data: roles,
    })

    for (const houseData of finalData) {
      for (const politician of houseData.politicians) {
        politician.role = roles.find((role) => role.id === politician.role)
      }
    }

    console.log(finalData)
  } catch (error) {
    console.error({ data: error.message })
  }
})

//callback hell
//then catch
//all settled
