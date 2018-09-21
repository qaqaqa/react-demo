import { di } from 'jsmodules';
import { UserService } from '../../services/user';
import { observable } from 'mobx';



export class RegisterState {

    @di.Inject() userService: UserService;

    @observable email_exists?: boolean = null;
    @observable username_exists?: boolean = null;
    async checkEmail(email) {
        try {
            var response = await this.userService.checkEmail(email);
            if (response.status == 200) {
                this.email_exists = response.data;
                return null;
            }
            return response.data.message;
        } catch (ex) {
            if (ex&&ex.response) {
                var errResponse = ex.response;
                var data = errResponse.data;
                return data.message;
            }
            return ex.message;
        }
    }
    async checkUserName(username) {
        try {
            var response = await this.userService.checkUserName(username);
            if (response.status == 200) {
                this.username_exists = response.data;
            }
            return response.data.message;
        } catch (ex) {
            if (ex&&ex.response) {
                var errResponse = ex.response;
                var data = errResponse.data;
                return data.message;
            }
            return ex.message;
        }
    }

    async register(email, password, username) {
        try {
            var response = await this.userService.register({
                email,
                password,
                username
            });
            if(response.data.code&&response.data.message){
                return response.data.message
            }
        } catch (ex) {
            if (ex&&ex.response) {
                var errResponse = ex.response;
                var data = errResponse.data;
                return data.message;
            }
            return ex.message
        }
    }

}