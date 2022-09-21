import { Link } from "react-router-dom";

function RegisterForm({
    setIsLoginForm,
    formData,
    setFormData,
    submitHandler,
}) {
    return (
        <div className="registerView">
            <form onSubmit={submitHandler} className="form form__register">
                <label className="form__register--label" htmlFor="Username">
                    Email Adress
                </label>
                <input
                    className="form__register--input"
                    type="email"
                    placeholder="Email Adress"
                    name="username"
                    onChange={(event) =>
                        setFormData({
                            ...formData,
                            email: event.target.value.toLowerCase().trim(),
                        })
                    }
                    value={formData.email}
                    required
                />

                <label className="form__register--label" htmlFor="password">
                    Password
                </label>
                <input
                    className="form__register--input"
                    type="password"
                    placeholder="New password"
                    name="password"
                    value={formData.password}
                    onChange={(event) =>
                        setFormData({
                            ...formData,
                            password: event.target.value.trim(),
                        })
                    }
                    required
                />

                <label className="form__register--label" htmlFor="First Name">
                    First Name
                </label>
                <input
                    className="form__register--input"
                    type="text"
                    placeholder="First Name"
                    name="First Name"
                    value={formData.first_name}
                    onChange={(event) =>
                        setFormData({
                            ...formData,
                            first_name: event.target.value.trim(),
                        })
                    }
                    required
                />
                <label className="form__register--label" htmlFor="Last Name">
                    Last Name
                </label>
                <input
                    className="form__register--input"
                    type="text"
                    placeholder="Last Name"
                    name="Last Name"
                    value={formData.last_name}
                    onChange={(event) =>
                        setFormData({
                            ...formData,
                            last_name: event.target.value.trim(),
                        })
                    }
                    required
                />
                <button className="registerBtn">Create Account</button>
            </form>

            <div className="signIn">
                <h3>Already have an account?</h3>
                <Link
                    onClick={(event) => {
                        event.preventDefault();
                        setIsLoginForm(true);
                    }}
                    to={"/"}
                >
                    Log in here <span>&#x2B9E;</span>{" "}
                </Link>
            </div>
        </div>
    );
}

export default RegisterForm;
