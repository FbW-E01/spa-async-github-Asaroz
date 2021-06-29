const form = document.querySelector("#gitForm")
const uname = document.querySelector("#gitName")
const list = document.querySelector("#repoList")

form.addEventListener("submit",getRepos)

async function getRepos(e){
    list.innerHTML=""
    try {    e.preventDefault()
        const url="https://api.github.com/search/repositories?q="+encodeURIComponent("user:"+uname.value)
        const response = await fetch(url)
        const result = await response.json()
        for(item in result.items){
            let repo = result.items[item]

            let repoItem = document.createElement("li")
            repoItem.addEventListener("click",()=>{
                window.location.href = repo.html_url
            })
            console.log(repo)
            let repoContainer = document.createElement("div")
            repoContainer.classList.add("repoContainer")

            let repoHead = document.createElement("h3")
            repoHead.innerText = repo.name

            let repoDesc = document.createElement("div")
            repoDesc.innerText = repo.description

            let repoTime = document.createElement("div")
            repoTime.innerText = repo.created_at

            list.appendChild(repoItem)
            repoItem.appendChild(repoContainer)
            repoContainer.appendChild(repoHead)
            repoContainer.appendChild(repoDesc)
            repoContainer.appendChild(repoTime)
        }
    }catch(error){
        console.log(error)
    }
}