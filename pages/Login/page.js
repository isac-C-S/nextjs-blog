import { useState } from 'react';
import { router } from 'next/router';
import styles from './login.module.css';
import Link from 'next/link';
import {Autenticar} from '../../Config/Autenticação';

function FormGroup({ id, label, type, value, onChange, placeholder }) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
}

export default function Login() {
  const [form, setForm] = useState({ login: '', senha: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sucesso = await Autenticar(form.login, form.senha);
    if (sucesso) {
        router.push('/DashBoard/page');
    } else {
        alert('Login inválido!');
    }
};

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2 className={styles.titulo}>Área Administrativa</h2>
        <FormGroup
          id="login"
          label="Login"
          type="login"
          value={form.login}
          onChange={handleChange}
          placeholder="Digite seu e-mail"
        />
        <FormGroup
          id="senha"
          label="Senha"
          type="password"
          value={form.senha}
          onChange={handleChange}
          placeholder="Digite sua senha"
        />
        <button type="submit" className={styles.button}>Entrar</button>
        <Link href="/" className={styles.voltarBlog}>
          ← Voltar para o blog
        </Link>
      </form>
    </div>
  );
}
