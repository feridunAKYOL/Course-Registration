export const init = async () => {

  const res = await fetch('/api/profiles');
  const data = await res.json();
  const ul = document.createElement('ul');
  for (let profile of data){
    const li = document.createElement('li');
    const profileID = JSON.stringify(profile.id).split('"').join('');
    const profileName = JSON.stringify(profile.first_name).split('"').join('');
    const profileLastName = JSON.stringify(profile.last_name).split('"').join('');
    li.textContent = profileID +' '+ profileName + ' ' + profileLastName;
     ul.appendChild(li);
   }
  const Allbutton = document.createElement('button');
  Allbutton.textContent = 'all APPLICANTS' ;
  Allbutton.classList.add('btn');
  Allbutton.classList.add('btn-outline-primary');
  Allbutton.classList.add('btn-block');
  const div= document.getElementById('output');
  div.appendChild(Allbutton);
  div.appendChild(ul);
}


