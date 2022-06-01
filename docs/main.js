function addDataToTable(gameTitle, selector, table, database) {
	gameTitle.innerHTML = selector.selectedOptions[0].label
	const gameData = database[selector.value]
	const node = document.createElement("th")
	node.append("Platform")
	table.children[0].children[0].appendChild(node)

	gameData.platforms.forEach(platform => {
		const node = document.createElement("th")
		node.append(platform)
		table.children[0].children[0].appendChild(node)
	});

	for (let i = 0; i < gameData.list.length; i++) {
		const row = gameData.list[i]

		const node = document.createElement("tr")
		const cell = document.createElement("td")
		cell.append(gameData.platforms[i])
		node.appendChild(cell)

		row.forEach(element => {
			const cell = document.createElement("td")
			if (element === true) {
				cell.append("✓")
				cell.className = "table-success"
			} else if (element === false) {
				cell.append("✗")
				cell.className = "table-danger"
			} else {
				cell.append("∗")
				cell.className = "table-warning"
			}
			node.appendChild(cell)
		})

		table.children[1].appendChild(node)
	}

	const lastUpdatedElement = document.createElement("caption")
	const dateString = new Date(gameData.lastUpdated).toLocaleDateString()
	lastUpdatedElement.append(`Last updated: ${dateString}`)
	table.appendChild(lastUpdatedElement)

	if (gameData.footnote || gameData.seeMore) {
		const footnote = document.createElement("p")
		if (gameData.footnote) footnote.append(`*${gameData.footnote} `)
		if (gameData.seeMore) {
			const link = document.createElement("a")
			link.setAttribute("href", gameData.seeMore)
			link.setAttribute("rel", "help")
			link.setAttribute("target", "_blank")
			link.append("Learn more.")
			footnote.appendChild(link)
		}
		document.getElementsByTagName("body")[0].appendChild(footnote)
	}

	const sourceElement = document.createElement("p")
	sourceElement.append("Sources:")
	const list = document.createElement("ul")
	gameData.sources.forEach((source) => {
		const element = document.createElement("li")

		const link = document.createElement("a")
		link.append(source)
		link.setAttribute("href", source)
		link.setAttribute("target", "_blank")

		element.appendChild(link)
		list.appendChild(element)
	})
	sourceElement.appendChild(list)
	document.getElementsByTagName("body")[0].appendChild(sourceElement)
}

fetch("database.json").then((response) => response.json()).then((database) => {
	const selector = document.getElementById("gameSelector")
	const gameTitle = document.getElementById("game")
	const table = document.getElementsByTagName("table")[0]

	Object.keys(database).sort().forEach((game) => {
		const option = document.createElement("option")
		option.setAttribute("value", game)
		option.append(database[game].displayName)
		selector.appendChild(option)
	})

	// Run first time
	addDataToTable(gameTitle, selector, table, database)
	
	selector.addEventListener("change", () => {
		// Reset table
		table.innerHTML = "";
		const thead = document.createElement("thead")
		const tr = document.createElement("tr")
		thead.appendChild(tr)
		table.appendChild(thead)
		const tbody = document.createElement("tbody")
		table.appendChild(tbody)

		// Clean paragraphs
		while (document.getElementsByTagName("p").length > 0) document.getElementsByTagName("p").item(0).remove()

		addDataToTable(gameTitle, selector, table, database)
	})
})
