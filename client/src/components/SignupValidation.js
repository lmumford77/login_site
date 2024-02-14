function SignupValidation(values) {
    let errors = {}
    const namePattern = /^[a-zA-Z,'-]+$/
    const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

    if (values.first_name === "") {
        errors.first_name = "Please enter your first name"
    } else if (!namePattern.test(values.first_name)) {
        errors.first_name = "First name may have only letters and hyphens"
    }

    if (values.last_name === "") {
        errors.last_name = "Please enter your last name"
    } else if (!namePattern.test(values.last_name)) {
        errors.last_name = "Last name may have only letters and hyphens"
    }

    if (values.username === "") {
        errors.username = "Please enter a username"
    } else if (!namePattern.test(values.username)) {
        errors.username = "Username may have only letters and hyphens"
    }

    if (values.password === "") {
        errors.password = "Please enter a password"
    } else if (!passwordPattern.test(values.password)) {
        errors.password = "Password must be at least 8 characters including 1 uppercase letter, 1 lowercase letter, 1 special character and 1 number"
    }

    return errors;
}

export default SignupValidation;