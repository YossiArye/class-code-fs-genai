const btn = document.getElementById("load-btn")
const statusEl = document.getElementById("status")
const errorEl = document.getElementById("error-msg")
const grid = document.getElementById("houses-grid")

// ── Render ────────────────────────────────────────────────

function renderHouses(finalData) {
  grid.innerHTML = ""

  for (const houseData of finalData) {
    const card = buildHouseCard(houseData)
    grid.appendChild(card)
  }
}

function buildHouseCard({ houseName, politicians }) {
  const card = document.createElement("div")
  card.className = "house-card"

  const initials = houseName.slice(0, 2).toUpperCase()

  card.innerHTML = `
    <div class="house-header">
      <div class="house-icon">${initials}</div>
      <span class="house-title">${houseName}</span>
      <span class="house-count">${politicians.length} members</span>
      <span class="chevron">▼</span>
    </div>
    <div class="politicians-list">
      <div class="divider"></div>
      <div class="politicians-inner">
        ${politicians.map(buildPoliticianHTML).join("")}
      </div>
    </div>
  `

  card.querySelector(".house-header").addEventListener("click", () => {
    card.classList.toggle("open")
  })

  // Wire up role badge clicks after insertion
  card.querySelectorAll(".role-badge").forEach((badge) => {
    badge.addEventListener("click", (e) => {
      e.stopPropagation()
      toggleCredentials(badge)
    })
  })

  return card
}

function buildPoliticianHTML(politician) {
  const { first_name, last_name, email, role } = politician
  const initials = `${first_name[0]}${last_name[0]}`
  const roleId = role?.id ?? ""
  const roleName = role?.name ?? "Unknown"
  const credentials = role?.credentials ?? []

  const credentialsHTML = credentials
    .map((c) => `<span class="credential-tag">${c}</span>`)
    .join("")

  return `
    <div class="politician">
      <div class="politician-avatar">${initials}</div>
      <div class="politician-info">
        <div class="politician-name">${first_name} ${last_name}</div>
        <div class="politician-email">${email}</div>
      </div>
      <div class="role-wrapper">
        <span class="role-badge" data-role-id="${roleId}">
          ★ ${roleName}
        </span>
        <div class="credentials-popover" style="display:none">
          <h4>Credentials</h4>
          ${credentialsHTML || '<span style="color:#6b7280;font-size:0.8rem">None</span>'}
        </div>
      </div>
    </div>
  `
}

function toggleCredentials(badge) {
  const popover = badge.nextElementSibling
  const isOpen = popover.style.display !== "none"

  // Close all other open popovers
  document.querySelectorAll(".credentials-popover").forEach((p) => {
    p.style.display = "none"
  })

  if (!isOpen) popover.style.display = "block"
}

// Close popovers when clicking outside
document.addEventListener("click", () => {
  document.querySelectorAll(".credentials-popover").forEach((p) => {
    p.style.display = "none"
  })
})

// ── Fetch ─────────────────────────────────────────────────

btn.addEventListener("click", async () => {
  btn.disabled = true
  errorEl.style.display = "none"
  grid.innerHTML = ""
  setStatus('<span class="spinner"></span> Fetching houses…')

  try {
    const finalData = []

    const housesRes = await fetch("http://localhost:3000/houses", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    const houses = await housesRes.json()

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

    setStatus('<span class="spinner"></span> Fetching politicians…')

    const politiciansHeaders = await Promise.all(politiciansRequestsArr)
    const politiciansResponse = await Promise.all(
      politiciansHeaders.map((r) => r.json()),
    )

    const rolesToFetch = []
    for (const [i, politiciansArr] of politiciansResponse.entries()) {
      finalData[i].politicians = politiciansArr
      for (const politician of politiciansArr) {
        if (!rolesToFetch.includes(politician.role)) {
          rolesToFetch.push(politician.role)
        }
      }
    }

    setStatus('<span class="spinner"></span> Fetching roles…')

    const rolesRes = await fetch("http://localhost:3000/bulk-roles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rolesToFetch),
    })
    const roles = await rolesRes.json()

    for (const houseData of finalData) {
      for (const politician of houseData.politicians) {
        politician.role = roles.find((role) => role.id === politician.role)
      }
    }

    setStatus("✓ Data loaded — click a house to see its members")
    renderHouses(finalData)
  } catch (error) {
    setStatus("")
    errorEl.textContent = `Error: ${error.message}`
    errorEl.style.display = "block"
  } finally {
    btn.disabled = false
  }
})

function setStatus(html) {
  statusEl.innerHTML = html
}
