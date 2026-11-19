const repositoryList = document.querySelector("#repositories");

async function loadRepositories() {
  try {
    const response = await fetch("./events.json");
    if (!response.ok) {
      throw new Error(`Could not load repositories (${response.status}).`);
    }

    const repositories = await response.json();
    repositoryList.replaceChildren();

    for (const repository of repositories) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = repository.url;
      link.textContent = repository.name;

      const description = document.createElement("p");
      description.textContent = repository.description;

      const date = document.createElement("span");
      date.className = "starred-date";
      date.textContent = `Starred on ${repository.starredAt}`;

      item.append(link, description, date);
      repositoryList.append(item);
    }
  } catch (error) {
    repositoryList.replaceChildren();
    const message = document.createElement("li");
    message.className = "error";
    message.textContent = "Unable to load starred repositories. Please try again later.";
    repositoryList.append(message);
    console.error(error);
  }
}

loadRepositories();
