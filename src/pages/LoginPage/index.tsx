import LoginForm from './components/LoginForm';
import styles from './styles.module.css';

const LoginPage = () => {
    return (
        <div className={styles.container}>
            <LoginForm />
        </div>
    );
};

export default LoginPage;
