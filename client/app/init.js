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
  const divEl = document.getElementById('output');
  divEl.classList.add('d-block');
  divEl.appendChild(ul);

   const ShowBtn = document.getElementById("showAll");
    ShowBtn.addEventListener("click", function(){
      if ($("#output").hasClass('d-none')){
        $("#output").removeClass('d-none');
        $("#output").addClass('d-block');
      }
      else if ($("#output").hasClass('d-block')) {
        $("#output").removeClass('d-block');
        $("#output").addClass('d-none');
      }
    })
}


