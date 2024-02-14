function LoginValidation(values) {
    let errors = {}
   
    if (values.username === "") {
        errors.username = "Please enter your username"
    }

    if (values.password === "") {
        errors.password = "Please enter your password"
    }

    return errors;
}

export default LoginValidation;