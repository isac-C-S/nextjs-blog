import styles from './dashboard.module.css';
import { FaRegEdit, FaTags, FaUsers, FaSignOutAlt } from 'react-icons/fa';

export default function DashBoard() {
  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardTitle}>Área Administrativa</h1>
      <p className={styles.dashboardSubtitle}>
        Bem-vindo ao painel administrativo do blog! Escolha uma opção para gerenciar o conteúdo.
      </p>
      <div className={styles.dashboardGrid}>
        <div className={styles.dashboardCard}>
          <FaRegEdit className={styles.dashboardCardIcon} />
          <div className={styles.dashboardCardTitle}>Gerenciar Posts</div>
          <div className={styles.dashboardCardDesc}>Crie, edite ou exclua publicações do blog.</div>
        </div>
        <div className={styles.dashboardCard}>
          <FaTags className={styles.dashboardCardIcon} />
          <div className={styles.dashboardCardTitle}>Categorias</div>
          <div className={styles.dashboardCardDesc}>Adicione ou organize categorias de receitas.</div>
        </div>
        <div className={styles.dashboardCard}>
          <FaUsers className={styles.dashboardCardIcon} />
          <div className={styles.dashboardCardTitle}>Usuários</div>
          <div className={styles.dashboardCardDesc}>Gerencie os usuários administradores do blog.</div>
        </div>
        <div className={styles.dashboardCard}>
          <FaSignOutAlt className={styles.dashboardCardIcon} />
          <div className={styles.dashboardCardTitle}>Sair</div>
          <div className={styles.dashboardCardDesc}>Encerrar sessão administrativa.</div>
        </div>
      </div>
    </div>
  );
}
