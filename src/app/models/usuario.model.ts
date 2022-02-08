export class Usuario {

    static fromFirebase( { user_id, nombre, email } : { user_id:any, nombre:any, email:any }) {
        return new Usuario( user_id, nombre, email );
    }

    constructor(
        public user_id: string,
        public nombre: string,
        public email: string,
    ){}

}