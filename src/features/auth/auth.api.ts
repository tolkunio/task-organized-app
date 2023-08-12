import {LoginParamsType} from 'features/auth/Login';
import {AxiosResponse} from 'axios';
import {instance, ResponseType, UserData} from 'common/api/api';
export const authAPI={
    login(data:LoginParamsType){
        return instance.post<ResponseType<{userId:string}>, AxiosResponse<ResponseType<{userId:string}>>,
            LoginParamsType>(`auth/login`,data);
    },
    me(){
        return instance.get<ResponseType<UserData>>('auth/me');
    },
    logout(){
        return instance.delete<ResponseType<{userId?:number}>>('auth/login');
    }
}