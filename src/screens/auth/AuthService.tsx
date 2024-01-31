import auth from '@react-native-firebase/auth'

export const passwordLogin = async(email: string, password: string) => {
    var status = false
    const res = await auth().signInWithEmailAndPassword(email, password)
    .then(()=>{
        console.log('Account created')
        status = true
    }).catch((error:any) => {
        console.log('Error:', error.code)
    })
    console.log(status)
    return status;
}

export const logout = () => {
    auth().signOut().then(()=> console.log('Logout'))
}