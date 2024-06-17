function Login() {

    return <form>
        <div className="login-imput">
            <label>Email</label>
            <input type ="email" name="email" required > </input>
    </div>
    
    <div className="password-imput">
            <label>password</label>
            <input type ="password" name="password" required > </input>
    </div>
    <button type="submit" >Login</button>
    </form>
}


export default Login