type StringOrNumber = string | number


type UserT = { name : string, uid: StringOrNumber}


let user1 : UserT


user1 = {
   name: "Meir",
   uid: 47656438568734
}






interface Config {
     name : string 
}

interface Config {
    uid: StringOrNumber
}

const config : Config = {name: "Hilli", uid: 90}


type Status = 'online' | 'offline' | 'away'

const sta : Status = 'offline'

class Cono implements Config {
    name : string
    uid: string

    /**
     *
     */
    constructor(name : string, uid: string) {
        this.name = name
        this.uid = uid
        
    }
}