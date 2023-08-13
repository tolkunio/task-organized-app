import {AxiosResponse} from 'axios';
import {instance, BaseResponseType, UserData} from 'common/api/api';
export const authAPI={
    login(data:LoginParamsType){
        return instance.post<BaseResponseType<{userId:string}>, AxiosResponse<BaseResponseType<{userId:string}>>,
            LoginParamsType>(`auth/login`,data);
    },
    me(){
        return instance.get<BaseResponseType<UserData>>('auth/me');
    },
    logout(){
        return instance.delete<BaseResponseType<{userId?:number}>>('auth/login');
    }
}
export type LoginParamsType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: string;
};