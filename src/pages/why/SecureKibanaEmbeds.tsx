import UseCasePage from '@/components/usecase/UseCasePage';
import { SECURE_KIBANA_EMBEDS_DATA } from './SecureKibanaEmbeds.data';

export default function SecureKibanaEmbeds() {
  return <UseCasePage {...SECURE_KIBANA_EMBEDS_DATA} />;
}
