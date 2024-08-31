class UpdateDto{
    constructor(currentPassword,newPassword,name,lastName,adress,birthDate){
        this.currentPassword = currentPassword;
        this.newPassword = newPassword
        this.name = name;
        this.lastName = lastName;
        this.adress = adress;
        this.birthDate = birthDate;
        
    }
}
export default UpdateDto;