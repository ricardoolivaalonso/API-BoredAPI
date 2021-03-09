/*
http://www.boredapi.com/api/activity?type=education
http://www.boredapi.com/api/activity?type=charity
http://www.boredapi.com/api/activity?type=recreational
http://www.boredapi.com/api/activity?type=relaxation
http://www.boredapi.com/api/activity?type=busywork
http://www.boredapi.com/api/activity?type=social
http://www.boredapi.com/api/activity?type=diy

http://www.boredapi.com/api/activity?participants=1
http://www.boredapi.com/api/activity?participants=2
http://www.boredapi.com/api/activity?participants=3
http://www.boredapi.com/api/activity?participants=4
*/
let form = document.querySelector('#form')
let cards = document.querySelector('#cards')
let activity = document.querySelector('#activity')
let participants = document.querySelector('#participants')
let template = document.querySelector('#template').content
let tag_error = document.querySelector('#tag-error')

let getActivity = async (e) => {
    e.preventDefault()

    try {
        let res = await fetch(`https://www.boredapi.com/api/activity?type=${activity.value}&participants=${participants.value}`)
        let json = await res.json()
        cards.innerHTML = ''

        if(!res.ok) throw {status: res.status}

        if(!json.error){
            tag_error.classList.add('is-element-hidden')
            template.querySelector('.card__activity').textContent = json.activity
            template.querySelector('.card__type').textContent = json.type
            template.querySelector('.card__number').textContent = json.participants
            let clone = document.importNode(template,true)
            cards.appendChild(clone)
        }
        else{
            tag_error.classList.remove('is-element-hidden')
        }

    } catch ( err) {
        console.log(err.status)
    }
}

form.addEventListener('submit', getActivity)
NiceSelect.bind(document.getElementById("activity"))
NiceSelect.bind(document.getElementById("participants"))
