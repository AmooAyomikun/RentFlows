import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const PlaceholderView = ({ title, type }) => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Button variant="ghost" size="sm" leftIcon={<ArrowLeft size={16} />} onClick={() => navigate(-1)}>
        Go Back
      </Button>

      <div>
        <h1 className="font-display font-bold text-2xl text-charcoal">{title}</h1>
        <p className="text-sm text-muted">
          This is a detailed view for {type}.
        </p>
      </div>

      <Card>
        <div className="bg-warm rounded-md p-6 border border-dashed border-border/80 text-center text-muted">
          <p className="font-mono text-sm mb-2">Route Parameters:</p>
          <pre className="text-xs text-left bg-white p-4 rounded border border-border inline-block max-w-full overflow-auto">
            {JSON.stringify(params, null, 2)}
          </pre>
        </div>
      </Card>
    </div>
  );
};

export default PlaceholderView;
