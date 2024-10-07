import GAdoptionsOverTime from '../components/GAdoptionsOverTime';
import GAdoptionsByAnimalType from '../components/GAdoptionsByAnimalType';
import '../assets/styles/AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">דשבורד מנהל</h1>

      <div className="charts-row">
        <div className="chart-container">
          <h2>אימוצים לאורך זמן (יומי)</h2>
          <div className="chart-responsive-container">
            <GAdoptionsOverTime />
          </div>
        </div>

        <div className="chart-container">
          <h2>אימוצים לפי סוג חיה (חודש אחרון)</h2>
          <div className="chart-responsive-container">
            <GAdoptionsByAnimalType />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
