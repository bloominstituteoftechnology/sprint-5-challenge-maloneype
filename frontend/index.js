// const { Axios } = require("axios")

async function sprintChallenge5() { 
  // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇
  const getLearners = await axios.get("http://localhost:3003/api/learners")
  const getMentors = await axios.get("http://localhost:3003/api/mentors")
  const learners = getLearners.data
  const mentors = getMentors.data

  
  // ** Create card object that combines learnes and mentors **
  const learnerCardArr = learners.map(learner => {
    const cardObj = {
      ...learner, 
      mentorNames: learner.mentors.map(mentorID => {
        const mentor =  mentors.find(mentor => mentor.id === mentorID)
        return `${mentor.firstName} ${mentor.lastName}`
      })
    }
    return cardObj
  })
  
  const info = document.querySelector(".info")
  info.textContent = "No learner is selected"
  
  function createLearnerCard(learnerCard) {
    
    const cards = document.querySelector(".cards")

    //create the card classes as children of the cards class
    const card = document.createElement("div")
    card.classList.add("card")
    cards.appendChild(card)

    const fullName = document.createElement("h3")
    fullName.textContent = learnerCard.fullName + ", ID " + learnerCard.id
    card.appendChild(fullName)


    const email = document.createElement("div")
    email.textContent = learnerCard.email
    card.appendChild(email)

    const mentors = document.createElement("h4")
    mentors.classList.add("closed")
    mentors.textContent = "Mentors"
    card.appendChild(mentors)

    const mentorList = document.createElement("ul")
    card.appendChild(mentorList)
    learnerCard.mentorNames.forEach(mentorName => {
      const mentor = document.createElement("li")
      mentor.textContent = mentorName
      mentorList.appendChild(mentor)
    })
    // add event handlers:
    
    // card event handler:
    // remove class "selected" from all other cards
    // add class "selected" to target
    // change class "info" text content to "The selected learner is ... "
    card.addEventListener("click", (event) => {
      const alreadySelected = card.classList.contains("selected")
      document.querySelectorAll(".card").forEach(card => {card.classList.remove("selected")})
      if (!alreadySelected) {event.currentTarget.classList.toggle("selected")}
      const cardElements = Array.from(cards.children)
      const cardIndex = cardElements.indexOf(event.currentTarget)
      if (cards.querySelectorAll(".selected").length === 0) {
        info.textContent = "No learner is selected"
      } else {
        info.textContent = `The selected learner is ${learnerCardArr[cardIndex].fullName}`
      }
      console.log("card clicked")
    })
    
    // h4 event handler - toggle "open" and "closed" class
    const myh4 = card.querySelector("h4").addEventListener("click", event => {
      event.currentTarget.classList.toggle("open")
      event.currentTarget.classList.toggle("closed")
    })
  }

  learnerCardArr.forEach(card => {
    createLearnerCard(card)
  })
  
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
