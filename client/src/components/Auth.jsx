import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/signup.jpg';

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { fullName, username, password, phoneNumber, avatarURL } = form;

        const URL = 'http://localhost:5000/auth';

        const { data: { token, userId, hashedPassword } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            username, password, fullName, phoneNumber, avatarURL,
        });

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);
        

        if(isSignup) {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload();
    
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

  return (
    <div className = "auth__form-container">
        <div className = "auth__form-container_fields">
            <div className = "auth__form-container_fields-content">
                <p>{isSignup ? 'Registrarse' : 'Iniciar Sesion'}</p>
                <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Nombre Completo</label>
                                <input 
                                    name="fullName" 
                                    type="text"
                                    placeholder="Nombre Completo"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Nombre de Usuario</label>
                                <input 
                                    name="username" 
                                    type="text"
                                    placeholder="Nombre de Usuario"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Nombre Telefonico</label>
                                <input 
                                    name="phoneNumber" 
                                    type="text"
                                    placeholder="Nombre Telefonico"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Avatar</label>
                                <input 
                                    name="avatarURL" 
                                    type="text"
                                    placeholder="Avatar"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password">Contraseña</label>
                                <input 
                                    name="password" 
                                    type="password"
                                    placeholder="Contraseña"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Repetir Contraseña</label>
                                <input 
                                    name="confirmPassword" 
                                    type="password"
                                    placeholder="Repetir Contraseña"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            )}
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? "Registrate" : "Iniciar Sesion"}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup
                             ? "Already have an account?" 
                             : "Don't have an account?"
                             }
                             <span onClick={switchMode}>
                             {isSignup ? ' Iniciar Sesion' : ' Registrarse'}
                             </span>
                        </p>
                    </div>
            </div>
        </div>
        <div className="auth__form-container_image">
            <img src={signinImage} alt="sign in" />
        </div>
    </div>
  )
}

export default Auth