export const Validation = (data) =>{
  console.log(data)
    if(!(data.password===data.conformPassword)){
      alert("Password Doesn't match");
      return false;
    }
    let passwordRegEx = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;
    if(!data.password.match(passwordRegEx)){
      alert("password is less secure use atlest 8char && ([A-Z],[a-z],[@$%])");
      return false;
    }
    return true;
}
