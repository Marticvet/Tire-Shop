import { Link } from "react-router-dom";

function LoginForm({ setIsLoginForm, formData, setFormData, submitHandler }) {
    return (
        <div className="loginView">
            <form onSubmit={submitHandler} className="form form__login">
                <label className="form__login--label" htmlFor="Username">
                    Email Adress
                </label>
                <input
                    className="form__login--input"
                    type="email"
                    placeholder="Email"
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

                <label className="form__login--label" htmlFor="password">
                    Password
                </label>
                <input
                    className="form__login--input"
                    type="password"
                    placeholder="Password"
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
                <button className="loginBtn" onSubmit={() => {}}>
                    Log In
                </button>
            </form>

            <div className="signUp">
                <h3>Don't have an account?</h3>
                <Link
                    onClick={(event) => {
                        event.preventDefault();
                        setIsLoginForm(false);
                    }}
                    to={"/"}
                >
                    Get started here <span>&#x2B9E;</span>{" "}
                </Link>
            </div>
        </div>
    );
}

export default LoginForm;
