document.getElementById("btn").addEventListener("click", async (e) => {
  try {
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
      data: houses
    })
  
    const requestsArr = []
    for (const house of houses) {
      requestsArr.push(
        fetch("http://localhost:3000/bulk-politicians", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(house.politicians),
        }),
      )
    }

     console.log({
      message: "Trying to get politicians from server",
      elemId: "btn",
      event: "click",
    })

    const politiciansHeaders = await Promise.all(requestsArr)
    

    const politiciansBodyReq = []
    for (const politicianHeader of politiciansHeaders) {
      politiciansBodyReq.push(politicianHeader.json())
    }

    const politiciansResponse = await Promise.all(politiciansBodyReq)

    console.log({
      message: "Successfully got politicians from server",
      elemId: "btn",
      event: "click",
      data: politiciansResponse
    })
  } catch (error) {
    console.error({ data: error.message })
  }
})

//callback hell
//then catch
//all settled
