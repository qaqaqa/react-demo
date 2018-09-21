import * as React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { di } from 'jsmodules';
import HicoinService from '../../../services/hicoin';
import { SessionState } from '../../../stores/session';
import { observer } from 'mobx-react';

@observer
class Account extends React.Component<any, any> {
    @di.Inject() hicoinService: HicoinService;
    @di.Inject() session: SessionState;
    OnLogin=async()=>{
        var emailInputText:any = this.refs.email;
        var passwordInputText:any = this.refs.password;
        var email = emailInputText._lastNativeText;
        var password = passwordInputText._lastNativeText;
        email = 'Fanlin9527@gmail.com';
        password = '123456';
        if (email && password) {
            try {
                var success = await this.session.login(email, password);
                if (success) {
                    this.props.history.push("/home");
                } else {
                    alert("登录失败");
                }
            } catch (ex) {
                alert(ex.message);
            } finally {
            }
        }
    }

    OnRegister=async()=>{
        
        var emailInputText:any = this.refs.email;
        var passwordInputText:any = this.refs.password;
        var email = emailInputText._lastNativeText;
        var password = passwordInputText._lastNativeText;
        if (email && password) {
            try {
                var response = await this.hicoinService.regist(email, password);
                if (response.data) {
                    alert("已经提交注册,注册成功后我们将用邮件通知你");
                } else {
                    alert("已经注册过了,如果没有收到邮件,请联系管理员");
                }
            } catch (ex) {
                alert('注册失败:' + ex.message);
            } finally {
            }
        }
    }

    render() {
        return <View style={styles.bgView}>
            <TextInput
                ref='email'
                autoFocus={true}
                returnKeyType="done"
                placeholder={'Please input your username'}
                autoCorrect={false}
                placeholderTextColor="black"
                style={styles.textInput}>
            </TextInput>
            <TextInput
                ref='password'
                autoFocus={true}
                returnKeyType="done"
                placeholder={'Please input your password'}
                autoCorrect={false}
                placeholderTextColor="black"
                style={styles.textInput}>
            </TextInput>
            <View style={styles.bgTextInputView}>
                <View>
                    <TouchableOpacity style={styles.touchable1} onPress={this.OnRegister}>
                        <Text style={styles.touchableText1}>注册</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.touchable2} onPress={this.OnLogin}>
                        <Text style={styles.touchableText1}>登陆</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    }
}

export default Account;

const styles = StyleSheet.create({
    bgView: {
        height:1000,
        backgroundColor: 'white',
        paddingTop:100
    },
    textInput: {
        backgroundColor: 'gray',
        width: '80%',
        marginLeft: 15,
        fontSize: 20,
        borderRadius: 5,
        marginBottom:20
    },
    touchable1: {
        backgroundColor: 'red',
        height: 40,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginLeft:15
    },
    touchableText1: {
        backgroundColor: 'transparent',
    },
    touchable2: {
        backgroundColor: 'yellow',
        height: 40,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginLeft: '50%',
    },
    bgTextInputView: {
        flexDirection: 'row',
        marginTop: 15,
    },
})