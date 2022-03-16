const inputs = document.querySelectorAll(".input");


function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

function form1(){
	var form1 = document.getElementById("form1")
	var form2 = document.getElementById("form2")
	form1.style.transition = 1.2+"s";
	form1.style.opacity = 0;
	setTimeout(()=>{
		form1.style.display = "none";
		form1.style.opacity = 1;
		form2.style.display = "block"
	},1000)
}

function form2(){
	var form1 = document.getElementById("form1")
	var form2 = document.getElementById("form2")
	form2.style.transition = 1.2+"s";
	form2.style.opacity = 0;
	setTimeout(()=>{
		form2.style.display = "none";
		form2.style.opacity = 1;
		form1.style.display = "block"
	},1000)
}

function register(){
	var newpass = document.getElementById("newpass").value //password
        if(newpass > 6){
            var email = document.getElementById("newemail").value //email
            var username = document.getElementById("newuser").value //name
            var pass = document.getElementById("newpass").value //password
			var reader = new FileReader()
			var profile = document.getElementById('image').files[0].name

			reader.addEventListener('load', function() {
				console.log("enter")
				if (this.result) {
					let user  =[ {  // userdetail object
						email: email,
						username:username,
						pass:pass,
						profile: this.result
					}];
					var json = JSON.stringify(user); //converting to String
					localStorage.setItem(username,json)
			
					console.log("added")
					alert("image stored");
					showimage()
				} else {
					alert("not");
				}
			})
			reader.readAsDataURL(document.getElementById('image').files[0])
            window.location.href = "./index.html"
			localStorage.setItem("carduser",username);
        }
        else{
            alert("more than 6")
        }
}


function login(){
	console.log("pass")
    let user = document.getElementById("user").value
    let pass = document.getElementById("pass").value
    
    var result = localStorage.getItem(user)  // geting item from local dtorage
    var array = result.split(',')  // format : {"username":"Hari"}
    var string = array.toString(); // splitint "" and :
    var Spass = string.split('"') // array[11] will be password

    console.log(user,pass)

    if(user == "" || pass == ""){ 
        console.log("Please fill")                     
    }

    else{
        if(pass == Spass[11]){
            console.log("log")
            window.location.href = "./index.html"
            localStorage.setItem("carduser",user);
        }
        else{
            console.log("NO user")
        }
    }
	document.cookie = `username=${user};`
	document.cookie = `password=${pass};`

	
}


function getCookie(name,pass) {
	var name = document.cookie.split('; ').find(x => x.startsWith(name+'='));
	var pass = document.cookie.split('; ').find(x => x.startsWith(pass+'='));
	if (name && pass)
	var coname = name.split('=')[1]
	var copass = pass.split('=')[1]

    var result = localStorage.getItem(coname)  // geting item from local dtorage
    var array = result.split(',')  // format : {"username":"Hari"}
    var string = array.toString(); // splitint "" and :
    var Spass = string.split('"') 
	console.log(coname,Spass[11])
	if(copass == Spass[11]){
		console.log("log")
		window.location.href = "./index.html"
		localStorage.setItem("carduser",coname);
	}
}

getCookie("username","password")
