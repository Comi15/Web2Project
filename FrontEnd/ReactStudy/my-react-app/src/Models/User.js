class UserDto{
    constructor(username,email,password,name,lastName,adress,role,birthDate){
        this.username = username;
        this.email = email;
        this.password = password;
        this.name = name;
        this.lastName = lastName;
        this.adress = adress;
        this.role = role;
        this.birthDate = birthDate;
        
    }
}
export default UserDto;