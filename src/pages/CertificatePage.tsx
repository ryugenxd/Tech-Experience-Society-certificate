
import { useNavigate } from 'react-router-dom';
import CertificateForm from '../components/CertificateForm';

export default function CertificatePage() {
  const navigate = useNavigate();

  const handleFormSubmit = (submittedName: string,submittedType: string) => {
    navigate('/generate', { state: { name: submittedName,ty:submittedType } });
  };

  return (
    <div className=''>
      <CertificateForm onSubmit={handleFormSubmit} />
    </div>
  );
}
